/* Museum Trail payment + unlock server (Cloudflare Worker).
   Stripe: POST /checkout -> Stripe page -> game calls POST /claim {session}
   Shopify: order paid webhook -> POST /shopify/orders-paid/<trail> -> game calls POST /claim {pack}
   Codes:  POST /redeem {code}. One code works on 1, 2 or 3 phones, for one day.
   Setup: see README.md in this folder. */
const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': 'content-type,authorization', 'access-control-allow-methods': 'POST,OPTIONS' };
const json = (d, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { 'content-type': 'application/json', ...cors } });
const err = (m, s = 400) => json({ error: m }, s);
const ALPHA = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no 0/O, 1/I/L
const randomCode = () => { const s = [...crypto.getRandomValues(new Uint8Array(12))].map(x => ALPHA[x % ALPHA.length]).join(''); return `${s.slice(0, 4)}-${s.slice(4, 8)}-${s.slice(8)}`; };
const tidy = c => String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/(.{4})(?=.)/g, '$1-');
const cfgOf = (env, trail) => { try { return JSON.parse(env.TRAILS || '{}')[trail] || null; } catch (e) { return null; } };
const okDevice = d => typeof d === 'string' && d.length >= 8 && d.length <= 80;
const get = (env, k) => env.CODES.get(k, 'json');
const put = (env, k, v) => env.CODES.put(k, JSON.stringify(v));

export function dayInfo(tz = 'Europe/London', now = new Date()) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).formatToParts(now).map(x => [x.type, x.value]));
  const left = ((23 - +p.hour) * 3600 + (59 - +p.minute) * 60 + (60 - +p.second)) * 1000;
  return { day: `${p.year}-${p.month}-${p.day}`, exp: now.getTime() + left };
}
async function makeCode(env, { trail, pack, phones, source, order }) {
  let code; do { code = randomCode(); } while (await get(env, 'code:' + code));
  await put(env, 'code:' + code, { code, trail, pack, phones: Math.max(1, Math.min(3, +phones || 1)), devices: [], day: null, source, order: order || null, created: Date.now() });
  return code;
}
async function redeem(env, cfg, code, device, trail) {
  const rec = await get(env, 'code:' + tidy(code));
  if (!rec || rec.trail !== trail) return err('We could not find that code. Check it and try again.', 404);
  const { day, exp } = dayInfo(cfg.tz);
  if (rec.day && rec.day !== day) return err('This code was for a different day.', 410);
  if (!rec.devices.includes(device)) {
    if (rec.devices.length >= rec.phones) return err(`This code is already in use on ${rec.phones} phone${rec.phones > 1 ? 's' : ''}. Ask a member of staff for help.`, 409);
    rec.devices.push(device);
  }
  rec.day = day;
  await put(env, 'code:' + rec.code, rec);
  return json({ pack: rec.pack, exp, code: rec.code, phones: rec.phones, used: rec.devices.length });
}
async function stripe(env, cfg, path, params) {
  const headers = { authorization: 'Bearer ' + env.STRIPE_SECRET_KEY };
  if (cfg.stripeAccount) headers['stripe-account'] = cfg.stripeAccount; // money goes to the museum's own Stripe account
  const init = { method: params ? 'POST' : 'GET', headers };
  if (params) { headers['content-type'] = 'application/x-www-form-urlencoded'; init.body = new URLSearchParams(params).toString(); }
  const r = await fetch('https://api.stripe.com/v1' + path, init), j = await r.json();
  if (!r.ok) throw new Error((j.error && j.error.message) || 'Payment service error');
  return j;
}
async function hmacB64(secret, text) {
  const k = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.sign('HMAC', k, new TextEncoder().encode(text)))));
}
const same = (a, b) => { if (a.length !== b.length) return false; let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i); return d === 0; };

export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (req.method !== 'POST') return err('Not found', 404);
    const path = new URL(req.url).pathname;
    try {
      /* ---- Shopify "order paid" webhook ---- */
      const m = path.match(/^\/shopify\/orders-paid\/([a-z0-9-]+)$/);
      if (m) {
        const trail = m[1], cfg = cfgOf(env, trail), raw = await req.text();
        const secret = env['SHOPIFY_SECRET_' + trail.toUpperCase().replace(/-/g, '_')] || env.SHOPIFY_SECRET;
        if (!cfg || !secret || !same(await hmacB64(secret, raw), req.headers.get('x-shopify-hmac-sha256') || '')) return err('Bad signature', 401);
        const order = JSON.parse(raw), at = Object.fromEntries((order.note_attributes || []).map(a => [a.name, a.value]));
        const pack = cfg.packs && cfg.packs[at.pack];
        if (at.trail !== trail || !pack || !okDevice(at.device)) return json({ ignored: true }); // not a trail order
        if (await get(env, 'order:shopify:' + order.id)) return json({ ok: true, repeat: true });
        const item = (order.line_items || []).find(i => pack.shopify && pack.shopify[String(i.variant_id)]);
        if (!item) return json({ ignored: true });
        const code = await makeCode(env, { trail, pack: at.pack, phones: pack.shopify[String(item.variant_id)], source: 'shopify', order: String(order.id) });
        await put(env, 'order:shopify:' + order.id, { code });
        await put(env, `pending:${trail}:${at.pack}:${at.device}`, { code });
        return json({ ok: true });
      }
      const b = await req.json().catch(() => ({}));
      /* ---- Admin: make code batches, reset a code ---- */
      if (path.startsWith('/admin/')) {
        if (!env.ADMIN_KEY || req.headers.get('authorization') !== 'Bearer ' + env.ADMIN_KEY) return err('Not allowed', 401);
        if (path === '/admin/codes') {
          const cfg = cfgOf(env, b.trail); if (!cfg || !cfg.packs[b.pack]) return err('Unknown trail or pack');
          const codes = []; for (let i = 0; i < Math.min(500, +b.count || 1); i++) codes.push(await makeCode(env, { trail: b.trail, pack: b.pack, phones: b.phones, source: 'batch' }));
          return json({ codes });
        }
        if (path === '/admin/reset') { const rec = await get(env, 'code:' + tidy(b.code)); if (!rec) return err('Code not found', 404); rec.devices = []; rec.day = null; await put(env, 'code:' + rec.code, rec); return json({ ok: true }); }
        return err('Not found', 404);
      }
      const cfg = cfgOf(env, b.trail);
      if (!cfg) return err('Unknown trail');
      if (!okDevice(b.device)) return err('This phone could not be recognised. Please reload the page.');
      if (path === '/redeem') return redeem(env, cfg, b.code, b.device, b.trail);
      /* ---- Stripe: start a checkout ---- */
      if (path === '/checkout') {
        const pack = cfg.packs && cfg.packs[b.pack], phones = Math.max(1, Math.min(3, +b.phones || 1)), amount = pack && pack.prices && pack.prices[phones];
        if (!amount) return err('That option is not for sale.');
        let origin = ''; try { origin = new URL(b.back).origin; } catch (e) {}
        if (!(cfg.origins || []).includes(origin)) return err('This website is not allowed to take payments.', 403);
        const p = { mode: 'payment', 'line_items[0][quantity]': '1', 'line_items[0][price_data][currency]': cfg.currency || 'gbp', 'line_items[0][price_data][unit_amount]': String(amount),
          'line_items[0][price_data][product_data][name]': `${pack.name} (${phones} phone${phones > 1 ? 's' : ''})`,
          success_url: b.back + (b.back.includes('?') ? '&' : '?') + 'paid={CHECKOUT_SESSION_ID}', cancel_url: b.back,
          'metadata[trail]': b.trail, 'metadata[pack]': b.pack, 'metadata[phones]': String(phones) };
        if (cfg.stripeAccount && cfg.feePercent) p['payment_intent_data[application_fee_amount]'] = String(Math.round(amount * cfg.feePercent / 100)); // your share
        return json({ url: (await stripe(env, cfg, '/checkout/sessions', p)).url });
      }
      /* ---- Claim a paid order and unlock this phone ---- */
      if (path === '/claim') {
        let code;
        if (b.session) {
          const s = await stripe(env, cfg, '/checkout/sessions/' + encodeURIComponent(b.session));
          if (s.payment_status !== 'paid' || !s.metadata || s.metadata.trail !== b.trail) return err('We could not find that payment.', 402);
          const k = 'order:stripe:' + s.id, had = await get(env, k);
          code = had ? had.code : await makeCode(env, { trail: b.trail, pack: s.metadata.pack, phones: s.metadata.phones, source: 'stripe', order: s.id });
          if (!had) await put(env, k, { code });
        } else {
          const pend = await get(env, `pending:${b.trail}:${b.pack}:${b.device}`);
          if (!pend) return err('We have not seen your payment yet. Wait a moment and try again.', 404);
          code = pend.code;
        }
        return redeem(env, cfg, code, b.device, b.trail);
      }
      return err('Not found', 404);
    } catch (e) { return err(e.message || 'Server error', 500); }
  }
};

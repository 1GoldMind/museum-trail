// Run: node server/test.mjs   (no accounts needed; Stripe and the database are faked)
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import worker, { dayInfo } from './worker.js';
const store = new Map();
const env = { CODES: { get: async (k) => store.has(k) ? JSON.parse(store.get(k)) : null, put: async (k, v) => { store.set(k, v); } }, STRIPE_SECRET_KEY: 'sk_test_x', ADMIN_KEY: 'admin', SHOPIFY_SECRET: 'shh',
  TRAILS: JSON.stringify({ demo: { tz: 'Europe/London', origins: ['https://x.test'], stripeAccount: 'acct_1', feePercent: 50, packs: { explorer: { name: 'Mystery', prices: { 1: 300, 2: 500, 3: 600 }, shopify: { 111: 1, 333: 3 } } } } }) };
const sessions = {}; let lastStripe;
globalThis.fetch = async (url, init) => { lastStripe = { url, init };
  if (url.endsWith('/checkout/sessions')) { const p = new URLSearchParams(init.body); const id = 'cs_' + Object.keys(sessions).length; sessions[id] = { id, payment_status: 'unpaid', metadata: { trail: p.get('metadata[trail]'), pack: p.get('metadata[pack]'), phones: p.get('metadata[phones]') } }; return new Response(JSON.stringify({ id, url: 'https://pay.test/' + id })); }
  const id = url.split('/').pop(); return sessions[id] ? new Response(JSON.stringify(sessions[id])) : new Response(JSON.stringify({ error: { message: 'No such session' } }), { status: 404 }); };
const call = async (path, body, headers = {}) => { const r = await worker.fetch(new Request('https://api.test' + path, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) }), env); return { s: r.status, j: await r.json() }; };
const dev = n => 'device-00000' + n;

// Stripe: checkout -> pay -> claim
let r = await call('/checkout', { trail: 'demo', pack: 'explorer', phones: 2, device: dev(1), back: 'https://evil.test/' }); assert.equal(r.s, 403);
r = await call('/checkout', { trail: 'demo', pack: 'explorer', phones: 2, device: dev(1), back: 'https://x.test/?game=demo' }); assert.equal(r.s, 200);
const body = new URLSearchParams(lastStripe.init.body);
assert.equal(body.get('line_items[0][price_data][unit_amount]'), '500'); assert.equal(body.get('payment_intent_data[application_fee_amount]'), '250');
assert.equal(lastStripe.init.headers['stripe-account'], 'acct_1'); assert.equal(body.get('success_url'), 'https://x.test/?game=demo&paid={CHECKOUT_SESSION_ID}');
r = await call('/claim', { trail: 'demo', session: 'cs_0', device: dev(1) }); assert.equal(r.s, 402, 'unpaid must not unlock');
sessions.cs_0.payment_status = 'paid';
r = await call('/claim', { trail: 'demo', session: 'cs_0', device: dev(1) }); assert.equal(r.s, 200); assert.equal(r.j.pack, 'explorer'); assert.equal(r.j.phones, 2);
const code = r.j.code; assert.match(code, /^[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/); assert.ok(r.j.exp > Date.now());
r = await call('/claim', { trail: 'demo', session: 'cs_0', device: dev(1) }); assert.equal(r.j.code, code, 'same order gives the same code');
// phone limit: 2 phones allowed, third refused; same phone again is fine; typing style ignored
r = await call('/redeem', { trail: 'demo', code: code.toLowerCase().replace(/-/g, ' '), device: dev(2) }); assert.equal(r.s, 200); assert.equal(r.j.used, 2);
r = await call('/redeem', { trail: 'demo', code, device: dev(3) }); assert.equal(r.s, 409);
r = await call('/redeem', { trail: 'demo', code, device: dev(2) }); assert.equal(r.s, 200);
r = await call('/redeem', { trail: 'demo', code: 'AAAA-BBBB-CCCC', device: dev(2) }); assert.equal(r.s, 404);
// next day: code no longer works
const rec = JSON.parse(store.get('code:' + code)); rec.day = '2000-01-01'; store.set('code:' + code, JSON.stringify(rec));
r = await call('/redeem', { trail: 'demo', code, device: dev(1) }); assert.equal(r.s, 410);
// admin: reset and batch
r = await call('/admin/reset', { code }, { authorization: 'Bearer wrong' }); assert.equal(r.s, 401);
r = await call('/admin/reset', { code }, { authorization: 'Bearer admin' }); assert.equal(r.s, 200);
r = await call('/redeem', { trail: 'demo', code, device: dev(3) }); assert.equal(r.s, 200);
r = await call('/admin/codes', { trail: 'demo', pack: 'explorer', phones: 1, count: 3 }, { authorization: 'Bearer admin' }); assert.equal(r.j.codes.length, 3);
r = await call('/redeem', { trail: 'demo', code: r.j.codes[0], device: dev(1) }); assert.equal(r.j.phones, 1);
// Shopify webhook
const order = JSON.stringify({ id: 9001, note_attributes: [{ name: 'trail', value: 'demo' }, { name: 'pack', value: 'explorer' }, { name: 'device', value: dev(7) }], line_items: [{ variant_id: 333 }] });
const sig = createHmac('sha256', 'shh').update(order).digest('base64');
r = await call('/claim', { trail: 'demo', pack: 'explorer', device: dev(7) }); assert.equal(r.s, 404, 'nothing before payment');
r = await call('/shopify/orders-paid/demo', order, { 'x-shopify-hmac-sha256': 'forged' }); assert.equal(r.s, 401);
r = await call('/shopify/orders-paid/demo', order, { 'x-shopify-hmac-sha256': sig }); assert.equal(r.s, 200);
r = await call('/shopify/orders-paid/demo', order, { 'x-shopify-hmac-sha256': sig }); assert.equal(r.j.repeat, true, 'Shopify may send twice');
r = await call('/claim', { trail: 'demo', pack: 'explorer', device: dev(7) }); assert.equal(r.s, 200); assert.equal(r.j.phones, 3);
r = await call('/claim', { trail: 'demo', pack: 'explorer', device: dev(8) }); assert.equal(r.s, 404, 'another phone cannot claim it');
const d = dayInfo('Europe/London', new Date('2026-07-01T22:30:00Z')); assert.equal(d.day, '2026-07-01'); assert.equal(d.exp, Date.parse('2026-07-01T23:00:00Z'));
console.log('All payment server tests passed');

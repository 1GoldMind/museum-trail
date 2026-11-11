# Payment and unlock server

A small Cloudflare Worker. It takes no card details itself. It asks Stripe or Shopify, then unlocks the phone.

Test it with no accounts: `node server/test.mjs`

## What you need (all have free tiers to start)
1. A Cloudflare account.
2. A Stripe account with Connect switched on (for Stripe), or a Shopify Dev Dashboard account (for Shopify).

## Deploy (about 20 minutes, once)
1. Install Node.js. In this folder run `npx wrangler login`.
2. `npx wrangler kv namespace create CODES` and paste the id into `wrangler.toml`.
3. Edit `TRAILS` in `wrangler.toml`: your game address in `origins`, pack prices in pence.
4. `npx wrangler secret put ADMIN_KEY` (make up a long password).
5. `npx wrangler secret put STRIPE_SECRET_KEY` (from Stripe → Developers → API keys. Use a **test** key first).
6. `npx wrangler deploy`. It prints the server address.
7. In the trail editor → Map and payments: choose the payment method and paste the server address.

## Stripe (money goes to the museum, your share is automatic)
- The museum connects its Stripe account to your platform (Stripe Connect). You get an account ID like `acct_...`.
- Put it in `stripeAccount`, and your share in `feePercent` (for example 50).
- Leave `stripeAccount` empty to take payments into your own Stripe account while testing.

## Shopify (museum sells the pack in its own shop)
1. The museum makes a product "Trail pack" with 3 variants: 1, 2 and 3 phones.
2. Put the variant IDs in the editor (pack → Shopify variant ID) and in `TRAILS` → `shopify`: `{ "VARIANT_ID": 1, "VARIANT_ID": 2, "VARIANT_ID": 3 }`.
3. Add a webhook for **Order payment** pointing to `https://YOUR-SERVER/shopify/orders-paid/TRAIL-NAME`.
4. `npx wrangler secret put SHOPIFY_SECRET` with the webhook signing secret.

## Codes
- One code works on 1, 2 or 3 phones, on one day only.
- Make a batch: `POST /admin/codes {trail, pack, phones, count}` with header `Authorization: Bearer ADMIN_KEY`.
- Reset a code for a family: `POST /admin/reset {code}`.

## Limits to know
- The trail content file is public. This stops casual sharing, not a determined cheat.
- Two phones using the same code in the same second could both get in. Fine at this scale.

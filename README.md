# Museum Trail – story trail game engine

First trail: **Percy's Flying Mission** (RAF Museum London, ages 4–8).

## How it works
1. **Edit content in Webflow CMS** (free plan): collections *Trail Zones* (hangars) and *Trail Stops* (aircraft).
2. **Press "Run workflow"** on this repo's *Actions* tab → *Sync from Webflow*. It downloads the CMS, checks it, and updates `games/raf-london.js`.
3. **The live game updates** on GitHub Pages about a minute later.

If the check finds a problem (for example a missing question), nothing changes, and the run lists what to fix.

## Everyday edits (in Webflow CMS)
- **Change words:** edit the item's fields.
- **Hide a stop or zone:** set the item to *Draft*, or archive it.
- **Add a stop:** new item in Trail Stops; pick its Zone and Order.
- **Add a photo:** upload to the item's Photo field. It replaces the drawing.
- **Answer pictures:** an emoji (🌊), a number (2), or `stack:2`, `props:4`, `blades:3`, `wing:curved|straight|swept|delta`.
- **Tap picture questions:** set *Tap spots* to the circle positions as across,down percentages, e.g. `50,17 | 52,54 | 16,46`.

## Trail-wide settings
`trails/raf-london.json`: title, museum name, guide character text, intro, certificate words, plane designer options, and the Webflow site and collection names. Edit it on GitHub (pencil icon) and run the sync.

## New museum
1. In Webflow, duplicate the site (or add new Zones/Stops collections).
2. Copy `trails/raf-london.json` to `trails/new-museum.json` and change the words and the Webflow site ID.
3. Run the sync with trail = `new-museum`. Play at `.../?game=new-museum`.

## One-time setup
1. **Webflow token:** Webflow → Site settings → Apps & integrations → API access → Generate token. Give it read access to CMS and Sites.
2. **Add it to GitHub:** this repo → Settings → Secrets and variables → Actions → New repository secret. Name: `WEBFLOW_TOKEN`.
3. **GitHub Pages:** Settings → Pages → Deploy from a branch → `main` / root.

## Signs
`python make-signs.py raf-london https://YOUR-PAGES-ADDRESS/` makes printable signs with QR codes.

## Before visitors use it
- A curator checks every fact and answer.
- Set `const DEMO_BUILD=false` in `index.html`.

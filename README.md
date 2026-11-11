# Museum Trail

One game engine. One file per museum. A visual editor.

| Link | What it is |
|---|---|
| `index.html` | Demo trail for a made-up museum (the default) |
| `index.html?game=raf-london` | Sample: Percy's Flying Mission (RAF Museum London, not approved by the Museum) |
| `editor.html` | Trail editor with a live phone preview |
| `editor.html?game=raf-london` | Open a different trail in the editor |

## Structure
```
index.html          page shell (never changes)
engine/trail.js     game rules, screens, all game types
engine/trail.css    look and layout (colours come from each trail's theme)
engine/art.js       drawings: guide characters, aircraft, badges
games/<name>.js     ONE trail = ONE file (words, colours, areas, stops, games)
editor.html         edit a trail without touching code
make-signs.py       printable signs with QR codes
```
Fix or improve the engine once and every museum's trail gets it.

## Make a trail for a new museum (no coding)
1. Open `editor.html`. It opens the demo trail.
2. Section 1: change the trail file name (e.g. `science-museum`), title, museum name, colours and guide.
3. Change the areas, stops and games. The phone preview updates as you type.
4. Fix anything in the yellow "things to fix" box.
5. Press **Download trail file**. Upload the file to the `games` folder on GitHub (Add file → Upload files).
6. Play it at `index.html?game=science-museum`.

## What you can customise per museum
- **Brand:** title, museum name, logo, 4 colours, small print.
- **Guide character:** penguin, robot, or your own picture. Name and all speech.
- **Wording:** what areas and stops are called ("hangars" and "aircraft", "galleries" and "exhibits").
- **Age groups:** any number. Each stop can have a different game per age group.
- **Rules per age group:** stops needed per area, when to show the answer, read-aloud on or off.
- **Ending:** design a badge, design a plane, or certificate only.

## Game types
| Type | Child does | Best for |
|---|---|---|
| `choice`, `hotspot`, `count`, `spy` | Pick, tap the picture, count, I-spy | 4–8 |
| `truefalse` | Checks a statement against the real object | 4–10 |
| `silhouette` | Finds the object that matches a shadow | 4–8 |
| `jigsaw` | Finds details on the real object to reveal the picture | 4–10 |
| `spot` | Finds the mistakes on a fact card or drawing | 6–14 |
| `oddone` | Picks the one that does not belong | 7–14 |
| `padlock` | Counts or reads numbers in the room to open a lock | 8–14 |
| `order`, `match`, `code`, `estimate` | Timeline, pairs, read a label, best guess | 9+ |
| `poll` | Would you rather (no wrong answer) | All |
| `photo` | Photo mission; photos stay on the phone | All |

## Also in each trail
- **Game packs:** each pack has a description, length, what it teaches and a price. Free or paid.
- **Mystery ending:** clues from each area, then name the culprit.
- **Family mode:** pass the phone, take turns, scores on the certificate.
- **Floor plan:** upload a map picture and drag pins in the editor.
- **Layout settings:** font, text size, spacing, boxes per row, corners.
- **Payments:** demo, Stripe or Shopify. See `server/README.md`.

## Signs
`python make-signs.py <trail> https://YOUR-ADDRESS/index.html` (needs `pip install "qrcode[pil]"`).

## Before visitors use a trail
- A curator checks every fact and answer.
- Set `const DEMO_BUILD=false` in `engine/trail.js`.

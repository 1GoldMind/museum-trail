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
| `choice` | Picks one answer | All ages |
| `hotspot` | Taps the right part of the picture | 4–8 |
| `count` | Counts with + and − | 4–8 |
| `spy` | Ticks off things they find (no wrong answer) | 4–8 |
| `order` | Puts items in order | 9+ |
| `match` | Matches pairs | 9+ |
| `code` | Types an answer read from a label | 9+ |
| `estimate` | Best guess on a slider | 9+ |

## Signs
`python make-signs.py <trail> https://YOUR-ADDRESS/index.html` (needs `pip install "qrcode[pil]"`).

## Before visitors use a trail
- A curator checks every fact and answer.
- Set `const DEMO_BUILD=false` in `engine/trail.js`.

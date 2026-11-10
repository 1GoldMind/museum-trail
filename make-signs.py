"""Make print-ready hangar signs (picture code + optional QR) from a game file.

Usage:
    python make-signs.py demo                             # QR placeholders
    python make-signs.py raf-london https://your.site/trail/index.html   # real QR codes

Real QR codes need: pip install "qrcode[pil]"
Reads games/<game>.js, so signs always match the game text. Creates signs-<game>.html.
"""
import argparse, base64, io, json, html
from pathlib import Path
from urllib.parse import urlencode, urlsplit, urlunsplit, parse_qsl

ap = argparse.ArgumentParser(description=__doc__)
ap.add_argument('game', nargs='?', default='demo')
ap.add_argument('url', nargs='?', help='Public HTTPS URL of the hosted index.html')
a = ap.parse_args()
here = Path(__file__).parent
raw = (here / 'games' / f'{a.game}.js').read_text(encoding='utf-8')
G = json.loads(raw.split('=', 1)[1].strip().rstrip(';'))
SIGNS = {'sun':('☀️','Sun'),'cloud':('☁️','Cloud'),'rainbow':('🌈','Rainbow'),'moon':('🌙','Moon'),'star':('⭐','Star'),'rocket':('🚀','Rocket'),'heart':('❤️','Heart'),'tree':('🌳','Tree'),'fish':('🐟','Fish'),'leaf':('🍃','Leaf'),'key':('🔑','Key'),'crown':('👑','Crown'),'bell':('🔔','Bell'),'apple':('🍎','Apple'),'flower':('🌸','Flower'),'drop':('💧','Raindrop')}
qrcode = None
if a.url:
    parts = urlsplit(a.url)
    if parts.scheme != 'https':
        ap.error('Use a public HTTPS URL')
    try:
        import qrcode
    except ImportError:
        ap.error('Install first: pip install "qrcode[pil]"')
e = html.escape
blocks = []
for h in G['zones']:
    s = dict(zip(('sym', 'name'), SIGNS[h['sign']]))
    if qrcode:
        q = dict(parse_qsl(parts.query)); q.update(game=a.game, z=h['id'], code=h['sign'])
        link = urlunsplit((parts.scheme, parts.netloc, parts.path, urlencode(q), ''))
        img = qrcode.make(link); buf = io.BytesIO(); img.save(buf, format='PNG')
        qr = f'<img src="data:image/png;base64,{base64.b64encode(buf.getvalue()).decode()}" width="150" height="150" alt="QR code">'
    else:
        qr = '<div class="ph">QR code<br>goes here</div>'
    planes = ', '.join(x['name'] for x in h['stops'])
    blocks.append(f'<section class="sign"><div class="sym">{s["sym"]}</div><div><div class="brand">{e(G["museum"].upper())} · {e(G["title"].upper())}</div><span class="badge">{e(h["label"].upper())}</span><h2>You found {e(G["guide"]["name"])}\'s sign!</h2><p>Tap the <strong>{e(s["name"].lower())}</strong> picture in the game.</p><p class="small">Find: {e(planes)}. Stay behind the barriers.</p></div><div>{qr}<p class="small">Grown-ups: scan me</p></div></section>')
out = here / f'signs-{a.game}.html'
out.write_text('<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>Signs</title><style>@page{size:A4;margin:12mm}body{font:18px system-ui,Arial;color:#0b3154}.sign{border:4px solid #0b3154;border-radius:18px;padding:18px;display:grid;grid-template-columns:120px 1fr 160px;gap:18px;align-items:center;margin:0 0 14px;break-inside:avoid}.sym{font-size:90px;text-align:center}.brand{font-weight:900;letter-spacing:.06em;font-size:11px}.badge{display:inline-block;background:#ffd36d;border-radius:8px;padding:5px 9px;font-size:12px;font-weight:900;margin-top:6px}h2{font-size:26px;margin:8px 0 4px}p{margin:4px 0}.small{font-size:12px;color:#4c6275}.ph{width:150px;height:150px;border:3px dashed #9fbdd0;display:grid;place-items:center;text-align:center;font-size:13px;color:#7b97aa}</style></head><body><p class="small">DRAFT FOR REVIEW: confirm sign places, wording and links with Museum teams before printing.</p>' + ''.join(blocks) + '</body></html>', encoding='utf-8')
print('Created:', out)

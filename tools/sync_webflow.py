"""Sync a trail from Webflow CMS into games/<trail>.js.

Usage (GitHub Action runs this for you):
    WEBFLOW_TOKEN=xxxx python tools/sync_webflow.py raf-london

Reads trails/<trail>.json (trail-wide settings + Webflow site and collection slugs),
downloads the Zones and Stops collections, checks them, and writes games/<trail>.js.
Draft or archived CMS items are left out, so marking an item as Draft hides it.
Exits with an error (and writes nothing) if the content has a problem.

For offline testing set FIXTURES=path/to/folder containing collections.json,
<slug>.schema.json and <slug>.items.json.
"""
import json, os, re, sys, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
API = 'https://api.webflow.com/v2'


def get(path):
    fx = os.environ.get('FIXTURES')
    if fx:
        name = {'collections': 'collections.json'}.get(path.split('/')[-1], None)
        return json.loads((Path(fx) / (name or path)).read_text(encoding='utf-8'))
    req = urllib.request.Request(API + path, headers={'Authorization': 'Bearer ' + os.environ['WEBFLOW_TOKEN'], 'accept': 'application/json'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode('utf-8'))


def collection(site_id, slug, cols):
    cid = next((c['id'] for c in cols if c['slug'] == slug), None)
    if not cid:
        sys.exit(f'ERROR: Webflow collection "{slug}" not found on the site.')
    fx = os.environ.get('FIXTURES')
    schema = get(f'{slug}.schema.json') if fx else get(f'/collections/{cid}')
    options = {}
    for f in schema['fields']:
        if f['type'] == 'Option':
            options[f['slug']] = {o['id']: o['name'] for o in f['validations']['options']}
    items, offset = [], 0
    while True:
        page = get(f'{slug}.items.json') if fx else get(f'/collections/{cid}/items?limit=100&offset={offset}')
        items += page['items']
        offset += len(page['items'])
        if fx or offset >= page['pagination']['total'] or not page['items']:
            break
    items = [i for i in items if not i.get('isDraft') and not i.get('isArchived')]
    def opt(item, field):
        v = item['fieldData'].get(field)
        return options.get(field, {}).get(v, v) if v else None
    return items, opt


def text(fd, key):
    v = fd.get(key)
    return v.strip() if isinstance(v, str) else ''


def main(trail):
    settings_path = ROOT / 'trails' / f'{trail}.json'
    S = json.loads(settings_path.read_text(encoding='utf-8'))
    wf = S.pop('webflow')
    cols = get(f"/sites/{wf['siteId']}/collections")['collections']
    zones, zopt = collection(wf['siteId'], wf['zonesCollection'], cols)
    stops, sopt = collection(wf['siteId'], wf['stopsCollection'], cols)
    errors, warnings = [], []

    by_zone = {}
    for s in stops:
        by_zone.setdefault(s['fieldData'].get('zone'), []).append(s)

    hangars, used_signs = [], set()
    for z in sorted(zones, key=lambda z: z['fieldData'].get('order') or 999):
        fd = z['fieldData']
        sign = (zopt(z, 'sign-picture') or '').lower()
        label = text(fd, 'label') or fd['name']
        if sign not in S['signs']:
            errors.append(f'{label}: choose a Sign picture.')
        elif sign in used_signs:
            errors.append(f'{label}: sign picture "{sign}" is already used by another zone.')
        used_signs.add(sign)
        aircraft = []
        for s in sorted(by_zone.get(z['id'], []), key=lambda s: s['fieldData'].get('order') or 999):
            sf = s['fieldData']
            name = sf['name']
            qtype = 'hotspot' if (sopt(s, 'question-type') or '').lower().startswith('tap') else 'choice'
            opts = []
            spots = [p.strip() for p in (text(sf, 'tap-spots')).split('|') if p.strip()]
            for n in (1, 2, 3):
                label_n = text(sf, f'answer-{n}-text')
                if not label_n:
                    continue
                o = {'v': str(n), 'label': label_n, 'icon': text(sf, f'answer-{n}-picture') or str(n)}
                if qtype == 'hotspot':
                    try:
                        x, y = [float(v) for v in spots[n - 1].split(',')]
                        o.update(x=x, y=y)
                    except (IndexError, ValueError):
                        errors.append(f'{name}: Tap spots needs a position for answer {n}, e.g. 50,17 | 52,54 | 16,46')
                opts.append(o)
            correct = sopt(s, 'correct-answer')
            if len(opts) < 2:
                errors.append(f'{name}: needs at least 2 answers.')
            if correct not in [o['v'] for o in opts]:
                errors.append(f'{name}: Correct answer must match a filled-in answer.')
            for key, what in (('look-prompt', 'Look prompt'), ('question', 'Question'), ('fact', 'Fact')):
                if not text(sf, key):
                    errors.append(f'{name}: {what} is empty.')
            photo = sf.get('photo') or {}
            a = {'id': sf['slug'], 'name': name, 'art': sopt(s, 'drawing') or 'fighter',
                 'body': sf.get('body-colour') or '#8a9aa8', 'wing': sf.get('wing-colour') or sf.get('body-colour') or '#8a9aa8',
                 'image': photo.get('url', '') if isinstance(photo, dict) else '',
                 'look': text(sf, 'look-prompt'),
                 'task': {'type': qtype, 'q': text(sf, 'question'), 'answer': correct, 'options': opts},
                 'fact': text(sf, 'fact'), 'talk': text(sf, 'talk-together')}
            ws = sopt(s, 'wing-shape')
            if ws:
                a['wingShape'] = ws
            aircraft.append(a)
        if not aircraft:
            warnings.append(f'{label}: has no published stops, so it was left out.')
            continue
        story = [t for t in (text(fd, 'story-line-1'), text(fd, 'story-line-2'), text(fd, 'story-line-3')) if t]
        hangars.append({'id': fd['slug'], 'label': label, 'era': text(fd, 'era'), 'title': fd['name'], 'sign': sign,
                        'story': story or [f'Welcome to {label}!'], 'grown': text(fd, 'grown-up-tip'), 'aircraft': aircraft})

    orphans = [s['fieldData']['name'] for s in stops if s['fieldData'].get('zone') not in {z['id'] for z in zones}]
    if orphans:
        warnings.append('Stops with no zone (left out): ' + ', '.join(orphans))
    if not hangars:
        errors.append('No zones with stops were found.')
    for w in warnings:
        print('WARNING:', w)
    if errors:
        print('\nNothing was changed. Please fix these in Webflow CMS, then run the sync again:')
        for e in errors:
            print(' -', e)
        sys.exit(1)

    n_stops = sum(len(h['aircraft']) for h in hangars)
    S['text']['introChips'] = [c.replace('{zones}', str(len(hangars))).replace('{stops}', str(n_stops)) for c in S['text'].get('introChips', [])]
    S['hangars'] = hangars
    out = ROOT / 'games' / f'{trail}.js'
    out.write_text('window.GAME = ' + json.dumps(S, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
    print(f'OK: wrote {out.relative_to(ROOT)} with {len(hangars)} zones and {n_stops} stops.')


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'raf-london')

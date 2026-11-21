# Makes the social share images (static/share/*.png) and site icons.
# Run after `node generate.mjs`: python3 scripts/share.py /path/to/display-font.ttf
import json, sys, os, textwrap
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = sys.argv[1]
BG, INK, BLUE, CREMA, WHITE = '#ECEEF1', '#23262B', '#13294B', '#F2541B', '#FFFFFF'

def font(size, wght=800):
    f = ImageFont.truetype(FONT, size)
    try: f.set_variation_by_axes([wght] + ([] if len(f.get_variation_axes()) == 1 else [100]))
    except Exception: pass
    return f

def cup(d, x, y, s):
    d.rounded_rectangle([x, y + .3 * s, x + 1.4 * s, y + .75 * s], radius=int(.22 * s), fill=INK)
    for i in range(6): d.rectangle([x + (.18 + i * .18) * s, y + .48 * s, x + (.28 + i * .18) * s, y + .57 * s], fill=CREMA)

def share(slug, title):
    im = Image.new('RGB', (1200, 630), WHITE); d = ImageDraw.Draw(im)
    d.rectangle([0, 0, 1200, 22], fill=BLUE)
    d.rectangle([0, 560, 1200, 630], fill=INK)
    cup(d, 80, 70, 60)
    d.text((180, 92), 'walkingpadsale.com', font=font(34, 700), fill=INK)
    lines = textwrap.wrap(title, 26)[:3]
    y = 210
    for ln in lines:
        d.text((80, y), ln, font=font(72), fill=INK); y += 84
    d.text((80, 577), 'Walking pad and treadmill guides, reviews and deals', font=font(28, 500), fill='#C9CDDA')
    os.makedirs(os.path.join(ROOT, 'static/share'), exist_ok=True)
    im.save(os.path.join(ROOT, 'static/share', slug + '.png'), optimize=True)

for p in json.load(open(os.path.join(ROOT, 'scripts/share-list.json'))):
    share(p['slug'], p['title'])

# Icons
icon = Image.new('RGBA', (512, 512), INK); d = ImageDraw.Draw(icon)
d.rounded_rectangle([60, 200, 452, 330], radius=65, fill='#30343B')
for i in range(6): d.rectangle([110 + i * 52, 252, 140 + i * 52, 280], fill=CREMA)
st = os.path.join(ROOT, 'static')
icon.save(os.path.join(st, 'icon-512.png'))
icon.resize((192, 192)).save(os.path.join(st, 'icon-192.png'))
icon.resize((180, 180)).save(os.path.join(st, 'apple-touch-icon.png'))
icon.save(os.path.join(st, 'favicon.ico'), sizes=[(48, 48), (32, 32), (16, 16)])
open(os.path.join(st, 'icon.svg'), 'w').write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="96" fill="#23262B"/><rect x="60" y="200" width="392" height="130" rx="65" fill="#30343B"/><path d="M110 266h290" stroke="#F2541B" stroke-width="28" stroke-dasharray="30 22"/></svg>')
json.dump({'name': 'Walking Pad Sale', 'short_name': 'Walking Pad Sale', 'icons': [{'src': '/icon-192.png', 'sizes': '192x192', 'type': 'image/png'}, {'src': '/icon-512.png', 'sizes': '512x512', 'type': 'image/png'}], 'theme_color': BLUE, 'background_color': BG, 'display': 'browser'}, open(os.path.join(st, 'site.webmanifest'), 'w'))
print('share images and icons written')

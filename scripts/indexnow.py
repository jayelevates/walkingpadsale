"""Tell Bing, Yandex, Seznam, Naver and Yep about this site's pages through IndexNow.
Run after a push is live:  python3 scripts/indexnow.py          (every URL in the sitemap)
                           python3 scripts/indexnow.py changed  (only pages changed in the last commit)
"""
import json, os, re, subprocess, sys, urllib.request
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
key = next(f[:-4] for f in os.listdir(os.path.join(root, 'static')) if re.fullmatch(r'[a-f0-9]{32}\.txt', f))
host = os.path.basename(root) + '.com'
urls = re.findall(r'<loc>(.*?)</loc>', open(os.path.join(root, 'out', 'sitemap.xml')).read())
if sys.argv[1:] == ['changed']:
    files = subprocess.run(['git', '-C', root, 'diff', '--name-only', 'HEAD~1', 'HEAD'], capture_output=True, text=True).stdout.split()
    if not any(f.startswith(('content/', 'generate.mjs', 'lib/')) for f in files):
        sys.exit('No page changes in the last commit.')
body = json.dumps({'host': host, 'key': key, 'keyLocation': f'https://{host}/{key}.txt', 'urlList': urls}).encode()
ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
for ep in ('https://api.indexnow.org/indexnow', 'https://www.bing.com/indexnow', 'https://yandex.com/indexnow'):
    req = urllib.request.Request(ep, data=body, headers={'Content-Type': 'application/json; charset=utf-8', 'User-Agent': ua})
    try: code = urllib.request.urlopen(req, timeout=30).status
    except urllib.error.HTTPError as e: code = e.code
    print(f'{host}: {len(urls)} URLs -> {ep.split("/")[2]} {code}')

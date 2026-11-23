/* 하나맘스 만능 도구함 — 도구 페이지 전용 최소 캐시.
   다른 페이지(/hotels/*.html)는 손대지 않습니다. */
const VERSION = 'hanamoms-tools-v1';
const CORE = ['./tools.html', './manifest.json', './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).catch(() => {}).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('hanamoms-tools-') && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isTools = url.origin === self.location.origin && url.pathname.endsWith('/tools.html');
  const isCore = url.origin === self.location.origin && CORE.some((p) => url.pathname.endsWith(p.replace('./', '/')));
  const isCdn = /cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net/.test(url.host);

  if (!isTools && !isCore && !isCdn) return; // 그 외는 브라우저 기본 동작

  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    // 도구 페이지는 항상 최신본을 먼저 시도(오프라인이면 저장본)
    if (isTools) {
      try {
        const fresh = await fetch(req, { cache: 'no-store' });
        if (fresh && fresh.ok) cache.put(req, fresh.clone());
        return fresh;
      } catch (err) {
        const hit = await cache.match(req);
        if (hit) return hit;
        throw err;
      }
    }
    // 아이콘·CDN 라이브러리는 저장본 우선
    const hit = await cache.match(req);
    if (hit) return hit;
    const res = await fetch(req);
    if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
    return res;
  })());
});

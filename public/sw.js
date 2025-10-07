/* ABOUTME: Minimal service worker for basic offline caching */
const VERSION = 'v1';
const RUNTIME = 'cloudfix-runtime';

// Precache a small set of shell routes; avoid aggressive precache to prevent staleness
const PRECACHE = `cloudfix-precache-${VERSION}`;
const PRECACHE_URLS = [
  '/',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE).then((cache) => cache.addAll(PRECACHE_URLS)).then(self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

// Strategy:
// - HTML navigation requests: network-first with cache fallback
// - Static assets (images/css/js): stale-while-revalidate
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  // HTML navigation
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME).then((cache) => cache.put(req, copy));
          return response;
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match('/')))
    );
    return;
  }

  // For GET requests to same-origin static assets
  if (req.method === 'GET' && (req.destination === 'style' || req.destination === 'script' || req.destination === 'image' || url.pathname.startsWith('/_next/'))) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const networkFetch = fetch(req)
          .then((response) => {
            const copy = response.clone();
            caches.open(RUNTIME).then((cache) => cache.put(req, copy));
            return response;
          })
          .catch(() => cached);
        return cached || networkFetch;
      })
    );
  }
});


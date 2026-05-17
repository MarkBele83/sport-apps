const CACHE_NAME = 'btv-score-v1.4';
const urlsToCache = [
  'index.html',
  'manifest.json',
  'service-worker.js',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap'
];

// Installiere den Service Worker und cache kritische Dateien
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).catch(err => {
        console.log('Cache addAll error:', err);
        // Fehlerhafte URLs ignorieren (z.B. Fonts)
      });
    }).then(() => self.skipWaiting())
  );
});

// Aktiviere den Service Worker und cleanup alte Caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch-Strategie: Network first, fallback to cache
self.addEventListener('fetch', event => {
  // Ignoriere non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Nur erfolgreiche Responses cachen
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        // Offline: Aus Cache laden
        return caches.match(event.request)
          .then(response => {
            return response || new Response('Offline - Seite nicht im Cache', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

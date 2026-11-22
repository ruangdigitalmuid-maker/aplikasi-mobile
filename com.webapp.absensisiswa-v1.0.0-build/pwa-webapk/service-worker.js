const CACHE_NAME = 'com.webapp.absensisiswa-v1';
const OFFLINE_ASSETS = ['./', './index.html', './offline.html', './manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then((res) => res || caches.match('./offline.html')))
  );
});
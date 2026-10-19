const BUILD_ID = '__BUILD_ID__';
const PRECACHE_FILES = JSON.parse('[]');
const CACHE_NAME = `matekk-module-offline-${BUILD_ID}`;
const MODULE_ROUTE = /^\/modules\/programs(?:\/|$)/;
const EXAM_ROUTE = /^\/modules\/programs\/[^/]+\/exam(?:\/|$)/;
const OFFLINE_CCNA_EXAM_ROUTE = /^\/modules\/programs\/ccna\/exam\/(?:short|medium|long|all)\/?$/;
const OFFLINE_ENTRY_ROUTE = /^\/(?:login)?\/?$/;
const SCOPE_URL = self.registration.scope;
const APP_SHELL_URL = new URL('index.html', SCOPE_URL).href;
const PRECACHE_URLS = new Set(
  PRECACHE_FILES.map((fileName) => new URL(fileName, SCOPE_URL).href),
);
PRECACHE_URLS.add(APP_SHELL_URL);

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const urls = [...PRECACHE_URLS];
    const batchSize = 12;
    for (let index = 0; index < urls.length; index += batchSize) {
      await cache.addAll(urls.slice(index, index + batchSize));
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames
      .filter((cacheName) => cacheName.startsWith('matekk-module-offline-') && cacheName !== CACHE_NAME)
      .map((cacheName) => caches.delete(cacheName)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate' && MODULE_ROUTE.test(url.pathname)) {
    if (EXAM_ROUTE.test(url.pathname) && !OFFLINE_CCNA_EXAM_ROUTE.test(url.pathname)) {
      event.respondWith(fetch(request).catch(() => new Response(
        '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Online required</title><body style="font:16px system-ui;background:#070D1F;color:#EAF0FB;padding:3rem;max-width:42rem;margin:auto"><h1>Internet connection required</h1><p>Exams are not available offline. Reconnect to the internet and try again.</p><a style="color:#38BDF8" href="/modules/programs/ccna">Return to your modules</a></body></html>',
        { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
      )));
      return;
    }

    event.respondWith(fetch(request).catch(async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedShell = await cache.match(APP_SHELL_URL);
      return cachedShell ?? new Response(
        'Offline module content is not available yet. Connect to the internet once to download it.',
        { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
      );
    }));
    return;
  }

  if (request.mode === 'navigate' && OFFLINE_ENTRY_ROUTE.test(url.pathname)) {
    event.respondWith(fetch(request).catch(async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedShell = await cache.match(APP_SHELL_URL);
      return cachedShell ?? new Response(
        'Offline module content is not available yet. Connect to the internet once to download it.',
        { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
      );
    }));
    return;
  }

  if (request.destination === 'image') {
    event.respondWith((async () => {
      const client = event.clientId ? await self.clients.get(event.clientId) : null;
      const clientPath = client ? new URL(client.url).pathname : '';
      if (!MODULE_ROUTE.test(clientPath)) {
        return fetch(request);
      }

      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(request);
        if (response.ok && response.type === 'basic') {
          try {
            await cache.put(request, response.clone());
          } catch (error) {
            console.error('Unable to cache a module image for offline use.', error);
          }
        }
        return response;
      } catch (error) {
        const cachedImage = await cache.match(request);
        if (cachedImage) return cachedImage;
        throw error;
      }
    })());
    return;
  }

  if (PRECACHE_URLS.has(request.url)) {
    event.respondWith(caches.open(CACHE_NAME)
      .then((cache) => cache.match(request))
      .then((cachedResponse) => cachedResponse || fetch(request)));
  }
});

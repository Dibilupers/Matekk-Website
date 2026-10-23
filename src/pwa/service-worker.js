const BUILD_ID = '__BUILD_ID__';
const PRECACHE_FILES = JSON.parse('[]');
const CACHE_NAME = `matekk-module-offline-${BUILD_ID}`;
const MODULE_ROUTE = /^\/modules\/programs(?:\/|$)/;
const EXAM_ROUTE = /^\/modules\/programs\/[^/]+\/exam(?:\/|$)/;
const OFFLINE_FORTIOS_EXAM_ROUTE = /^\/modules\/programs\/fortios\/exam\/all\/?$/;
const OFFLINE_ENTRY_ROUTE = /^\/(?:login)?\/?$/;
const FORTIOS_IMAGE_CACHE_MESSAGE = 'PRECACHE_FORTIOS_EXHIBIT_IMAGES';
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

self.addEventListener('message', (event) => {
  if (event.data?.type !== FORTIOS_IMAGE_CACHE_MESSAGE) return;

  event.waitUntil((async () => {
    const inputUrls = Array.isArray(event.data.urls) ? event.data.urls : [];
    const urls = [...new Set(inputUrls.filter((url) => typeof url === 'string'))];
    const cache = await caches.open(CACHE_NAME);
    let cachedCount = 0;
    let failedCount = 0;
    const batchSize = 6;

    for (let index = 0; index < urls.length; index += batchSize) {
      const batch = urls.slice(index, index + batchSize);
      const results = await Promise.allSettled(batch.map(async (url) => {
        const imageUrl = new URL(url);
        if (!['http:', 'https:'].includes(imageUrl.protocol)) {
          throw new TypeError('FortiOS exhibit image URL must use HTTP or HTTPS.');
        }
        if (await cache.match(imageUrl.href)) return true;

        const request = new Request(imageUrl.href, { mode: 'no-cors', credentials: 'omit' });
        const response = await fetch(request);
        if (!response.ok && response.type !== 'opaque') {
          throw new Error(`FortiOS exhibit image request failed (${response.status}).`);
        }
        await cache.put(request, response.clone());
        return true;
      }));

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          if (result.value) cachedCount += 1;
        } else {
          failedCount += 1;
          console.error('Unable to precache a FortiOS exhibit image.', result.reason);
        }
      });
    }

    event.ports[0]?.postMessage({ cachedCount, failedCount });
  })().catch((error) => {
    console.error('Unable to precache FortiOS exhibit images.', error);
    event.ports[0]?.postMessage({
      error: error instanceof Error ? error.message : 'Unable to cache FortiOS exhibit images.',
    });
  }));
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin && request.destination !== 'image') return;

  if (request.mode === 'navigate' && MODULE_ROUTE.test(url.pathname)) {
    if (EXAM_ROUTE.test(url.pathname) && !OFFLINE_FORTIOS_EXAM_ROUTE.test(url.pathname)) {
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
      const isOfflineFortiosExam = OFFLINE_FORTIOS_EXAM_ROUTE.test(clientPath);
      if (
        !MODULE_ROUTE.test(clientPath) ||
        (EXAM_ROUTE.test(clientPath) && !isOfflineFortiosExam) ||
        (url.origin !== self.location.origin && !isOfflineFortiosExam)
      ) {
        return fetch(request);
      }

      const cache = await caches.open(CACHE_NAME);
      if (isOfflineFortiosExam) {
        const cachedImage = await cache.match(request);
        if (cachedImage) return cachedImage;
      }

      try {
        const response = await fetch(request);
        if ((response.ok && (response.type === 'basic' || response.type === 'cors')) || response.type === 'opaque') {
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

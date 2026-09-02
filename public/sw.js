// Self-destructing service worker.
// The site used to register a PWA service worker (vite-plugin-pwa) that precached
// pages/JS/CSS, causing deploys to always be one refresh behind. This file replaces
// it at the same /sw.js scope so any browser that still has the old worker installed
// picks this up, wipes its caches, and unregisters itself.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', async () => {
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => caches.delete(key)));
  await self.registration.unregister();
  const clientsList = await self.clients.matchAll({ type: 'window' });
  clientsList.forEach((client) => client.navigate(client.url));
});

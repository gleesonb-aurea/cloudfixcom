// Minimal no-op service worker for production registration
// Provides a safe baseline without precaching; can be extended later.

self.addEventListener('install', (event) => {
  // Activate immediately on install
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Take control of uncontrolled clients as soon as possible
  event.waitUntil(self.clients.claim());
});

// Pass-through fetch; does not intercept or cache by default
self.addEventListener('fetch', () => {
  // Intentionally empty: network requests proceed normally
});


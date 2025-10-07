// ABOUTME: Client-side registration of service worker for offline support
// ABOUTME: Registers /sw.js in production environments when navigator.serviceWorker is available
'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistrar(): null {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error('Service worker registration failed:', err);
        });
    }
  }, []);
  return null;
}

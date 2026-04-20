// Service Worker for efficient caching
const CACHE_NAME = 'right-distractions-v1';
const STATIC_CACHE = 'static-v1';
const IMAGE_CACHE = 'images-v1';
const API_CACHE = 'api-v1';

// Cache strategies with different lifetimes
const CACHE_STRATEGIES = {
  // Static assets - cache for 1 year
  static: {
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    maxEntries: 50
  },
  // Images - cache for 30 days
  images: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxEntries: 100
  },
  // API/data - cache for 1 hour
  api: {
    maxAge: 60 * 60 * 1000, // 1 hour
    maxEntries: 50
  }
};

// Assets to pre-cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js'
];

// Install event - pre-cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !name.includes('v1'))
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests for security
  if (url.origin !== self.location.origin && 
      !url.hostname.includes('unsplash.com') &&
      !url.hostname.includes('githubusercontent.com')) {
    return;
  }

  // Determine caching strategy based on request type
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE, CACHE_STRATEGIES.static));
  } else if (isImage(request)) {
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE, CACHE_STRATEGIES.images));
  } else {
    event.respondWith(networkFirst(request, API_CACHE, CACHE_STRATEGIES.api));
  }
});

// Check if request is for static assets
function isStaticAsset(request) {
  return /\.(js|css|html|json)$/.test(request.url) ||
         request.url.includes('lottie.host');
}

// Check if request is for images
function isImage(request) {
  return /\.(jpg|jpeg|png|gif|webp|svg|ico)$/.test(request.url) ||
         request.url.includes('unsplash.com') ||
         request.url.includes('githubusercontent.com');
}

// Cache First strategy - for static assets
async function cacheFirst(request, cacheName, strategy) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    // Check if cache is still valid
    const dateHeader = cached.headers.get('sw-cache-date');
    if (dateHeader && !isExpired(dateHeader, strategy.maxAge)) {
      return cached;
    }
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Clone and cache the response
      const responseToCache = networkResponse.clone();
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cache-date', new Date().toISOString());
      
      const modifiedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      await cache.put(request, modifiedResponse);
      await trimCache(cache, strategy.maxEntries);
    }
    return networkResponse;
  } catch (error) {
    // Return stale cache if network fails
    if (cached) return cached;
    throw error;
  }
}

// Stale While Revalidate strategy - for images
async function staleWhileRevalidate(request, cacheName, strategy) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // Return cached version immediately if available
  const networkFetch = fetch(request).then(async (networkResponse) => {
    if (networkResponse.ok) {
      const headers = new Headers(networkResponse.headers);
      headers.set('sw-cache-date', new Date().toISOString());
      
      const modifiedResponse = new Response(networkResponse.clone().body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: headers
      });
      
      await cache.put(request, modifiedResponse);
      await trimCache(cache, strategy.maxEntries);
    }
    return networkResponse;
  }).catch(() => cached);

  return cached || networkFetch;
}

// Network First strategy - for API/data
async function networkFirst(request, cacheName, strategy) {
  const cache = await caches.open(cacheName);

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const headers = new Headers(networkResponse.headers);
      headers.set('sw-cache-date', new Date().toISOString());
      
      const modifiedResponse = new Response(networkResponse.clone().body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: headers
      });
      
      await cache.put(request, modifiedResponse);
      await trimCache(cache, strategy.maxEntries);
    }
    return networkResponse;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      // Check if stale cache is acceptable
      const dateHeader = cached.headers.get('sw-cache-date');
      if (dateHeader && !isExpired(dateHeader, strategy.maxAge * 2)) {
        return cached;
      }
    }
    throw error;
  }
}

// Check if cache entry is expired
function isExpired(dateString, maxAge) {
  const cachedDate = new Date(dateString);
  const now = new Date();
  return (now - cachedDate) > maxAge;
}

// Trim cache to max entries
async function trimCache(cache, maxEntries) {
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    const entriesToDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(entriesToDelete.map((key) => cache.delete(key)));
  }
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle any queued requests
  const queue = await getOfflineQueue();
  for (const request of queue) {
    try {
      await fetch(request);
      await removeFromQueue(request);
    } catch (error) {
      console.error('Background sync failed:', error);
    }
  }
}

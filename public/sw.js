// Service Worker for Tech Leadership PWA
const CACHE_NAME = 'tech-leadership-v3';
const STATIC_CACHE_NAME = 'tech-leadership-static-v3';

// Resources to cache for offline functionality
const STATIC_RESOURCES = [
  '/tech-leadership/',
  '/tech-leadership/assessments/',
  '/tech-leadership/wiki/',
  '/tech-leadership/blog/',
  '/tech-leadership/manifest.json',
  // Add critical CSS and JS files
  // Note: These would need to be updated based on actual build output
];

// API endpoints that should be cached
const API_CACHE_PATTERNS = [
  /\/tech-leadership\/search\/index\.json/,
  // Temporarily disable assessment caching during development
  // /\/tech-leadership\/assessments\/.*\.json/,
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Caching static resources');
        return cache.addAll(STATIC_RESOURCES);
      })
      .then(() => {
        // Force the waiting service worker to become the active service worker
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Claim control of all clients
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle different types of requests with appropriate strategies
  if (isStaticResource(request.url)) {
    // Cache first strategy for static resources
    event.respondWith(cacheFirst(request));
  } else if (isAPIRequest(request.url)) {
    // Network first with cache fallback for API requests
    event.respondWith(networkFirstWithCache(request));
  } else if (isNavigationRequest(request)) {
    // Network first for navigation requests with offline fallback
    event.respondWith(networkFirstWithOfflinePage(request));
  } else {
    // Default: network first
    event.respondWith(fetch(request));
  }
});

// Check if request is for static resources
function isStaticResource(url) {
  return url.includes('/tech-leadership/_astro/') || 
         url.endsWith('.css') || 
         url.endsWith('.js') || 
         url.endsWith('.png') || 
         url.endsWith('.jpg') || 
         url.endsWith('.svg') || 
         url.endsWith('.ico');
}

// Check if request is for API endpoints
function isAPIRequest(url) {
  return API_CACHE_PATTERNS.some(pattern => pattern.test(url));
}

// Check if request is a navigation request
function isNavigationRequest(request) {
  return request.mode === 'navigate';
}

// Cache first strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache first failed:', error);
    throw error;
  }
}

// Network first with cache fallback
async function networkFirstWithCache(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Network first with offline page fallback
async function networkFirstWithOfflinePage(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    console.log('Network failed for navigation, trying cache:', error);
    
    // Try to serve cached version of the requested page
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If no cached version, try to serve the main page
    const mainPageResponse = await caches.match('/tech-leadership/');
    if (mainPageResponse) {
      return mainPageResponse;
    }
    
    // Last resort: create a simple offline page
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Offline - Tech Leadership</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { 
              font-family: system-ui, sans-serif; 
              text-align: center; 
              padding: 2rem; 
              background: #f8fafc;
            }
            .container { 
              max-width: 500px; 
              margin: 0 auto; 
              background: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .offline-icon {
              font-size: 3rem;
              margin-bottom: 1rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="offline-icon">📱</div>
            <h1>You're Offline</h1>
            <p>This page isn't available offline yet. Please check your internet connection and try again.</p>
            <p>Some features like assessments work offline once they're loaded!</p>
            <button onclick="window.location.reload()">Try Again</button>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Background sync for saving assessment results
self.addEventListener('sync', (event) => {
  if (event.tag === 'save-assessment-result') {
    event.waitUntil(syncAssessmentResults());
  }
});

// Function to sync assessment results when back online
async function syncAssessmentResults() {
  try {
    // This would sync with a backend API if available
    console.log('Syncing assessment results...');
    
    // For now, just clean up any queued sync data
    const queuedResults = await getQueuedResults();
    if (queuedResults.length > 0) {
      console.log(`Found ${queuedResults.length} results to sync`);
      // In a real implementation, you would send these to your backend
      // await sendResultsToServer(queuedResults);
      await clearQueuedResults();
    }
  } catch (error) {
    console.error('Failed to sync assessment results:', error);
  }
}

// Helper functions for background sync
async function getQueuedResults() {
  // Implementation would depend on how you store queued results
  return [];
}

async function clearQueuedResults() {
  // Clear the queue after successful sync
}

// Handle push notifications (for future use)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New content available',
    icon: '/tech-leadership/favicon.ico',
    badge: '/tech-leadership/favicon.ico',
    actions: [
      {
        action: 'view',
        title: 'View'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Tech Leadership', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/tech-leadership/')
    );
  }
});
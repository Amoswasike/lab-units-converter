const CACHE_NAME = "lab-converter-v2";
const STATIC_CACHE = `${CACHE_NAME}-static`;
const RUNTIME_CACHE = `${CACHE_NAME}-runtime`;

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./js/script.js",
  "./js/state.js",
  "./js/data.js",
  "./js/ui.js",
  "./js/conversions.js",
  "./src/output.css",
  "./manifest.json",

  // ✅ NEW: screenshots cached for offline + PWA preview
  "/screenshots/desktop.png",
  "/screenshots/mobile.png",
];

// --------------------
// INSTALL (cache static assets)
// --------------------
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(async (cache) => {
      // Cache assets individually to prevent total failure if one fails
      for (const asset of STATIC_ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn("Failed to cache:", asset, err);
        }
      }
    }),
  );
});

// --------------------
// ACTIVATE (cleanup old caches, keep only current versions)
// --------------------
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE && key !== RUNTIME_CACHE) {
            console.log("Deleting old cache:", key);
            return caches.delete(key);
          }
        }),
      ),
    ),
  );
});

// --------------------
// FETCH (Split cache strategy: static vs runtime)
// --------------------
self.addEventListener("fetch", (event) => {
  // Static assets: cache-first
  if (STATIC_ASSETS.some((asset) => event.request.url.includes(asset))) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;

        return fetch(event.request).catch(() => {
          return caches.match("./index.html");
        });
      }),
    );
    return;
  }

  // Dynamic requests: network-first, fallback to cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Only cache GET requests from same origin with 200 status
        if (
          event.request.method === "GET" &&
          event.request.url.startsWith(self.location.origin) &&
          response &&
          response.status === 200
        ) {
          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(() => {
        // Try runtime cache as fallback
        return (
          caches.match(event.request) ||
          (() => {
            // Navigation requests: return cached HTML
            if (event.request.mode === "navigate") {
              return caches.match("./index.html");
            }
            // Non-navigation requests: return offline response
            return new Response("Offline", {
              status: 503,
              statusText: "Offline",
            });
          })()
        );
      }),
  );
});

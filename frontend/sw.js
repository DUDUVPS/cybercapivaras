const CACHE_NAME = "cyber-capivaras-v10";
const APP_SHELL = [
  "/",
  "/index.html",
  "/login.html",
  "/app.html",
  "/style.css?v=20260610-central-v2",
  "/site.js?v=20260610-central-v2",
  "/app.js?v=20260610-central-v2",
  "/config.js?v=20260610-pwa-tickets",
  "/assets/hero-robotica.png",
  "/imgs/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match("/index.html")))
  );
});

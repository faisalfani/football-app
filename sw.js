const CACHE_NAME = "footballapp-v1";
let urlsToCache = [
  "/",
  "/index.html",
  "/nav.html",
  "/css/style.css",
  "/css/materialize.css",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/materialize.js",
  "/js/api.js",
  "/js/nav.js",
  "/js/main.js",
  "/js/regist.js",
  "/manifest.json",
  "/img/navicon.png",
  "/img/icons/icon-72x72.png",
  "/img/icons/icon-96x96.png",
  "/img/icons/icon-152x152.png",
  "/img/icons/icon-192x192.png",
  "/img/icons/icon-384x384.png",
  "/img/icons/icon-512x512.png",
  "/pages/favTeam.html",
  "/pages/standings.html",
  "/pages/HOF.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  let base_url = "https://api.football-data.org/v2/competitions/2021/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then((response) => {
        return response || fetch(event.response);
      })
    );
  }
});

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request, { cacheName: CACHE_NAME }).then((response) => {
//       if (response) {
//         console.log("ServiceWorker : Gunakan dari Cache");
//         return response;
//       }
//       console.log(
//         "Service Worker : Memuat aset dari Server :",
//         event.request.url
//       );
//       return fetch(event.request);
//     })
//   );
// });

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker : cache " + cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

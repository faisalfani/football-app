importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute(
  [
    { url: "/", revision: "1" },
    { url: "/index.html", revision: "1" },
    { url: "/nav.html", revision: "1" },
    { url: "/css/style.css", revision: "1" },
    { url: "/css/materialize.min.css", revision: "1" },
    { url: "/js/materialize.min.js", revision: "1" },
    { url: "/js/api.js", revision: "1" },
    { url: "/js/nav.js", revision: "1" },
    { url: "/js/main.js", revision: "1" },
    { url: "/js/idb.js", revision: "1" },
    { url: "/js/db.js", revision: "1" },
    { url: "/manifest.json", revision: "1" },
    { url: "/img/navicon.png", revision: "1" },
    { url: "/img/icons/icon-72x72.png", revision: "1" },
    { url: "/img/icons/icon-96x96.png", revision: "1" },
    { url: "/img/icons/icon-152x152.png", revision: "1" },
    { url: "/img/icons/icon-192x192.png", revision: "1" },
    { url: "/img/icons/icon-384x384.png", revision: "1" },
    { url: "/img/icons/icon-512x512.png", revision: "1" },
  ],
  { ignoreUrlParametersMatching: [/.*/] }
);

workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages",
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org\/v2\//,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "apis",
  })
);

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "img/notification.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});

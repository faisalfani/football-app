if (!("serviceWorker" in navigator)) {
  console.log("service worker tidak di dukung di browser");
} else {
  registerServiceWorker();
}

initNav();

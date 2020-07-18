import { registerServiceWorker } from "./regist.js";
import initNav from "./nav.js";

if (!("serviceWorker" in navigator)) {
  console.log("service worker tidak di dukung di browser");
} else {
  registerServiceWorker();
}

initNav();

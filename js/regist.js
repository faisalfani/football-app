//fungsi pendaftaran service worker
const registerServiceWorker = () => {
  return navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log("registrasi berhasil");
      return registration;
    })
    .catch((err) => {
      console.log(err);
    });
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// fungsi request permisson notification api
const requestPermission = () => {
  Notification.requestPermission().then((result) => {
    if (result === "denied") {
      console.log("fitur notifikasi tidak diijinkan");
      return;
    } else if (result === "default") {
      console.log("pengguna menutuk kotak dialog permission");
      return;
    }

    if ("PushManager" in window) {
      navigator.serviceWorker.getRegistration().then(function (registration) {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              "BLiZQrqY0EFf66tWENRAny63xZdHaRQ1oRtTx1kCQLy_jpS5TFqb2b1lVeE23IsPhLBdJJceIzzSRWF-wPwpfOk"
            ),
          })
          .then(function (subscribe) {
            console.log(
              "Berhasil melakukan subscribe dengan endpoint: ",
              subscribe.endpoint
            );
            console.log(
              "Berhasil melakukan subscribe dengan p256dh key: ",
              btoa(
                String.fromCharCode.apply(
                  null,
                  new Uint8Array(subscribe.getKey("p256dh"))
                )
              )
            );
            console.log(
              "Berhasil melakukan subscribe dengan auth key: ",
              btoa(
                String.fromCharCode.apply(
                  null,
                  new Uint8Array(subscribe.getKey("auth"))
                )
              )
            );
          })
          .catch(function (e) {
            console.error("Tidak dapat melakukan subscribe ", e.message);
          });
      });
    }
    console.log("fitur notifikasi diijinkan");
  });
};

const showNotifikasi = () => {
  const title = "Empty Fav Tem";
  const option = {
    body:
      "Silahkan menambah Fav Team, \n cukup pergi ke page standing dan click love",
    icon: "/img/icons/icon-72x72.png",
    image: "/img/icons/icon-72x72.png",
    badge: "/img/icons/icon-72x72.png",
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, option);
    });
  } else {
    console.error("fitur notifikasi tidak diijinkan");
  }
};

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
              "BCK8l43tWxLbwTJt3Hdd65GcaRkjCMRvNdnr-wJMZUK4zSqad8qcwsUkovcHRv-n23Cn4dlL9khkHd51zhnBuY8"
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

export { registerServiceWorker };

let webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BLiZQrqY0EFf66tWENRAny63xZdHaRQ1oRtTx1kCQLy_jpS5TFqb2b1lVeE23IsPhLBdJJceIzzSRWF-wPwpfOk",
  privateKey: "36tHTQZv6G5iBnYeshssFYcw0T7Jz5Ak8xGt5QDu7sQ",
};

webPush.setVapidDetails(
  "mailto:example@domain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/fvtLdbbyJH8:APA91bHqHEMavwktbISbrvXHUQe7wABTBPhz-F_qDIPmyqxsttC0d58CYU9i1PHfS_XsYjTfJ6sWdq5fu1JA01FbTaRGiC22JitT2Zqc3ly4cX_IzrzVS67_pcc_iFyUBI7KhWEYeN3u",
  keys: {
    p256dh:
      "BCMj2VyG51GR9xOAp6OmHdSs3OEMGh0KIuMXjE2YJe0gkHu3swGM256n5Btxbr3vUW9Nh0MiQ943zHtSmMrxnTM=",
    auth: "8iOaGz/Z/+My/xBKLJCTcQ==",
  },
};

let payload = "This is Notification from Football App";

let options = {
  gcmAPIKey: "191795733058",
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);

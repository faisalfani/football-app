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
    "https://fcm.googleapis.com/fcm/send/em5uX15NWLI:APA91bFyiv9Fx9fnHCx4tpvT9Qn_rHdMNEz6NwQDbJMhoHgzff3izkDVEij9D15kvTZsID_aUayTdacO_HwZYyJ5_9qs22NTJAfZpKnlIDSwepazfB-stEASQ8l7Cl5l2uL4NWhiqIth",
  keys: {
    p256dh:
      "BJh98u38jMmVliRPmRwEoMI43Kpzq4GBfiWUbq10YvmgmNFUTYJu29hjhlkqGG7OlK6hOH/rOmBuaTy5gICFSkw=",
    auth: "RvcXDcQjxU6lof8d50TJyA==",
  },
};

let payload = "This is Notification from Football App";

let options = {
  gcmAPIKey: "191795733058",
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);

const webPush = require('web-push')

const vapidKeys = {
  publicKey: 'BMCV2ji6nmg6kFQrvJ9_gnkM0WuatBIlEj5nN2vM3CSDk40EbuD9mKLLYoZ851ZEDxwmkpGTrxFbMEgm_qCOrtM',
  privateKey: '7nJY3ORwNAme_XNM-umyCuT8QX1gyDKB_E3RGzsQMwY'
}

webPush.setVapidDetails(
  'mailto:ericksuryadinata@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const pushSubscriptionPWA = {
  endpoint: ' https://fcm.googleapis.com/fcm/send/cB6MoSM7ExM:APA91bFp8Aj1v-o7tObLgCNSO6iLO9ZJfhiKJXxh6WQc-SzKFyb-tDRrmYeiDsxfy-sJe9nKSphMLWVil2N9rtpJg3pIvPMsj-vXmUTQNnFj9uDnVjhCcNJsAzvDATcB0JE2bLivs4LP',
  keys: {
    p256dh: 'BNiESCquMisqE6/mzL7zI2IynxUqeU8OwU8kZx/3L7Kowcti+Rrp9YCxPDxMnN8QWDIi9c2LebELs/dm+ajM8Y8=',
    auth: 'WeUeO5H8GY08q6tZlNjUXg=='
  }
}

const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!'

const options = {
  gcmAPIKey: '643608232988',
  TTL: 60
}

webPush.sendNotification(
  pushSubscriptionPWA,
  payload,
  options
)

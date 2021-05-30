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
  endpoint: 'https://fcm.googleapis.com/fcm/send/f4l8r4h52I4:APA91bHR1YXbZDQ7Rv-npR7zDDd6Mvsw_2jE17p65alM8NePRNpwhxNRMjmIH2WTCeLLeBF0RcHz9r8CUUtKFRoSpuyiSh2RYMGweIOu529zJqxjmGrx3f0n0RF39Vr16pAwp4jJZVgd',
  keys: {
    p256dh: 'BAudW4VR+DvXBgSbUMjtFJih4cZRHjBmTL9JI2HIDKbUFMpx8CQRbpBArMkPoWplIFwaVwQCMuqiP9A/ojMAYFs=',
    auth: 'YuvkzehA4FZd/BmcN4qCDQ=='
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

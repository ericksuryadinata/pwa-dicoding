if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .then(() => {
        console.log('Pendaftaran ServiceWorker berhasil') // eslint-disable-line no-console
      })
      .catch(() => {
        console.log('Pendaftaran ServiceWorker gagal') // eslint-disable-line no-console
      })
  })
} else {
  console.log('ServiceWorker belum didukung browser ini.') // eslint-disable-line no-console
}

if ('Notification' in window) {
  Notification
    .requestPermission()
    .then(result => {
      if (result === 'denied') {
        console.log('Fitur notifikasi tidak diijinkan.') // eslint-disable-line no-console
        return
      }

      if (result === 'default') {
        console.error('Pengguna menutup kotak dialog permintaan ijin.') // eslint-disable-line no-console
        return
      }

      navigator.serviceWorker.getRegistration().then(reg => {
        reg.showNotification('Notifikasi diijinkan!')
      })

      console.log('Fitur notifikasi diijinkan.') // eslint-disable-line no-console
    })
} else {
  console.error('Browser tidak mendukung notifikasi.') // eslint-disable-line no-console
}

if (('PushManager' in window)) {
  navigator.serviceWorker.getRegistration().then(registration => {
    registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('BMCV2ji6nmg6kFQrvJ9_gnkM0WuatBIlEj5nN2vM3CSDk40EbuD9mKLLYoZ851ZEDxwmkpGTrxFbMEgm_qCOrtM') // eslint-disable-line no-undef
    }).then(subscribe => {
      console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint) // eslint-disable-line no-console
      console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh'))))) // eslint-disable-line no-console
      console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth'))))) // eslint-disable-line no-console
    }).catch(e => {
      console.error('Tidak dapat melakukan subscribe ', e.message) // eslint-disable-line no-console
    })
  })
}

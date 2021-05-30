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

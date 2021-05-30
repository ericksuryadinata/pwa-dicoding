/* eslint no-restricted-globals: 1 */
const CACHE_NAME = 'dsultan-v1.3-rc2'
const urlsToCache = [
  '/',
  'sw-register.js',
  'manifest.json',
  '/components/nav.html',
  '/index.html',
  '/pages/beranda.html',
  '/pages/pesan.html',
  '/pages/produk.html',
  '/pages/testimonial.html',
  '/assets/materialize/css/materialize.min.css',
  '/assets/materialize/js/materialize.min.js',
  '/assets/image/dsultan-kering-tempe-kemasan.webp',
  '/assets/image/dsultan-kering-tempe-mangkuk.webp',
  '/assets/image/dsultan-kering-tempe-250-gram.webp',
  '/assets/image/dsultan-kering-tempe-500-gram.webp',
  '/assets/image/dsultan-kering-tempe-dengan-nasi.webp',
  '/assets/image/dsultan-kering-tempe-teri-tuban.webp',
  '/assets/image/dsultan-kering-tempe-testimonial-1.webp',
  '/assets/image/dsultan-kering-tempe-testimonial-2.webp',
  '/assets/image/dsultan-kering-tempe-testimonial-3.webp',
  '/assets/image/dsultan-kering-tempe-testimonial-4.webp',
  '/assets/image/dsultan-kering-tempe.webp',
  '/assets/image/icon.png',
  '/assets/image/icon-192x192.png',
  '/assets/image/icon-512x512.png',
  '/assets/js/main.js',
  '/assets/css/main.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  )
})

self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting()
  }
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(response => {
        if (response) {
          console.log('ServiceWorker: Gunakan aset dari cache: ', response.url) // eslint-disable-line no-console
          return response
        }

        // eslint-disable-next-line no-console
        console.log(
          'ServiceWorker: Memuat aset dari server: ',
          event.request.url
        )
        return fetch(event.request)
      })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if (!CACHE_NAME.includes(cacheName)) {
          console.log(`ServiceWorker: cache ${cacheName} dihapus`) // eslint-disable-line no-console
          return caches.delete(cacheName)
        }
        return true
      })
    )).then(() => {
      console.log('Newest Worker') // eslint-disable-line no-console
    })
  )
})

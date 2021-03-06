/* global workbox */
/* eslint no-restricted-globals: 1 */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')

workbox.setConfig({ debug: true })
const { setCacheNameDetails, skipWaiting, clientsClaim } = workbox.core
const { registerRoute } = workbox.routing
const { CacheFirst, StaleWhileRevalidate } = workbox.strategies
const { CacheableResponsePlugin } = workbox.cacheableResponse
const { precacheAndRoute } = workbox.precaching

setCacheNameDetails({
  prefix: 'pwa-dicoding',
  suffix: 'v2',
  precache: 'pc-rc-2',
  runtime: 'rt-rc-2'
})

skipWaiting()
clientsClaim()

precacheAndRoute([
  { url: '/pwa-dicoding/', revision: 1 },
  { url: '/pwa-dicoding/sw-register.js', revision: 1 },
  { url: '/pwa-dicoding/manifest.json', revision: 1 },
  { url: '/pwa-dicoding/components/nav.html', revision: 1 },
  { url: '/pwa-dicoding/index.html', revision: 1 },
  { url: '/pwa-dicoding/pages/beranda.html', revision: 1 },
  { url: '/pwa-dicoding/pages/klasemen.html', revision: 1 },
  { url: '/pwa-dicoding/pages/teams.html', revision: 1 },
  { url: '/pwa-dicoding/pages/team.html', revision: 1 },
  { url: '/pwa-dicoding/pages/favorite.html', revision: 1 },
  { url: '/pwa-dicoding/assets/js/db.js', revision: 1 },
  { url: '/pwa-dicoding/assets/js/api.js', revision: 1 },
  { url: '/pwa-dicoding/assets/js/main.js', revision: 1 },
  { url: '/pwa-dicoding/assets/js/init.js', revision: 1 },
  { url: '/pwa-dicoding/assets/js/materialize.min.js', revision: 1 },
  { url: '/pwa-dicoding/assets/image/PL.png', revision: 1 },
  { url: '/pwa-dicoding/assets/image/PL-Logo.png', revision: 1 },
  { url: '/pwa-dicoding/assets/image/icon.png', revision: 1 },
  { url: '/pwa-dicoding/assets/image/icon-192x192.png', revision: 1 },
  { url: '/pwa-dicoding/assets/image/icon-512x512.png', revision: 1 },
  { url: '/pwa-dicoding/assets/css/main.css', revision: 1 },
  { url: '/pwa-dicoding/assets/css/materialize.min.css', revision: 1 }
])

registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new CacheFirst({ cacheName: 'images' })
)

registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({ cacheName: 'google-fonts-stylesheets' })
)

registerRoute(
  /^https:\/\/unpkg\.com/,
  new StaleWhileRevalidate({ cacheName: 'unpkg-index-db' })
)

// Menyimpan cache untuk file font selama 1 tahun
registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({ cacheName: 'google-fonts-webfonts' })
)

registerRoute(
  /^https:\/\/api\.football-data\.org\/v2/,
  new StaleWhileRevalidate({
    cacheName: 'api-football-data',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] })
    ]
  })
)

self.addEventListener('push', event => {
  let bodyData
  if (event.data) {
    bodyData = event.data.text()
  } else {
    bodyData = 'Push message no payload'
  }
  const options = {
    body: bodyData,
    icon: 'assets/image/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  }
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  )
})

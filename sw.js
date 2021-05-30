/* eslint no-restricted-globals: 1 */
const CACHE_NAME = 'premier-league-v1.rc-12'
const urlsToCache = [
  '/',
  'sw-register.js',
  'manifest.json',
  '/components/nav.html',
  '/index.html',
  '/pages/beranda.html',
  '/pages/klasemen.html',
  '/pages/teams.html',
  '/pages/team.html',
  '/pages/favorite.html',
  '/assets/js/db.js',
  '/assets/js/api.js',
  '/assets/js/main.js',
  '/assets/js/init.js',
  '/assets/js/materialize.min.js',
  '/assets/image/PL.png',
  '/assets/image/PL-Logo.png',
  '/assets/image/icon.png',
  '/assets/image/icon-192x192.png',
  '/assets/image/icon-512x512.png',
  '/assets/css/main.css',
  '/assets/css/materialize.min.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  'https://unpkg.com/idb@5.0.7/build/iife/index-min.js'
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
  const baseUrl = 'https://api.football-data.org/v2/'

  console.log(event.request.url) // eslint-disable-line no-console
  if (event.request.url.indexOf(baseUrl) > -1) {
    event
      .respondWith(
        caches
          .open(CACHE_NAME)
          .then(async cache => {
            console.log(cache) // eslint-disable-line no-console
            return fetch(event.request)
              .then(response => {
                cache.put(event.request.url, response.clone())
                return response
              })
          })
      )
  } else {
    event.respondWith(
      caches
        .match(event.request, { ignoreSearch: true })
        .then(response => {
          console.log(response) // eslint-disable-line no-console
          return response || fetch(event.request)
        })
    )
  }
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

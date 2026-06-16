// 来得及 — Service Worker
// 提供基础离线缓存和快速加载

const CACHE_NAME = 'laideji-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/manifest.json',
        '/icon-192.png',
        '/icon-512.png',
      ])
    })
  )
})

self.addEventListener('fetch', (event) => {
  // 只缓存 GET 请求，跳过 API 和 NextAuth
  const url = new URL(event.request.url)
  if (event.request.method !== 'GET') return
  if (url.pathname.startsWith('/api/')) return

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request).then((response) => {
        if (response.ok && url.pathname.match(/\.(js|css|png|svg|ico|woff2?)$/)) {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
        }
        return response
      })
      return cached || fetchPromise
    })
  )
})

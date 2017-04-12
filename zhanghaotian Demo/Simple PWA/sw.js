// self: 表示 Service Worker 作用域, 也是全局变量
// caches: 表示缓存
// skipWaiting: 表示强制当前处在 waiting 状态的脚本进入 activate 状态
// clients: 表示 Service Worker 接管的页面
// var cacheStorageKey = 'minimal-pwa-1'
console.log('Script loaded!')
var cacheStorageKey = 'minimal-pwa-7'
var cacheList = [
  '/',
  "index.html",
  "index.css",
  "smi256.png"
]
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheStorageKey).then(function(cache) {
      return cache.addAll(cacheList)
    }).then(function() {
      return self.skipWaiting()
    })
  )
}) 
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response != null) {
        return response
      }
      return fetch(e.request.url)
    })
  )
})
self.addEventListener('activate', function(e) {
  e.waitUntil(
    Promise.all(
      caches.keys().then(cacheNames => {
        return cacheNames.map(name => {
          if (name !== cacheStorageKey) {
            return caches.delete(name)
          }
        })
      })
    ).then(() => {
      return self.clients.claim()
    })
  )
})
/* 鸟讯地图 Service Worker：静态资源与数据分片缓存 */
const CACHE = 'birdmap-v1';
const TIMEOUT_MS = 3000;

self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(function (k) { return k.indexOf('birdmap-') === 0 && k !== CACHE; })
      .map(function (k) { return caches.delete(k); }));
    await self.clients.claim();
  })());
});

function cacheFirst(req) {
  return caches.open(CACHE).then(async function (cache) {
    const hit = await cache.match(req);
    if (hit) return hit;
    const resp = await fetch(req);
    if (resp && resp.ok) cache.put(req, resp.clone());
    return resp;
  });
}

function staleWhileRevalidate(req) {
  return caches.open(CACHE).then(async function (cache) {
    const hit = await cache.match(req);
    const net = fetch(req).then(function (resp) {
      if (resp && resp.ok) cache.put(req, resp.clone());
      return resp;
    }).catch(function () { return null; });
    if (hit) return hit;
    return (await net) || Response.error();
  });
}

function networkFirst(req) {
  return caches.open(CACHE).then(function (cache) {
    const net = fetch(req).then(function (resp) {
      if (resp && resp.ok) cache.put(req, resp.clone());
      return resp;
    }).catch(function () { return null; });
    const timeout = new Promise(function (resolve) {
      setTimeout(async function () {
        const hit = await cache.match(req);
        resolve(hit || null);
      }, TIMEOUT_MS);
    });
    return Promise.race([net, timeout]).then(function (r) {
      return r || net;
    });
  });
}

self.addEventListener('fetch', function (event) {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const path = url.pathname;
  if (path.endsWith('/') || path.endsWith('/index.html')) {
    event.respondWith(networkFirst(req));
  } else if (path.indexOf('/alert_data/') > -1 || path.endsWith('/local_rarity.js')) {
    event.respondWith(staleWhileRevalidate(req));
  } else if (path.endsWith('/echarts.min.js') ||
             path.endsWith('/echarts-extension-amap.min.js')) {
    event.respondWith(cacheFirst(req));
  }
});

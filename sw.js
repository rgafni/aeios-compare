/* AEIOS service worker: network first, always. Only the app shell (files listed below) is kept, as an offline
   fallback; nothing else is ever cached (no query-string URLs, no other pages, nothing cross-origin). */
var CACHE = 'aeios-shell-v2';
var SHELL = ['./', 'index.html', 'install.js', 'install.css', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-192.png', 'icons/maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-32.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  var scope = new URL(self.registration.scope);
  if (url.pathname.indexOf(scope.pathname) !== 0) return;
  var rel = url.pathname.slice(scope.pathname.length) || './';
  var top = req.mode === 'navigate' && (rel === './' || rel === 'index.html');
  if (!top && (url.search || SHELL.indexOf(rel) < 0)) return;          // not shell: plain network, never stored
  var key = top ? './' : rel;
  e.respondWith(fetch(req).then(function (r) {
    if (r && r.ok && r.type === 'basic' && !r.redirected) { var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put(key, copy); }); }
    return r;
  }).catch(function () { return caches.match(key); }));
});

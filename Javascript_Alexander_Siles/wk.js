var CACHE = 'cacheupdateandrefresh';
self.addEventListener('install', function (event) {
    console.log('The service worker is being installed.');
    event.waitUntil(caches.open(CACHE).then(function (cache) {
        cache.addAll([
     'css/estilos.css',
    'js/app.js',
    'image/%.png',
        'image/0.png',
        'image/1.png',
        'image/2.png',
        'image/3.png',
        'image/4.png',
        'image/5.png',
        'image/6.png',
        'image/7.png',
        'image/8.png',
        'image/9.png',
        'image/Calculadora.png',
        'image/dividido.png',
        'image/fondo.png',
        'image/fondoCalc.png',
        'image/igual.png',
        'image/libreta.png',
        'image/mas.png',
        'image/menos.png',
        'image/notas.png',
        'image/ON.png',
        'image/por.png',
        'image/punto.png',
        'image/raiz.png',
        'image/sign.png',
    ]);
    }));
});
self.addEventListener('fetch', function (event) {
    console.log('The service worker is serving the asset.');
    event.respondWith(fromCache(event.request));
    event.waitUntil(
        update(event.request).then(refresh));
});

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request);
    });
}

function update(request) {
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response.clone()).then(function () {
                return response;
            });
        });
    });
}

function refresh(response) {
    return self.clients.matchAll().then(function (clients) {
        clients.forEach(function (client) {
            var message = {
                type: 'refresh',
                url: response.url,
                eTag: response.headers.get('ETag')
            };
            client.postMessage(JSON.stringify(message));
        });
    });
}

self.addEventListener('activate', function (event) {

    var cacheWhitelist = 'my-site-cache-v1';

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
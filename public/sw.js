//cache version
const cacheName = "v1";

let baseUrl = location.href.replace("/sw.js", "");

const imageURLs = [
    `${baseUrl}/dist/board.svg`,
    `${baseUrl}/dist/long_v.svg`,
    `${baseUrl}/dist/long.svg`,
    `${baseUrl}/dist/player.svg`,
    `${baseUrl}/dist/short_v.svg`,
    `${baseUrl}/dist/short.svg`,
];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches
            .open(cacheName)
            .then((cache) => {
                return cache.addAll(imageURLs);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (e) => {
    //remove old caches
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            const cachesDelete = cacheNames.filter(
                (cache) => cache !== cacheName
            );
            return Promise.all(cachesDelete.map((c) => caches.delete(c)));
        })
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        fetch(e.request)
            .then((res) => {
                // Make a clone of the response
                const resClone = res.clone();
                caches.open(cacheName).then((cache) => {
                    //ignore svg's because they are already in cache
                    if (e.request.url.startsWith("http")) {
                        //skip request
                        if (!e.request.url.endsWith(".svg")) {
                            cache.put(e.request, resClone);
                        }
                    }
                });
                return res;
            })
            .catch((err) => caches.match(e.request).then((res) => res))
    );
});

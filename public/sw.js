//cachec version
const cacheName = "v1";

const imageURLs = [
    "/dist/board.svg",
    "/dist/long_v.svg",
    "/dist/long.svg",
    "/dist/player.svg",
    "/dist/short_v.svg",
    "/dist/short.svg",
];

self.addEventListener("install", (e) => {
    console.log("Service Worker: Installed");
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
    console.log("Service Worker: Activated");
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

const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
  "./",
  "/login",
  "/loader.js",
  "/routes/admin.js",
  "/app.js",
  "/routes/genetic.js",
  "/routes/index.js",
  "/auth",
  "/views/partials/header.ejs",
  "/views/add_smartphone.ejs",
  "/views/adminhome.ejs",
  "/views/brand_smart.ejs",
  "/views/edit_adminprof.ejs",
  "/views/edit_smart.ejs",
  "/views/geneform.ejs",
  "/views/index.ejs",
  "/views/login_smart.ejs",
  "/views/reg_smart.ejs",
  "/views/result.ejs",
  "/views/view_profadmin.ejs",
  "/views/view_smart.ejs",
  "/images/icons/icon-144x144.png",
  "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
  "https://www.w3schools.com/w3css/4/w3.css",
  "https://fonts.googleapis.com/css?family=Lato",
  "https://fonts.googleapis.com/css?family=Montserrat",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
  
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          // check cached items size
          limitCacheSize(dynamicCacheName, 3);
          return fetchRes;
        })
      });
    }).catch(() => {
      if(evt.request.url.indexOf('.ejs') > -1){
        return caches.match('/views/fallback.ejs');
      } 
    })
  );
});
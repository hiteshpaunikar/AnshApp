
const staticCacheName = ['ansh-v1'];
const CACHE_NAME='ansh-v1';

const URLS_CACHE_ONLY = [
	  '/AnshApp/images/mic.png'	,
	  '/AnshApp/Shortcut_Home.PNG',
	  '/AnshApp/Shortcut_Supp.PNG',
	  '/AnshApp/images/about.png',
	  '/AnshApp/images/amo.png',
	  '/AnshApp/images/ansh.png',
	   '/AnshApp/images/box.png',
	  '/AnshApp/images/calendar.png',
	  '/AnshApp/images/call.png',
	   
	  '/AnshApp/images/doctor.png',
	  '/AnshApp/images/guest.png',
	   '/AnshApp/images/holiday.png',
	  '/AnshApp/images/ic_launcher_round.png',
	   '/AnshApp/images/imptel.png',
	  '/AnshApp/images/isrologo.jpg',
	  '/AnshApp/images/items.png',
	  '/AnshApp/images/map.png',
	  '/AnshApp/images/nabh.png',
	  '/AnshApp/images/nonnabh.png',
	  '/AnshApp/images/notes.png',
	  '/AnshApp/images/phone.png',
	  '/AnshApp/images/saclogo.jpg',
	  '/AnshApp/images/icu.png',
	  
	  '/AnshApp/images/specialist.png',
	  '/AnshApp/images/spinner_arrow.png',
	  '/AnshApp/images/supplementry.png',
	  '/AnshApp/images/undraw_add_tasks_mxew.svg',
	  '/AnshApp/images/wardcharges.png',
	  '/AnshApp/images/icons/icon-72x72.png',
	  '/AnshApp/images/icons/icon-96x96.png',
	  '/AnshApp/images/icons/icon-128x128.png',
	  '/AnshApp/images/icons/icon-144x144.png',
	  '/AnshApp/images/icons/icon-152x152.png',
	  '/AnshApp/images/icons/icon-192x192.png',
	  '/AnshApp/images/icons/icon-384x384.png',
	  '/AnshApp/images/icons/icon-512x512.png',
	  
	  '/AnshApp/css/all.min.css' ,
	  '/AnshApp/css/bootstrap.min.css' ,
	  
	  "/AnshApp/js/jquery.min.js",
	  "/AnshApp/js/bootstrap.bundle.min.js",
	  
	  
	   
	   "/AnshApp/fonts/fa-brands-400.ttf",
	   "/AnshApp/fonts/fa-brands-400.woff",
	   "/AnshApp/fonts/fa-brands-400.woff2",
	   
	   
	   "/AnshApp/fonts/fa-regular-400.ttf",
	   "/AnshApp/fonts/fa-regular-400.woff",
	   "/AnshApp/fonts/fa-regular-400.woff2",
	   
	   
	   "/AnshApp/fonts/fa-solid-900.ttf",
	   "/AnshApp/fonts/fa-solid-900.woff",
	   "/AnshApp/fonts/fa-solid-900.woff2",
	   

	   

];

const URLS_OVER_NETWORK_WITH_CACHE_FALLBACK = [
	
	'/AnshApp/manifest.json',
	'/AnshApp/js/app.js',
	
	'/AnshApp/index.html',
	'/AnshApp/doctors.html',
	'/AnshApp/guesthouse.html',
	'/AnshApp/holiday.html',
	'/AnshApp/ImpTelephone.html',
	'/AnshApp/SupplItems.html',
	'/AnshApp/Inadmissible.html',
	'/AnshApp/WardCharges.html',
	'/AnshApp/About.html',
	

	'/AnshApp/data/DoctorsData.json',
	'/AnshApp/data/GuesthousesData.json',  
	'/AnshApp/data/HolidayData.json',   
	

];

//document.getElementById("panelInstall").show();

let deferredPrompt;

self.addEventListener('beforeinstallprompt', evt => {
	console.log('before install prompt');
	evt.preventDefault();
	deferredPrompt = evt; 

	setTimeout(() => {
		if(deferredPrompt) {
			deferredPrompt.prompt();

			deferredPrompt.userChoice.then((choiceResult) => {
				if(choiceResult.outcome === 'accepted') {
					console.log('user accepted install prompt');
				} else {
					console.log('user dismmised install prompt');
				}
			deferredPrompt=null;
			});
		}
		},2000);
	});





self.addEventListener("install", event => {
	console.log('Inside install');
	/*evt.waitUntil(
			    caches.open(staticCacheName).then(cache => {
			    	console.log("Installed"+URLS_CACHE_ONLY);
			    	cache.addAll(URLS_CACHE_ONLY);
			    })
	)*/
	
	event.waitUntil(
		       caches.open(staticCacheName).then(function(cache) {
		    	   console.log('adding to cache');
		           return cache.addAll(
		            URLS_CACHE_ONLY.concat(URLS_OVER_NETWORK_WITH_CACHE_FALLBACK)
		           );
		       }).catch((err) => {
		           console.log(err);
		           return new Promise((resolve, reject) => {
		               reject('ERROR: ' + err);
		           });
		       })
		   );
	
})

self.addEventListener("activate", evt => {
	console.log("Activated service worker");
	/*evt.waitUntil(
			caches.keys().then(keyList => {
				console.log(keyList);
				console.log(staticCacheName);
				return Promise.all(keyList
						.map(key => {
							console.log('---');
							console.log('Key : ' + key);
							console.log('Cache Name : ' + staticCacheName);
							console.log('---');
							if(key != staticCacheName){
								console.log("Deleting "+key);
							//	var tmp = caches.delete(key);
								console.log(tmp);
								//return tmp;
							}
						})
						)
			})
	);
	return self.clients.claim();*/
	
	evt.waitUntil(
		       caches.keys().then(function (cacheNames) {
		           return Promise.all(
		               cacheNames.map(function (cacheName) {
		            	   console.log(staticCacheName + " : " + cacheName);
		                   if (staticCacheName != cacheName && cacheName.startsWith("ansh")) {
		                	   
		                	   console.log("Deleting cache");
		                       return caches.delete(cacheName);
		                   }
						   
		               })
		           );
		       })
		   );
})

self.addEventListener('message',(event) => {
	if(event.data.action === 'getCacheName') {
		event.source.postMessage({
			action : 'setCacheName',
			cacheName:CACHE_NAME
		});
	}
})
 
self.addEventListener("fetch", evt => {
	 console.log("Fetch : " + evt.request.url);
/*	evt.respondWith(
			   caches.match(evt.request).then(function(response) {
			     return response || fetch(evt.request);
			   })
			 );*/
	 
	 
	 
	   const requestURL = new URL(evt.request.url);
console.log("PATH Name URL : " + requestURL.pathname);
	   if (requestURL.pathname == '/' || requestURL.pathname == '/AnshApp/') {
			console.log("first time");
		   evt.respondWith(getByNetworkFallingBackByCache("/AnshApp/"));
	   } else if (URLS_OVER_NETWORK_WITH_CACHE_FALLBACK.includes(requestURL.href) ||
	       URLS_OVER_NETWORK_WITH_CACHE_FALLBACK.includes(requestURL.pathname)) {
			console.log("second time");
		   evt.respondWith(getByNetworkFallingBackByCache(evt.request));
	   } else if (URLS_CACHE_ONLY.includes(requestURL.href) || 
	      URLS_CACHE_ONLY.includes(requestURL.pathname)) {
			console.log("third time");
		   evt.respondWith(getByCacheOnly(evt.request));
	   } else{
		console.log("four time");
	   }
})


/**
* 1. We fetch the request over the network
* 2. If successful we add the new response to the cache
* 3. If failed we return the result from the cache
*
* @param request
* @param showAlert
* @returns Promise
*/
const getByNetworkFallingBackByCache = (request, showAlert = false) => {
	
   return caches.open(staticCacheName).then((cache) => {
	   console.log("fetch from network and then cache");
       return fetch(request).then((networkResponse) => {
           cache.put(request, networkResponse.clone());
           return networkResponse;
       }).catch(() => {
           if (showAlert) {
               alert('You are in offline mode. The data may be outdated.')
           }

           return caches.match(request) ;
       });
   }); 
  /* const url=request.url;
   if (url && url.includes('DoctorsData.json')) {
    console.log("if parth");
      fetch(request)
        .then(async response => {
          const clone = response.clone();
          const data = await clone.json();
          
          // Check if version has changed
          if (currentDoctorVersion === null) {
			console.log("Doctor data version first time");
            currentDoctorVersion = data.version;
          } else if (currentDoctorVersion !== data.version) {
            // Version changed, only update doctor.json in cache
			console.log("Doctor data version changed"+currentDoctorVersion);
            currentDoctorVersion = data.version;
            
            const cache = await caches.open(staticCacheName);
            await cache.delete(request.url);
            await cache.put(request, response.clone());
          }
          
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    
  } else {
    console.log("els parth");
      caches.match(request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(request)
            .then(response => {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Clone the response
              const responseToCache = response.clone();

              caches.open(staticCacheName)
                .then(cache => {
                  cache.put(request, responseToCache);
                });

              return response;
            });
        })
    
  } */
};



const getByCacheThenNetwork = (request, showAlert = false) => {

	caches.match(request).then((cachedResponse)=> {
		console.log("fetch from network ");
		const netwrorkFetch = fetch(request)
		.then((networkResponse) => {
			return caches.open(staticCacheName).then((cache) => {
				cache.put(request, networkResponse.clone());
				return networkResponse;
			});
		})
		.catch(() => {
			console.log("if no network then return from cache ");
			return cachedResponse;
		});
		console.log("return from cache ");
		return cachedResponse || netwrorkFetch;
	});
};
 
 
/**
* Get from cache
*
* @param request
* @returns Promise
*/
const getByCacheOnly = (request) => {
	console.log("fetch from cache");
   return caches.open(staticCacheName).then((cache) => {
       return cache.match(request).then((response) => {
           return response;
       });
   });
};
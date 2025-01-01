    if ("serviceWorker" in navigator) {
		window.addEventListener('load',() => {
    	    navigator.serviceWorker
    	      .register("./serviceWorker.js")
    	      .then(res => {
				console.log(res);
				
			  })
    	      .catch(err => console.log( err));
			});
    	    
    	    setTimeout(() => {
    	        /*const img = new Image();
    	        img.src = '/dog.svg';
    	        document.body.appendChild(img);*/
    	    	console.log("Timed out..");
    	      }, 3000);
    	  
			  
			  if(window.location.pathname === '/AnshApp/About.html') {
				navigator.serviceWorker.ready.then((registration) => {
					registration.active.postMessage({action:'getCacheName'});
				});

				navigator.serviceWorker.addEventListener('message',(event)=> {
					if(event.data.action ==='setCacheName') {
						document.getElementById('cache-name').textContent=event.data.cacheName;
					}
				})

			  }

//    	  navigator.serviceWorker.register("./serviceWorker.js");
    	    window.addEventListener('beforeinstallprompt', event => {
    	        event.preventDefault();
    	        var panelInstall = document.getElementById('panelInstall');
    	    //    panelInstall.style.display = "block";
    	        
    	        // var btnInstall=document.getElementById('btnInstall');
    	        // btnInstall.addEventListener('click', () => {
    	        //     event.prompt();
    	        //     panelInstall.style.display = "none";
    	        //   });
    	        

    	        console.log('before install prompt');
    	    	  
    	      });
    	  
    	}
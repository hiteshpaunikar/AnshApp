    if ("serviceWorker" in navigator) {
		window.addEventListener('load',() => {
    	    navigator.serviceWorker
    	      .register("./serviceWorker.js")
    	      .then(res => {
				console.log(res);
				
			  })
    	      .catch(err => console.log( err));
			});
    	    
    	    /*setTimeout(() => {
    	      
    	    	console.log("Timed out..");
    	      }, 3000);*/
    	  
			  
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
    	    /*window.addEventListener('beforeinstallprompt', event => {
    	        event.preventDefault();
    	        var panelInstall = document.getElementById('panelInstall');
    	    //    panelInstall.style.display = "block";
    	        
    	        // var btnInstall=document.getElementById('btnInstall');
    	        // btnInstall.addEventListener('click', () => {
    	        //     event.prompt();
    	        //     panelInstall.style.display = "none";
    	        //   });
    	        

    	        console.log('before install prompt');
    	    	  
    	      }); */


			 
			 // if we use Localstorage instead of session storage, it will save permanently and will not open , even though, browser close and open
			 if(window.location.pathname === '/AnshApp/index.html' || window.location.pathname === '/AnshApp/') {
			 let deferredPrompt;

			  window.addEventListener('beforeinstallprompt', evt => {
				if(localStorage.getItem('InstallPromptShown') === 'true') {
					return;
				}
				console.log('before install prompt FROM app.js');
				evt.preventDefault();
				deferredPrompt = evt; 
			
				setTimeout(() => {
					/*if(deferredPrompt) {
						deferredPrompt.prompt();
			
						deferredPrompt.userChoice.then((choiceResult) => {
							if(choiceResult.outcome === 'accepted') {
								console.log('user accepted install prompt');
								localStorage.setItem('InstallPromptShown','true');
							} else {
								console.log('user dismmised install prompt');
							}
							
						deferredPrompt=null;
						});
					}*/
					document.getElementById('panelInstall').style.display='block';
					document.getElementById('btnInstall').addEventListener('click',() => {
					
						if(deferredPrompt) {
							deferredPrompt.prompt();
				
							deferredPrompt.userChoice.then((choiceResult) => {
								if(choiceResult.outcome === 'accepted') {
									console.log('user accepted install prompt');
									localStorage.setItem('InstallPromptShown','true');
								} else {
									console.log('user dismmised install prompt');
								}
							document.getElementById('panelInstall').style.display='none';
							deferredPrompt=null;
							});
						}
					});
					
					

					},1000);
				});
    	  
			}
    	}
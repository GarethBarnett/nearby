/* Main JS Files */


let loader = document.getElementById("splash");


/** Splash Animation */
setTimeout(function () {
   'use strict';
   loader.classList.add('slideOutUp');
}, 3000);


/** Splash Removal */
setTimeout(function () {
   'use strict';
   loader.parentNode.removeChild(loader);
}, 4000);



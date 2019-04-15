/* Main JS Files */

/* Gareth */
let loader = document.getElementById("splash");


/* Splash Animation */
setTimeout(function () {
   'use strict';
   loader.classList.add('slideOutUp');
}, 3000);


/* Splash Removal */
setTimeout(function () {
   'use strict';
   loader.parentNode.removeChild(loader);
}, 4000);


/* Global variables */
let infoMenuBtn = document.getElementById('pullBtn');
let panel = document.getElementById('panel');
let infoMenuOpen = document.getElementsByClassName('infoMenuOpen')[0];
let backBtn = document.getElementsByClassName('infoMenuLow')[0];
let infoMenuContainer = document.getElementById('infoMenuContainer');



/* Info Menu Expand */
infoMenuBtn.addEventListener("click", function () {
	infoMenuOpen.classList.toggle('infoMenuMove');
});




/* Info Menu Back */
backBtn.addEventListener("click", function () {
	infoMenuContainer.classList.toggle('hide');
	panel.classList.remove('hide');
});
/* Gareth */

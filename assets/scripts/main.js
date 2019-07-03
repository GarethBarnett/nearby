/* Main JS Files */

/* Gareth */

let loader = document.getElementById("splash");

/* Splash Animation */
setTimeout(function () {
   'use strict';
   loader.classList.add('slideOutUp');
}, 2000);


/* Splash Removal */
setTimeout(function () {
   'use strict';
   loader.parentNode.removeChild(loader);
}, 3000);




/* Global variables */
let infoMenuBtn = document.getElementById('pullBtn');


let panel = document.getElementById('panel');
let infoMenuOpen = document.getElementsByClassName('infoMenuOpen')[0];
let backBtn = document.getElementsByClassName('infoMenuLow')[0];
let infoMenuContainer = document.getElementById('infoMenuContainer');



/* Jason */
let busMenuBtn = document.getElementById('busPullBtn');
let busMenuOpen = document.getElementsByClassName('busMenuOpen')[0];
let busMenuContainer = document.getElementById('busMenuContainer');
let resetBtn = document.getElementsByClassName('busMenuLow')[0];

let transportPanels = document.getElementsByClassName('transportPanels')[0];
/* Jason */




/* Gareth */
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


/* Jason */
busMenuBtn.addEventListener("click", function () {
	busMenuOpen.classList.toggle('busMenuMove');
	transportPanels.classList.toggle('busMenuMove');
});


/* Bus Info Menu Back */
resetBtn.addEventListener("click", function () {
	busMenuContainer.classList.toggle('hide');
	panel.classList.remove('hide');
	transportPanels.classList.add('hide');
});
/* Jason */
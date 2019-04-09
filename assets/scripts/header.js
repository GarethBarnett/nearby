// TypeIT //

new TypeIt('#breakLines', {
    strings: ["Explore Nearby", "Select an Icon to get started"],
    speed: 60,
    waitUntilVisible: true,
    cursor: false
}).go();

// End of TypeIT //

let menu = document.getElementById('menuBtn');
let openMenu = document.getElementById('menuOpen');
let type = document.getElementById('typeText');
let position = document.getElementById('marker');
let panels = document.getElementById('panel');
menu.addEventListener("click", function () {
    type.classList.toggle("hide");
    position.classList.toggle("hide");
    openMenu.classList.toggle("hide");
    panels.classList.toggle("hide");
})
// Look for .hamburger
var hamburger = document.querySelector(".hamburger");
// On click
hamburger.addEventListener("click", function () {
    // Toggle class "is-active"
    hamburger.classList.toggle("is-active");
    // Do something else, like open/close menu
});
var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 3




})
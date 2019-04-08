/* Map JS Files */

let map;

function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -36.8626662, lng: 174.7253873},
            zoom: 16,
            disableDefaultUI: true,
        	zoomControl: false,
        	zoomControlOptions: {
        	position: google.maps.ControlPosition.RIGHT_CENTER,
       },      
 });
 };



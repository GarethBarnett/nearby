/* Foursquare JS Files */


/* Gareth */

/* Foursquare settings */
const version = '?v=20170901';
const clientid = '&client_id=H2QZGKM3QVJB2PCW1JREIEJJMRBL1QXZOYIYWGRFDABW4E4Y';
const clientSecret = '&client_secret=GYCB1CW24L0HLFKGOFIHCKOLYZQPVI3ZKDLKE5O3QHCTWGI2';
const key = version + clientid + clientSecret;


/* Icons for Venues */
let icons = {
    /* Jason */
    location: './assets/images/location.svg',
    bus: './assets/images/bus1.svg',
    busstop: './assets/images/busstop.svg',
    /* Jason */
    food: './assets/images/restauranticon.png',
    drink: './assets/images/baricon.png',
    hotel: './assets/images/accommodationicon.png',
    landmark: './assets/images/sightsicon.png',
    /* Jules */
    trending: './assets/images/trending.png'
    /* Jules */
};
/* Gareth */


/* Gareth */
/* Foursquare venue categories */
let food = '4d4b7105d754a06374d81259';
let drink = '4bf58dd8d48988d11a941735';
let hotel = '4bf58dd8d48988d1fa931735';
let landmark = '4d4b7104d754a06370d81259';
/* Gareth */


/* Jules */
navigator.geolocation.getCurrentPosition(locationHandler);

/* Finding Users Location & venue endpoints */
function locationHandler(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    latUser1 = position.coords.latitude;
    lngUser1 = position.coords.longitude;
    /* Gareth */
    foodUrl = 'https://api.foursquare.com/v2/venues/explore' + key + '&ll=' + latUser1 + ',' + lngUser1 + ' ' + '&categoryId=' + food + '&limit=5&radius=2000';
    drinkUrl = 'https://api.foursquare.com/v2/venues/explore' + key + '&ll=' + latUser1 + ',' + lngUser1 + ' ' + '&categoryId=' + drink + '&limit=5&radius=2000';
    hotelUrl = 'https://api.foursquare.com/v2/venues/explore' + key + '&ll=' + latUser1 + ',' + lngUser1 + ' ' + '&categoryId=' + hotel + '&limit=5&radius=2000';
    landmarkUrl = 'https://api.foursquare.com/v2/venues/explore' + key + '&ll=' + latUser1 + ',' + lngUser1 + ' ' + '&categoryId=' + landmark + '&limit=5&radius=2000';
    /* Gareth */
    trendingUrl = 'https://api.foursquare.com/v2/venues/explore' + key + '&ll=' + latUser1 + ',' + lngUser1 + ' ' + '&limit=10';
}

let latUser1, lngUser1;
/* Jules */


/* Gareth */
let foodUrl, drinkUrl, hotelUrl, landmarkUrl, trendingUrl;


/* Map JS Files */

let map, marker;
let flagOfIniMap = true;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -36.878901, lng: 174.792339 },
        zoom: 16,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
        },
        styles: mapstyle,

    });
      
    /* Gareth */

    /* Jules */
    var icon = {
        url: "./assets/images/usericon.svg", 
        scaledSize: new google.maps.Size(50, 50) 
    };


    var location = new google.maps.Marker({
        position: { lat: +latUser1, lng: +lngUser1 },
        // position: { lat: -36.878901, lng: 174.792339 },
        map: map,
        icon: icon,
        zIndex: 999,
        animation: google.maps.Animation.DROP
    });
    // var infoWindow = new google.maps.InfoWindow({
    //     content: '<h4 class="testing animated fadeInDown"> Your location here</h4>'
    // });
    // location.addListener('click', function () {
    //     infoWindow.open(map, location);
    // });

    /* Jules */
    setTimeout(() => {
        var location = new google.maps.Marker({
            position: { lat: +latUser1, lng: +lngUser1 },
            map: map,
            icon: icon,
            zIndex: 999,
            animation: google.maps.Animation.DROP
        });
        var infoWindow = new google.maps.InfoWindow({
            content: '<h4 class="testing animated fadeInDown"> Your location here</h4>'
        });
        location.addListener('click', function () {
            infoWindow.open(map, location);
        });
        allAjaxRequest();
        getCentreAfterMapLoad();
    }, 1000);
    /* Jules */
    
} /* End Display Venues on Map */
/* Gareth */

/* Jules */
function getCentreAfterMapLoad(){
        map.setCenter( new google.maps.LatLng(+latUser1, +lngUser1));
}
/* Jules */


/* Gareth */
let placeLocationObj = {
    food: [],
    drink: [],
    hotel: [],
    landmark: [],
    /* Jules */
    trending: []
    /* Jules */
};
/* Gareth */

let allMarkers = [];
/* Jason */
let placeToGo;
let placeToGoDetails;
let userLocation = { lat: latUser1, lng: lngUser1 };
/* Jason */


/* Gareth */
function requestAllLocationByFilter(obj, map, categoryVal) {
    let data = obj.response.groups["0"].items;
    let venues = data.map(function (item) {
        let lat = item.venue.location.lat;
        let lng = item.venue.location.lng;
        let venueName = item.venue.name;
        let placeDetails = [true, Number(lat), Number(lng), venueName.toString(), icons[categoryVal].toString(), item.venue.id];
        placeLocationObj[categoryVal].push(placeDetails);
        let marker = new google.maps.Marker({
            map: map,
            icon: { url: icons[categoryVal], scaledSize: new google.maps.Size(50, 50) },
            position: { lat: lat, lng: lng },
            title: venueName
        });
        marker.venueid = item.venue.id;
        /* Click function on Marker */
        marker.addListener('click', function () {
            var venueUrl = 'https://api.foursquare.com/v2/venues/' + this.venueid + key;
            $.ajax({
                url: venueUrl,
                dataType: 'jsonp',
                success: function (res) {
                    /* Hide the Filter Panel */
                    panel.classList.add('hide');
                    /* Hide the Filter Panel */
                    infoMenuContainer.classList.remove('hide');
                    /* Fill info menu with data */
                    createInfoMenu(res);
                    /* Jules */
                    map.setZoom(18);
                    map.setCenter(marker.getPosition());
                    placeToGo = placeDetails[5];
                    placeToGoDetails = placeDetails;
                    /* Jules */
                }
            });
        });
        allMarkers.push(marker);
    });

}
/* Gareth */

/* Gareth */
let source;

function createInfoMenu(res) {

    /* Handle Bars JS*/

    if (!source) {
        source = document.querySelector('#infoMenuData').innerHTML;
    }
    const template = Handlebars.compile(source);

    const compiledHtml = template(res);

    const infoMenuText = document.getElementsByClassName("infoMenuBody")[0];

    infoMenuText.innerHTML = compiledHtml;

    /* Handle Bars JS End */

}

/* Gareth */



/* Gareth */
var mapstyle = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": "-100"
            },
            {
                "lightness": "57"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "lightness": "1"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#484848"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station.bus",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.bus",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": "0"
            },
            {
                "lightness": "0"
            },
            {
                "gamma": "1.00"
            },
            {
                "weight": "1"
            }
        ]
    },
    {
        "featureType": "transit.station.bus",
        "elementType": "labels.icon",
        "stylers": [
            {
                "saturation": "-100"
            },
            {
                "weight": "1"
            },
            {
                "lightness": "0"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": "1"
            },
            {
                "lightness": "40"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.icon",
        "stylers": [
            {
                "saturation": "-100"
            },
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#d2d2d2"
            },
            {
                "visibility": "on"
            }
        ]
    }
];
/* Gareth */

function allAjaxRequest(){
    /* Gareth */

    /* Ajax Request for Food */
    $.ajax({
        url: foodUrl,
        dataType: 'jsonp',
        type: 'GET',
        // async: false,
        success: function (res) {
            // alert('food ajax successful')
            // console.log(res);
            requestAllLocationByFilter(res, map, 'food');
        }
    });

    /* Ajax Request for Drinks */
    $.ajax({
        url: drinkUrl,
        dataType: 'jsonp',
        type: 'GET',
        success: function (res) {
            // alert('drinks ajax successful')
            // console.log(res);
            requestAllLocationByFilter(res, map, 'drink');
        }
    });

    /* Ajax Request for Hotels */
    $.ajax({
        url: hotelUrl,
        dataType: 'jsonp',
        type: 'GET',
        success: function (res) {
            // alert('hotels ajax successful')
            // console.log(res);
            requestAllLocationByFilter(res, map, 'hotel');
        }
    });


    /* Ajax Request for Landmarks */
    $.ajax({
        url: landmarkUrl,
        dataType: 'jsonp',
        type: 'GET',
        success: function (res) {
            // alert('landmark ajax successful')
            // console.log(res);
            requestAllLocationByFilter(res, map, 'landmark');
        }
    });
    /* Gareth */




    /* Jules */

    /* Ajax Request for Trending */
    
        $.ajax({
            url: trendingUrl,
            dataType: 'jsonp',
            type: 'GET',
            success: function (res) {
                requestAllLocationByFilter(res, map, 'trending');
                for(let i = 0; i < allMarkers.length; i++){
                    if (/trending/.test(allMarkers[i].icon.url)) {
                        allMarkers[i].setMap(null);
                    }
                }
            }
        });
    /* Jules */
}
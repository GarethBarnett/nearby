/* Foursquare JS Files */

/* Foursquare settings */
const version = '?v=20170901';
const clientid = '&client_id=H2QZGKM3QVJB2PCW1JREIEJJMRBL1QXZOYIYWGRFDABW4E4Y';
const clientSecret = '&client_secret=GYCB1CW24L0HLFKGOFIHCKOLYZQPVI3ZKDLKE5O3QHCTWGI2';
const key = version + clientid + clientSecret;

/* Icons for Venues */
let icons = {
    food: './assets/images/restauranticon.svg',
    drink: './assets/images/baricon.svg',
    hotel: './assets/images/accommodationicon.svg',
    landmark: './assets/images/sightsicon.svg',
    trending: './assets/images/trending.svg'
};

/* Foursquare venue categories */
let food = '4d4b7105d754a06374d81259';
let drink = '4bf58dd8d48988d11a941735';
let hotel = '4bf58dd8d48988d1fa931735';
let landmark = '4d4b7104d754a06370d81259';
// let trending = '5ac51dde351e3d4df64064f8';

// $('#marker').click(function () {
//     if (navigator.geolocation)
//         navigator.geolocation.getCurrentPosition(function (position) {
//             console.log(position.coords.latitude);
//             console.log(position.coords.longitude);
//         }); else
//         console.log('geo location is not supported');



// });

navigator.geolocation.getCurrentPosition(locationHandler);

function locationHandler(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    latUser1 = position.coords.latitude;
    lngUser1 = position.coords.longitude;
    console.log(lat);
    console.log(lng);
    foodUrl = 'https://api.foursquare.com/v2/venues/explore' + key + '&ll=' + latUser1 + ',' + lngUser1 + ' ' + '&categoryId=' + food + '&limit=5&radius=2000';
    drinkUrl = 'https://api.foursquare.com/v2/venues/explore' + key + '&ll=' + latUser1 + ',' + lngUser1 + ' ' + '&categoryId=' + drink + '&limit=5&radius=2000';
    hotelUrl = 'https://api.foursquare.com/v2/venues/explore' + key + '&ll=' + latUser1 + ',' + lngUser1 + ' ' + '&categoryId=' + hotel + '&limit=5&radius=2000';
    landmarkUrl = 'https://api.foursquare.com/v2/venues/explore' + key + '&ll=' + latUser1 + ',' + lngUser1 + ' ' + '&categoryId=' + landmark + '&limit=5&radius=2000';
    trendingUrl = 'https://api.foursquare.com/v2/venues/explore' + key + '&ll=' + latUser1 + ',' + lngUser1 + ' ' + '&limit=10';
}
let latUser1, lngUser1;


/* User Location */
// let latUser = latuser1;
// let lngUser = lngUser1;

// var myLatLng = { lat: latUser, lng: lngUser }

let foodUrl, drinkUrl, hotelUrl, landmarkUrl, trendingUrl;
/* Display Venues on Map */




/* Map JS Files */


function initMap() {
    let map, marker;

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: +latUser1, lng: +lngUser1 },
        zoom: 17,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
        },
        styles: mapstyle,

    });

    var icon = {
        url: "./assets/images/zeus.svg", // url
        scaledSize: new google.maps.Size(40, 40), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };


    var location = new google.maps.Marker({
        position: { lat: +latUser1, lng: +lngUser1 }, map: map,
        icon: icon
    });

    var infoWindow = new google.maps.InfoWindow({
        content: '<h4 class="testing animated fadeInDown"> Your location here</h4>'
    });
    location.addListener('click', function () {
        infoWindow.open(map, location);
    });
    //     addMarker({ lat: -36.7642377, lng: 174.7577896 });

    //     function addMarker(coords) {
    //         var test = new google.maps.Marker({
    //             position: coords,
    //             map: map,
    //             icon: icon
    //         });
    //     }
    // }









    /* Ajax Request for Food */
    $.ajax({
        url: foodUrl,
        dataType: 'jsonp',
        success: function (res) {
            requestAllLocationByFilter(res, map, 'food');
        }
    });

    /* Ajax Request for Drinks */
    $.ajax({
        url: drinkUrl,
        dataType: 'jsonp',
        success: function (res) {
            requestAllLocationByFilter(res, map, 'drink');
        }
    });

    /* Ajax Request for Hotels */
    $.ajax({
        url: hotelUrl,
        dataType: 'jsonp',
        success: function (res) {
            requestAllLocationByFilter(res, map, 'hotel');
        }
    });


    /* Ajax Request for Landmarks */
    $.ajax({
        url: landmarkUrl,
        dataType: 'jsonp',
        success: function (res) {
            requestAllLocationByFilter(res, map, 'landmark');
        }
    });
    /* Ajax Request for Trending */
    $.ajax({
        url: trendingUrl,
        dataType: 'jsonp',
        success: function (res) {
            requestAllLocationByFilter(res, map, 'trending');
            // console.log(res)
        }
    });

}; /* End Display Venues on Map */


let placeLocationObj = {
    food: [],
    drink: [],
    hotel: [],
    landmark: [],
    trending: []
}


function requestAllLocationByFilter(obj, map, categoryVal) {
    let data = obj.response.groups["0"].items;
    let venues = data.map(function (item) {
        let lat = item.venue.location.lat;
        let lng = item.venue.location.lng;
        let venueName = item.venue.name;
        placeLocationObj[categoryVal].push([true, Number(lat), Number(lng), venueName.toString(), icons[categoryVal].toString(), item.venue.id]);

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
                    // 3 seconds after the center of the map has changed, pan back to the // marker.
                    map.addListener('center_changed', function () {
                        window.setTimeout(function () {
                            map.panTo(marker.getPosition());
                        }, 3000);
                    });

                    map.setZoom(18);
                    map.setCenter(marker.getPosition());


                }
            });
        });

    });

}




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


    // $('.infoMenuBody').empty();
    // // $('.venueTitle').text(res.response.venue.name);
    // $('.infoMenuBody').append('<p class="title">' + res.response.venue.name + '</p>');
    // if(res.response.venue.description !== undefined){
    //     $('.infoMenuBody').append('<p class="description">' + res.response.venue.description + '</p>');
    // }
    // if(res.response.venue.photos.groups.length>0){
    //     var photoPrefix = res.response.venue.bestPhoto.prefix;
    //     var photoSuffix = res.response.venue.bestPhoto.suffix;
    //     $('<img src=' + photoPrefix + '200x200' + photoSuffix + '>').appendTo('.infoMenuBody');
    // }
    // $('.infoMenuBody').append('<p class="likes"><span class="bold">Likes:</span> ' + res.response.venue.likes.count + '</p>');
    // if(res.response.venue.likes.count > 9) {
    //     $('.likes').css('font-weight','bold');
    // }
    // if(res.response.venue.rating !== undefined){
    //     $('.infoMenuBody').append('<p class="rating"><span class="bold">Rating:</span> ' + res.response.venue.rating + '/10 from ' +  res.response.venue.ratingSignals + ' users.</p>');
    // }
    // if(res.response.venue.contact.phone !== undefined){
    //     $('.infoMenuBody').append('<p class="phone"><span class="bold">Phone:</span> ' + res.response.venue.contact.phone + '</p>');
    // }
    // var directionsUrl = 'https://www.google.com/maps/dir/Current+Location/'+res.response.venue.location.lat+','+res.response.venue.location.lng;
    // $('.infoMenuBody').append('<a href='+directionsUrl+'>directions</a>');
    // $('.infoMenuBody').append('<a href='+ res.response.venue.url+'>Website Link</a>');
    // $('.infoMenuBody').append('<p class="address">' + res.response.venue.location.address + ', ' + res.response.venue.location.city + '</p>');

}


console.log(placeLocationObj)

let foodFilter = document.getElementById('foodFilter');

foodFilter.addEventListener("click", function () {

    // Object.keys(placeLocationObj)[0];

    // placeLocationObj.food.parentNode.removeChild(placeLocationObj);

    // placeLocationObj

    alert("success")

});



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
                "visibility": "on"
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
                "visibility": "on"
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
]


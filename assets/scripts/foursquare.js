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
     landmark: './assets/images/sightsicon.svg'
 };

/* Foursquare venue categories */
let food = '4d4b7105d754a06374d81259';
let drink = '4bf58dd8d48988d11a941735';
let hotel = '4bf58dd8d48988d1fa931735';
let landmark = '4d4b7104d754a06370d81259';


/* User Location */
let latUser = -36.8569444;
let lngUser = 174.7641288;


/* Display Venues on Map */
let foodUrl = 'https://api.foursquare.com/v2/venues/explore' + key + '&ll='+latUser+','+lngUser+' '+'&categoryId='+ food+'&limit=5&radius=200';
let drinkUrl = 'https://api.foursquare.com/v2/venues/explore' + key + '&ll='+latUser+','+lngUser+' '+'&categoryId='+ drink+'&limit=5&radius=200';
let hotelUrl = 'https://api.foursquare.com/v2/venues/explore' + key + '&ll='+latUser+','+lngUser+' '+'&categoryId='+ hotel+'&limit=5&radius=200';
let landmarkUrl = 'https://api.foursquare.com/v2/venues/explore' + key + '&ll='+latUser+','+lngUser+' '+'&categoryId='+ landmark+'&limit=5&radius=200';



/* Map JS Files */

function initMap(){
    let map, marker;

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -36.8569444, lng: 174.7641288},
        zoom: 17,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
        },
        styles: mapstyle,
 });


    /* Ajax Request for Food */
    $.ajax({
        url: foodUrl,
        dataType:'jsonp',
        success:function(res){
            requestAllLocationByFilter(res, map, 'food');
        } 
    }); 

    /* Ajax Request for Drinks */
    $.ajax({
        url: drinkUrl,
        dataType:'jsonp',
        success:function(res){
            requestAllLocationByFilter(res, map, 'drink');
        } 
    }); 

    /* Ajax Request for Hotels */
    $.ajax({
        url: hotelUrl,
        dataType:'jsonp',
        success:function(res){
            requestAllLocationByFilter(res, map, 'hotel');
        } 
    }); 

     
     /* Ajax Request for Landmarks */
    $.ajax({
        url: landmarkUrl,
        dataType:'jsonp',
        success:function(res){
            requestAllLocationByFilter(res, map, 'landmark');
        } 
    }); 

}; // End Display Venues on Map 




function requestAllLocationByFilter(obj, map, categoryVal){
    let data = obj.response.groups["0"].items;
    let venues = data.map(function(item){
        let lat = item.venue.location.lat;
        let lng = item.venue.location.lng;
        let venueName =  item.venue.name;
        let marker = new google.maps.Marker({
            map: map,
            icon: {url: icons[categoryVal], scaledSize: new google.maps.Size(50, 50)},
            position: {lat: lat, lng: lng},
            title: venueName
        });
        
        marker.venueid = item.venue.id;

        /* Click function on Marker */
        marker.addListener('click',function(){
            var venueUrl = 'https://api.foursquare.com/v2/venues/' + this.venueid + key;
            $.ajax({
                url:venueUrl,
                dataType:'jsonp',
                success: function(res){
                    alert('success')
                  
                }
            });
        });
        
    });

}





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


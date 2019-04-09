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
        
    });

}


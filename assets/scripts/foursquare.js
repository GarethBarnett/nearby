/* Foursquare JS Files */

const version = '?v=20170901';
const clientid = '&client_id=H2QZGKM3QVJB2PCW1JREIEJJMRBL1QXZOYIYWGRFDABW4E4Y';
const clientSecret = '&client_secret=GYCB1CW24L0HLFKGOFIHCKOLYZQPVI3ZKDLKE5O3QHCTWGI2';
const key = version + clientid + clientSecret;

let icons = {
     food: './assets/images/restauranticon.svg'
 };

let food = 'food';

let lat = -36.8569444;
let lng = 174.7641288;

// Display Venues on Map 
let foodUrl = 'https://api.foursquare.com/v2/venues/explore' + key + '&ll='+lat+','+lng+' '+'&section='+ food+'&limit=5&radius=500';



function requestAllLocationByFilter(obj, map, categoryVal){
    // console.log(obj.response.groups["0"].items[0])
    var data = obj.response.groups["0"].items;
    var venues = data.map(function(item){
        var lat = item.venue.location.lat;
        var lng = item.venue.location.lng;
        var venueName =  item.venue.name;
        var marker = new google.maps.Marker({
            map: map,
            icon: {url: icons[categoryVal], scaledSize: new google.maps.Size(40, 40)},
            position: {lat: lat, lng: lng},
            title: venueName
        });
        
        marker.venueid = item.venue.id;
        // Click function for each icon
        
    });

}

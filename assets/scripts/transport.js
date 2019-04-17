/* Jason */
/* 'Find Transport' icon click function */
$('#busArrow').on('click',()=>{
    // alert('test')
    for (let i = 0; i < allMarkers.length; i++) {
        if(allMarkers[i].venueid != placeToGo){
            allMarkers[i].setMap(null);
        }
    }
    findBus();
    findBusStop(latUser1, lngUser1, 200);
    $('#infoMenuContainer').addClass('hide');
    $('#busMenuContainer').removeClass('hide'); 
    /* jason add*/
    $('.transportPanels').removeClass('hide');
    /* jason add*/
});

/* 'Back to Map' icon click function */
$('#mapArrow').on('click', ()=>{
    searchAgainOrbackToMap();
});

/* */
$('#searchAgain').on('click', ()=>{
    searchAgainOrbackToMap();
});

/* Jason */
/* Jason */
let shownBusRouteId;
/* Jason */

/* Jules */
/* 'Find Transport' icon click function */
let busMarker, busStopMarker;
let busLocation = {
    lat: 0,
    lng: 0
};
let locations = [];

function presentAllBuese(val) {
    val.forEach((currentValue, index, array) => {
        if ((currentValue[0] <= (latUser + 0.01)) && (currentValue[0] >= (latUser - 0.01))) {
            if ((currentValue[1] <= (lngUser + 0.01)) && (currentValue[1] >= (lngUser - 0.01))) {
                busMarker = new google.maps.Marker({
                    map: map,
                    draggable: false,
                    icon: { url: icons.icon, scaledSize: new google.maps.Size(30, 30) },
                    position: { lat: currentValue[0], lng: currentValue[1] }
                });
            }
        }
        return;
    });

}
/* Jules */

/* Jason */
/* findBus function is using Auckland Transport API to find the nearby buses according to */
function findBus() {
    var params = {};
    $.ajax({
        url: "https://api.at.govt.nz/v2/public/realtime/vehiclelocations?" + $.param(params),
        beforeSend: function (xhrObj) {
            /* Request headers */
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "0011a2284d7a4d8caf839d6bb94428e1");
        },
        type: "GET",
        /* Request body */
        data: "{body}",
    })
        .done(function (data) {
            if(data.response.entity.length <= 0){
                confirm('No buses nearby, please try another venue!');
                if(busStopMarker){
                    busStopMarker.setMap(null);
                }
                $('#infoMenuContainer').addClass('hide');
                $('#busMenuContainer').addClass('hide'); 
                $('.transportPanels').addClass('hide');
                $('#panel').removeClass('hide')
                searchAgainOrbackToMap();
            }else{
                let returnedData = data.response.entity;
                for (let i = 0; i < returnedData.length; i++) {
                    if ((returnedData[i].vehicle.position.latitude <= (latUser1 + 0.005)) && (returnedData[i].vehicle.position.latitude >= (latUser1 - 0.005))) {
                        if ((returnedData[i].vehicle.position.longitude <= (lngUser1 + 0.005)) && (returnedData[i].vehicle.position.longitude >= (lngUser1 - 0.005))) {
                            busMarker = new google.maps.Marker({
                                map: map,
                                draggable: false,
                                icon: { url: icons.bus, scaledSize: new google.maps.Size(50, 50) },
                                position: { lat: returnedData[i].vehicle.position.latitude, lng: returnedData[i].vehicle.position.longitude }
                            });
                            busLocation.lat = returnedData[i].vehicle.position.latitude;
                            busLocation.lng = returnedData[i].vehicle.position.longitude;
                            locations[0] = [latUser1, lngUser1];
                            locations[1] = [placeToGoDetails[1], placeToGoDetails[2]];
                            locations[2] = [busLocation.lat, busLocation.lng];
                            getCentrePoint(locations);
                            shownBusRouteId = returnedData[i].vehicle.trip.route_id;
                            getTravelInformation();
                            return;
                        }
                    }
                }
            }
        })
        .fail(function () {
            alert("error");
        });
}
/* Jason */

/* Jason */
/* findBusStop is trying to find the nearest bus stop according to user current location by AT API */
let nearbyStopId;
function findBusStop(lat, lng, distance) {
    $.ajax({
        url: "https://api.at.govt.nz/v2/gtfs/stops/geosearch?lat=" + lat + "&lng=" + lng + "&distance=" + distance,
        beforeSend: function (xhrObj) {
            /* Request headers */
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "0011a2284d7a4d8caf839d6bb94428e1");
        },
        type: "GET",
        /* Request body */
        data: "{body}",
    })
        .done(function (data) {
            busStopMarker = new google.maps.Marker({
                map: map,
                draggable: false,
                icon: { url: icons.busstop, scaledSize: new google.maps.Size(60, 60) },
                position: { lat: data.response[0].stop_lat, lng: data.response[0].stop_lon }
            });
            nearbyStopId = data.response[0].stop_code;
        })
        .fail(function () {
            alert("error");
        });
}
/* Jason */

/* Jason */
/* Find out the centre point according to user location, bus location, and destination */
function getCentrePoint(locations){
    var bound = new google.maps.LatLngBounds();
    for (i = 0; i < locations.length; i++) {
        bound.extend( new google.maps.LatLng(locations[i][0], locations[i][1]) );
    }
    bound.getCenter();
    map.fitBounds(bound);
}

/* Jason */

/* Jason */

function getTravelInformation(){
    var params = {};
  
    $.ajax({
        url: "https://api.at.govt.nz/v2/gtfs/routes/routeId/"+ shownBusRouteId + "?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","0011a2284d7a4d8caf839d6bb94428e1");
        },
        type: "GET",
        // Request body
        data: "{body}",
    })
    .done(function(data) {
        $('#busVenueTitle').text(placeToGoDetails[3]);
        $('#busIdUpdate').text(data.response[0].route_short_name);
        $('#stopIdUpdate').text(nearbyStopId);
        $('#busStopId').text('STOP ' +nearbyStopId);
    })
    .fail(function() {
        console.log("getting route detail error");
    });
}

function searchAgainOrbackToMap(){
    /* Remove Bus icon */
    if(busMarker){
        busMarker.setMap(null);
    }
    /* Remove Bus Stop icon */ 
    if(busStopMarker){
        busStopMarker.setMap(null);
    }
    /* Show all markers without trending */
    for (let i = 0; i < allMarkers.length; i++) {
        if (!re.test(allMarkers[i].icon.url)) {
            allMarkers[i].setMap(map);

        } else {
            allMarkers[i].setMap(null);
        }
    }
    /* Use user location as the centre of map  */
    /* This function comes from foursquare.js */
    getCentreAfterMapLoad();
    /* Consistent map zoom level as first loading status */
    map.setZoom(16);
}
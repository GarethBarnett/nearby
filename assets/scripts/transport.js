/* Jason */
/* 'Find Transport' icon click function */
$('#busArrow').on('click',()=>{
    for (let i = 0; i < allMarkers.length; i++) {
        if(!(allMarkers[i].venueid == placeToGo)){
            allMarkers[i].setMap(null);
        }
    }
    findBusStop(latUser1, lngUser1, 100);
    findBus();
    $('#infoMenuContainer').addClass('hide');
    $('#busMenuContainer').removeClass('hide');
});

/* 'Back to Map' icon click function */
$('#mapArrow').on('click', ()=>{
    /* Show all icons */ 
    for (let i = 0; i < allMarkers.length; i++) {
        allMarkers[i].setMap(map);
    }
    /* Remove Bus icon */
    if(busMarker){
        busMarker.setMap(null);
    }
    /* Remove Bus Stop icon */ 
    if(busStopMarker){
        busStopMarker.setMap(null);
    }
});
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


/* user current location */
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
            console.log(data);
            let returnedData = data.response.entity;
            let pData = data.response.entity[0].vehicle.position;
            positionX = pData.latitude;
            positionY = pData.longitude;
            for (let i = 0; i < returnedData.length; i++) {
                if ((returnedData[i].vehicle.position.latitude <= (latUser1 + 0.005)) && (returnedData[i].vehicle.position.latitude >= (latUser1 - 0.005))) {
                    if ((returnedData[i].vehicle.position.longitude <= (lngUser1 + 0.005)) && (returnedData[i].vehicle.position.longitude >= (lngUser1 - 0.005))) {
                        busMarker = new google.maps.Marker({
                            map: map,
                            draggable: false,
                            icon: { url: icons.bus, scaledSize: new google.maps.Size(30, 30) },
                            position: { lat: returnedData[i].vehicle.position.latitude, lng: returnedData[i].vehicle.position.longitude }
                        });
                        busLocation.lat = returnedData[i].vehicle.position.latitude;
                        busLocation.lng = returnedData[i].vehicle.position.longitude;
                        locations[0] = [latUser1, lngUser1];
                        locations[1] = [placeToGoDetails[1], placeToGoDetails[2]];
                        locations[2] = [busLocation.lat, busLocation.lng];

                        return;
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
                icon: { url: icons.busstop, scaledSize: new google.maps.Size(40, 40) },
                position: { lat: data.response[0].stop_lat, lng: data.response[0].stop_lon }
            });
        })
        .fail(function () {
            alert("error");
        });
}
/* Jason */

/* 'Find Transport' icon click function */
$('#busArrow').on('click',()=>{
    for (let i = 0; i < allMarkers.length; i++) {
        if(!(allMarkers[i].venueid == placeToGo)){
            allMarkers[i].setMap(null);
        }
    }
    findBusStop(latUser, lngUser, 100);
    findBus();
    // console.log(allMarkers.length)
    // console.log(latUser, lngUser)
})

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
})



let busMarker, busStopMarker;

function presentAllBuese(val){
    val.forEach((currentValue, index, array)=>{
        if((currentValue[0] <= (latUser+ 0.01)) && (currentValue[0] >= (latUser - 0.01))){
            if((currentValue[1] <= (lngUser + 0.01)) && (currentValue[1] >= (lngUser - 0.01))){
                busMarker = new google.maps.Marker({
                    map: map,
                    draggable: false,
                    icon: {url: icons.icon, scaledSize: new google.maps.Size(30, 30)},
                    position: {lat: currentValue[0], lng: currentValue[1]}
                });
            }
        }
        return;
    })  
    
}

function findBus() {
    var params = {
        // Request parameters
        // "callback": "{string}",
        // "tripid": "{string}",
        // "vehicleid": "5870"
    };
    $.ajax({
        url: "https://api.at.govt.nz/v2/public/realtime/vehiclelocations?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","0011a2284d7a4d8caf839d6bb94428e1");
        },
        type: "GET",
        // Request body
        data: "{body}",
    })
    .done(function(data) {
        console.log(data)
        // let returnedData = data.response.entity;
        let returnedData = data.response.entity;
            let pData = data.response.entity[0].vehicle.position;
            positionX = pData.latitude;
            positionY = pData.longitude;
            // returnedData.vehicle.position.latitude
            // let positionArray = [];
            // for(let i = 0; i < returnedData.length; i++){
            //     positionArray[i] = [returnedData[i].vehicle.position.latitude, returnedData[i].vehicle.position.longitude];
            // }
            for(let i = 0; i < returnedData.length; i++){
                if((returnedData[i].vehicle.position.latitude <= (latUser+ 0.005)) && (returnedData[i].vehicle.position.latitude >= (latUser - 0.005))){
                    if((returnedData[i].vehicle.position.longitude <= (lngUser + 0.005)) && (returnedData[i].vehicle.position.longitude >= (lngUser - 0.005))){
                        busMarker = new google.maps.Marker({
                            map: map,
                            draggable: false,
                            // animation: google.maps.Animation.DROP,
                            icon: {url: icons.bus, scaledSize: new google.maps.Size(30, 30)},
                            position: {lat: returnedData[i].vehicle.position.latitude, lng: returnedData[i].vehicle.position.longitude}
                        });
                        // marker.addListener('click', toggleBounce);
                        // markers.push(marker);
                        return;
                    }
                }
                
            }
            
            console.log(returnedData)
            // console.log(positionArray);
            // positionArray.forEach((currentValue, index, array)=>{
            //     if((currentValue[0] <= (latUser+ 0.001)) && (currentValue[0] >= (latUser - 0.001))){
            //         if((currentValue[1] <= (lngUser + 0.001)) && (currentValue[1] >= (lngUser - 0.001))){
            //             let marker = new google.maps.Marker({
            //                 map: map,
            //                 draggable: false,
            //                 // animation: google.maps.Animation.DROP,
            //                 icon: {url: icons.bus, scaledSize: new google.maps.Size(40, 40)},
            //                 position: {lat: currentValue[0], lng: currentValue[1]}
            //             });
            //             // marker.addListener('click', toggleBounce);
            //             // markers.push(marker);
            //         }
            //     }
            //     // break;
            // })
        // alert('successful')
    })
    .fail(function() {
        alert("error");
    });
}

function findBusStop(lat,lng, distance){
    $.ajax({
        url: "https://api.at.govt.nz/v2/gtfs/stops/geosearch?lat=" + lat + "&lng=" + lng + "&distance=" + distance,
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","0011a2284d7a4d8caf839d6bb94428e1");
        },
        type: "GET",
        // Request body
        data: "{body}",
    })
    .done(function(data) {
        busStopMarker = new google.maps.Marker({
            map: map,
            draggable: false,
            // animation: google.maps.Animation.DROP,
            icon: {url: icons.busstop, scaledSize: new google.maps.Size(40, 40)},
            position: {lat: data.response[0].stop_lat, lng: data.response[0].stop_lon}
        });
        // console.log(data)
        // console.log(data.response[0].stop_lat)
    })
    .fail(function() {
        alert("error");
    });
}
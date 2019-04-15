/* Jason */
/* Functions for all filter icon - start */
let patt;
let flags = {
    'restaurant': false,
    'sight': false,
    'bar': false,
    'accommodation': false
}
$('#foodFilter').on('click', () => {
    patt = /restaurant/i;
    reclickFilgerToShowOrHideAllMarkers('restaurant');
})

$('#landmarkFilter').on('click', () => {
    patt = /sight/i;
    reclickFilgerToShowOrHideAllMarkers('sight');
})

$('#drinkFilter').on('click', () => {
    patt = /bar/i;
    reclickFilgerToShowOrHideAllMarkers('bar');
})

$('#hotelFilter').on('click', () => {
    patt = /accommodation/i;
    reclickFilgerToShowOrHideAllMarkers('accommodation');
})
$('#trending').on('click', () => {
    patt = /trending/i;
    reclickFilgerToShowOrHideAllMarkers('trending');
})
$('#marker').on('click', () => {
    patt = /trending/i;
    reclickFilgerToShowOrHideAllMarkers('trending');
})
/* Functions for all filter icon - end */

/* Function to filter markers by different category */
/* Argument for this function could be: restaurant, bar, accommodation, sight, and trending */
function filterMarkers(category) {
    for (let i = 0; i < allMarkers.length; i++) {
        if (patt.test(allMarkers[i].icon.url)) {
            allMarkers[i].setMap(map)
        } else {
            allMarkers[i].setMap(null)
        }
    }
}

function reclickFilgerToShowOrHideAllMarkers(val) {
    if (!flags[val]) {
        filterMarkers(val);
        flags.restaurant = false;
        flags.sight = false;
        flags.bar = false;
        flags.accommodation = false;
        flags.trending = false;
        flags[val] = true;
    } else {
        for (let i = 0; i < allMarkers.length; i++) {
            allMarkers[i].setMap(map)
        }
        flags.restaurant = false;
        flags.sight = false;
        flags.bar = false;
        flags.accommodation = false;
        flags.trending = false;
    }
}
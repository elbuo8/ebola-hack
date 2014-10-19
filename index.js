Number.prototype.toRad = function() {
    return this * Math.PI / 180;
}
var nearestThreat;
var coords;

var outbreaks = [
    {
        lat: 33.79245,
        lon: -84.321305,
        place: 'Emory University Hospital',
    },
    {
        lat: 41.256035,
        lon: -95.976186,
        place: 'The Nebraska Medical Center'
    }
];

var calculateDistance = function(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

var checkDistance =  function () {
    var returnObj = {distance: 1000000, place: ''}
    for (var i = 0; i < outbreaks.length; i++) {
        var distance = calculateDistance(outbreaks[i].lat, outbreaks[i].lon, coords.latitude, coords.longitude);
        if (returnObj.distance > distance) {
            returnObj.distance = distance;
            returnObj.place = outbreaks[i].place;
        }
    }

    return returnObj
}

navigator.geolocation.getCurrentPosition(function (geoPos) {
    coords = geoPos.coords;
    nearestThreat = checkDistance();
    nearestThreat.distance /= 1.60934;
    document.getElementById('myResults').innerHTML = nearestThreat.distance;
    document.getElementById('myResults2').innerHTML = nearestThreat.place;
    console.log(nearestThreat);
});

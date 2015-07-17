var APP = APP || {};
(function (APP) { 
    var url = 'http://oregonstateparks.org/data/index.cfm';
    var data = {
        endpoint: '/parks',
        parkName: ""
    };
    var parkArray = []; //create an object per park, properties for name, lat, long
    var parkNameArray = []; //create an array that has a list of park names, for typeahead
    var featureList = ["Ampitheater", "Beach Access", "Bike Path", "Boat Ramp", "Cabin", "Camping", "Day-Use Fee", "Deluxe Cabin", "Deluxe Yurt", "Disc Golf", "Dump Station", "Exhibit Information", "Fishing", "Hiker Biker", "Hiking Trails", "Horse Trails", "Kayaking", "Marina", "Pet Friendly", "Picknicking", "Pit Toilets", "Playground", "Potable Water", "Reservable", "Restrooms Flush", "Hot Shower", "Swimming", "Tepee", "Vault Toilets", "Viewpoint", "Wildlife", "Windsurfing", "Open Year Round", "Yurt"];
    function mapParkCollection(data) {
        data.forEach(function(feature) {
            var parkObj = {
                "name": feature.park_name,
                "latitude": feature.park_latitude,
                "longitude": feature.park_longitude,
                "parkFlickrCall": 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a3a47a8bbef03987ba49563f5120127e&tags=park&lat=' + feature.park_latitude + '&lon=' + feature.park_longitude + '&radius=20&per_page=20&format=json'
            };
            parkArray.push(parkObj);
            console.log('push park object');
            parkNameArray.push(feature.park_name);
            parkCollection.add(parkObj);
        });
    }
    //google map
    function createMap() {
        var mapCanvas = document.getElementById('map_canvas');
        var Bend = new google.maps.LatLng(44.058173, -121.31531);
        var mapOptions = {
            center: Bend,
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        var map = new google.maps.Map(mapCanvas, mapOptions);
        for (var i = 0; i < parkArray.length; i++) {
            var marker_position = new google.maps.LatLng(parkArray[i].latitude, parkArray[i].longitude);
            var info = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                position: marker_position,
                map: map,
                title: parkArray[i].name,
                animation: google.maps.Animation.DROP,
            });
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    info.setContent("<div><p>" + parkArray[i].name + "</p></div>");
                    info.open(map, marker);
                };
            })(marker, i));
        }
    }

    (function go() {
        $.ajax(url, {
            data: data
        }).then(function(data, status, xhr) {
            mapParkCollection(data);
        }).then(function() {
            createMap();
            google.maps.event.addDomListener(window, 'load', initialize);
        }).then(function() {
            var substringMatcher = function(strs) {
                return function findMatches(q, cb) {
                    var matches, substringRegex;
                    // an array that will be populated with substring matches
                    matches = [];
                    // regex used to determine if a string contains the substring `q`
                    substrRegex = new RegExp(q, 'i');
                    // iterate through the pool of strings and for any string that
                    // contains the substring `q`, add it to the `matches` array
                    $.each(strs, function(i, str) {
                        if (substrRegex.test(str)) {
                            matches.push(str);
                        }
                    });
                    cb(matches);
                };
            };
            $(function() {
                $('#parkList .typeahead').typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                }, 
                {
                    name: 'parkNameArray',
                    source: substringMatcher(parkNameArray)
                });
            });
            $(function() {
                $('#featureList .typeahead').typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                }, 
                {
                    name: 'featureList',
                    source: substringMatcher(featureList)
                });
            });
        });
    })();
    // APP.LatLong = { 
    // };

})(APP);

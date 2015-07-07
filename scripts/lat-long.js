var url = 'http://oregonstateparks.org/data/index.cfm';

var parkData;
var data = {
  endpoint: '/parks',
  parkName: ""
};
var parkArray = [];

function latLong () {
  parkData.forEach(function(feature) {
    var parkObj = {"name": feature.park_name, "latitude": feature.park_latitude, "longitude": feature.park_longitude};
    parkArray.push(parkObj);
  }); 
};

// console.log(parkArray[1]);

//google map
function initialize(){
	var mapCanvas = document.getElementById('map_canvas');
	var Bend = new google.maps.LatLng(44.058173, -121.31531);
	var mapOptions = {
		center : Bend,
		zoom : 7,
		mapTypeId : google.maps.MapTypeId.TERRAIN
	}
	var map = new google.maps.Map(mapCanvas, mapOptions);
	for(var i = 0; i<parkArray.length; i++){
		var marker_position = new google.maps.LatLng(parkArray[i].latitude, parkArray[i].longitude);

		var info = new google.maps.InfoWindow;

		var marker = new google.maps.Marker({
			position: marker_position,
			map: map,
			title: parkArray[i].name,
			animation: google.maps.Animation.DROP,
		});

		google.maps.event.addListener(marker, 'click', (function(marker, i){
			return function(){
				info.setContent(parkArray[i].name);
				info.open(map, marker);
			}
		})(marker,i));
	}
}

function go() {
  $.ajax(url, {data: data})
  .then(function(data, status, xhr) {
    // console.log("data");
    // console.log(data);
    parkData = data;
    latLong();
  }).then(function(){
  	initialize();
  	google.maps.event.addDomListener(window, 'load', initialize);
  });
};

go();

var url = 'http://oregonstateparks.org/data/index.cfm';

var parkData;
var data = {
  endpoint: '/parks',
  parkName: ""
};
var parkArray = []; //create an object per park, properties for name, lat, long
var parkNameArray = []; //create an array that has a list of park names, for typeahead

function latLong () {
  parkData.forEach(function(feature) {
    var parkObj = {"name": feature.park_name, "latitude": feature.park_latitude, "longitude": feature.park_longitude};
    parkArray.push(parkObj);
    parkNameArray.push(feature.park_name);
  }); 
};

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
				info.setContent("<div><p>" + parkArray[i].name + "</p></div>");
				info.open(map, marker);
			}
		})(marker,i));
	}
}

// var substringMatcher = function(strs) {
//   return function findMatches(q, cb) {
//     var matches, substringRegex;
 
//     // an array that will be populated with substring matches
//     matches = [];
 
//     // regex used to determine if a string contains the substring `q`
//     substrRegex = new RegExp(q, 'i');
 
//     // iterate through the pool of strings and for any string that
//     // contains the substring `q`, add it to the `matches` array
//     $.each(strs, function(i, str) {
//       if (substrRegex.test(str)) {
//         matches.push(str);
//       }
//     });
 
//     cb(matches);
//   };
// };

function go() {
  $.ajax(url, {data: data})
  .then(function(data, status, xhr) {
    // console.log(parkArray + "2");
    parkData = data;
    latLong();
    // console.log(parkArray + "3");
  }).then(function(){
  	initialize();
  	google.maps.event.addDomListener(window, 'load', initialize);
  }).then(function(){
		// var substringMatcher = function(strs){
		// 	return function findMatches(q, cb){
		// 		var matches, substringRegex;
		// 		matches = [];
		// 		substrRegex = new RegExp(q, 'i');
		// 		$.each(strs, function(i, str){
		// 			if(substrRegex.test(str)){
		// 				matches.push(str);
		// 			}
		// 		});
		// 		cb(matches);
		// 	};
		// };
		// //this function will need to run after the map has been loaded
		// //parkNameArray
		// $(function(){
		// 	$('#the-basics .typeahead').typeahead({
		// 		hint: true,
		// 		highlight: true,
		// 		minLength: 1
		// 	},
		// 	{
		// 		name: 'parkNameArray',
		// 		source: substringMatcher(parkNameArray)
		// 	});
		// });
	});
};


// var substringMatcher = function(strs){
// 	return function findMatches(q, cb){
// 		var matches, substringRegex;
// 		matches = [];
// 		substrRegex = new RegExp(q, 'i');
// 		$.each(strs, function(i, str){
// 			if(substrRegex.test(str)){
// 				matches.push(str);
// 			}
// 		});
// 		cb(matches);
// 	};
// };
// //this function will need to run after the map has been loaded
// //parkNameArray
// $(function(){
// 	$('#the-basics .typeahead').typeahead({
// 		hint: true,
// 		highlight: true,
// 		minLength: 1
// 	},
// 	{
// 		name: 'parkNameArray',
// 		source: substringMatcher(parkNameArray)
// 	});
// });

go();

// var substringMatcher = function(strs) {
//   return function findMatches(q, cb) {
//     var matches, substringRegex;
 
//     // an array that will be populated with substring matches
//     matches = [];
 
//     // regex used to determine if a string contains the substring `q`
//     substrRegex = new RegExp(q, 'i');
 
//     // iterate through the pool of strings and for any string that
//     // contains the substring `q`, add it to the `matches` array
//     $.each(strs, function(i, str) {
//       if (substrRegex.test(str)) {
//         matches.push(str);
//       }
//     });
 
//     cb(matches);
//   };
// };
 
// var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
//   'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
//   'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
//   'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
//   'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
//   'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
//   'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
//   'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
//   'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
// ];

// $(function(){
//   $('#the-basics .typeahead').typeahead({
//     hint: true,
//     highlight: true,
//     minLength: 1
//   },
//   {
//     name: 'states',
//     source: substringMatcher(states)
//   });
// });
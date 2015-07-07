function initialize(){
	var mapCanvas = document.getElementById('map_canvas'); //map will be placed in the div with id="map_canvas"
	var Bend = new google.maps.LatLng(44.058173, -121.31531);
	//to find lat/lng of locations: http://www.latlong.net/

	var mapOptions = {
		center : Bend, //this centers the map on Bend, OR
		zoom : 6, //range 0 - 22, 22 is the closest zoomed in, 6 will show all of oregon
		mapTypeId : google.maps.MapTypeId.TERRAIN //additional options:ROADMAP, SATELLITE, HYBRID
	}
	var map = new google.maps.Map(mapCanvas, mapOptions);

	//sample code to create new markers with info windows
	var bend_content = "<div><h1>Bend, OR</h1></div>";
	var infowindow = new google.maps.InfoWindow({
		content: bend_content
	});
	var Bend_marker = new google.maps.Marker({
		position: Bend,
		map: map,
		title: 'Bend',
		animation: google.maps.Animation.DROP,
	});
	// marker.setMap(map); additional method to set the marker on map
	google.maps.event.addListener(Bend_marker, 'click', function(){
		infowindow.open(map, Bend_marker);
	})
	var agate_Beach_State_Recreation_Site = new google.maps.LatLng(44.659645, -124.056381);
	var agate_info = new google.maps.InfoWindow({
		content: "<div><p><a href='http:www.oregonstateparks.org/index.cfm?do=parkPage.dsp_parkPage&parkId=152'>Agate Beach State Recreation Site</a><p></div>"
	});
	var agate_marker = new google.maps.Marker({
		position: agate_Beach_State_Recreation_Site,
		map: map,
		title: 'Agate Beach State Recreation Site',
		animation: google.maps.Animation.DROP,
	});
	google.maps.event.addListener(agate_marker, 'click', function(){
		agate_info.open(map, agate_marker);
	})
	next step: create a function that loops through all of the oregon state parks and creates a marker with an info window
function initialize(){
	var mapCanvas = document.getElementById('map_canvas');
	var Bend = new google.maps.LatLng(44.058173, -121.31531);
	var mapOptions = {
		center : Bend,
		zoom : 6,
		mapTypeId : google.maps.MapTypeId.TERRAIN
	}
	var map = new google.maps.Map(mapCanvas, mapOptions);
	for(var i = 0; i<parkArray.length; i++){
		var marker_position = new google.maps.LatLng(parkArray[i].latitude, parkArray[i].longitude);
		var info = new google.maps.InfoWindow({
			content: "<div><p>" + parkArray[i].name + "<p></div>"
		});
		var marker = new google.maps.Marker({
			position: marker_position,
			map: map,
			title: parkArray[i].name,
			animation: google.maps.Animation.DROP,
		});
		google.maps.event.addListener(marker, 'click', function(){
			info.open(map, marker);
		});
	}
}
google.maps.event.addDomListener(window, 'load', initialize); //loads the map on the page once the html is loaded


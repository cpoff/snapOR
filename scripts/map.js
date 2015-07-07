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
		draggable: true,
		animation: google.maps.Animation.DROP,
	});
	// marker.setMap(map); additional method to set the marker on map
	google.maps.event.addDomListener(Bend_marker, 'click', function(){
		infowindow.open(map, Bend_marker);
	})
}

google.maps.event.addDomListener(window, 'load', initialize); //loads the map on the page once the html is loaded
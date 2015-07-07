function initialize(){
	var mapCanvas = document.getElementById('map_canvas'); //map will be placed in the div with id="map_canvas"
	var mapOptions = {
		center : new google.maps.LatLng(44, -121), //this centers the map on Bend, OR
		zoom : 6, //range 0 - 22, 22 is the closest zoomed in, 6 will show all of oregon
		mapTypeId : google.maps.MapTypeId.TERRAIN //additional options:ROADMAP, SATELLITE, HYBRID
	}
	var map = new google.maps.Map(mapCanvas, mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize); //loads the map on the page once the html is loaded
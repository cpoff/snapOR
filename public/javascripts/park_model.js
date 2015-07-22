_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g
};

// snapOR homepage
var MasterView = Backbone.View.extend({
	render: function() {
		this.$el.html("<div>" + "Map API response goes here" + "</div>");
	}
});

var ParkModel = Backbone.Model.extend({
	// urlRoot: '/parkdetail',
	urlRoot: '/',
	defaults: {
		'park_name': 'blah',
		'park_latitude': '0',
		'park_longitude': '0',
		'parkFlickrCall': 'http://',
	},
	initialize: function() {
		this.fetch();
	} 
});

var ParkView = Backbone.View.extend({
	url: '/parkdetail',
	render: function() {
		var template = _.template('<h1>{{parkName}}</h1><div>{{FlickrInfo}}</div>');
		this.$el.html(template({
			parkName: 'park_name',
			FlickrInfo: 'flickr_data'
		}));
	},
	// viewData : function(data){
	// 	$.each(data.items)
	// }
	// fireApi: function() {
	// 	var flickrUrl = this.model.get('parkFlickrCall');
	// 		$.getJSON(flickrUrl);
	// 		console.log('test');
	// },
	events: {
		'load info.setContent' : 'fireApi'
	}
});
var flickrUrl;
var MapView = Backbone.View.extend({
	el: '#map_canvas',
	render: function(){
		//creates map on the page
		var mapCanvas = document.getElementById('map_canvas');
		var Bend = new google.maps.LatLng(44.058173, -121.31531);
		var mapOptions = {
			center: Bend,
			zoom: 7,
			mapTypeId: google.maps.MapTypeId.TERRAIN
		};
		var map = new google.maps.Map(mapCanvas, mapOptions);
		//loop to create markers for all the state parks
		for (var i = 0; i < parkCollection.length; i++) { 
			var marker_position = new google.maps.LatLng(parkCollection.models[i].attributes.latitude, parkCollection.models[i].attributes.longitude);
			var info = new google.maps.InfoWindow();
			var marker = new google.maps.Marker({
				position: marker_position,
				map: map,
				title: parkCollection.models[i].attributes.name,
				animation: google.maps.Animation.DROP,
			});
			google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
					// info.setContent("<div><p>" + parkCollection.models[i].attributes.name + "</p></div>");
					info.setContent("<p>" + parkCollection.models[i].attributes.name + "<p><button id='pictures'>Search</button>");
					// this.model.fireApi();
					// info.setContent("<div class='markerView'></div>");
					info.open(map, marker);
					// function fireFlickrAPI(i, callback){
					// 	var flickrURL = parkCollection.models[i].attributes.parkFlickrCall;
					// 	$.getJSON(flickrURL, callback);
					// }
					// fireFlickrAPI(i, function(data){
					// 	$.each(data.items, function(j, item){
					// 		$("<img>").attr("src", item.media.m).appendTo('body');
					// 	});
					// });
					(function(){
						flickrURL = parkCollection.models[i].attributes.parkFlickrCall;
						console.log(flickrURL);
						data = $.getJSON(flickrURL).done(function(data){
							console.log(data);
						});
					})();
				};
			})(marker, i));
		}
	}
});

	
var ParkCollection = Backbone.Collection.extend({
	model: ParkModel,
	//  url : "/parkdetail", commented out until we create a route in index.js, which may be unnecessary to keep this as a spa
	url: '/',
	initialize: function() {
		this.fetch();
	}
});


var parkModel = new ParkModel();

var parkView = new ParkView({model: parkModel});
parkView.render();
$("#parkdiv").append(parkView.$el);

var parkCollection = new Backbone.Collection({model: ParkModel});

var mapView = new MapView({model: parkModel});
$("#map_canvas").append(mapView.$el);


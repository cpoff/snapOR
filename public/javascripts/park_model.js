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
		url: '/',
		render: function() {
				var template = _.template('<h1>{{parkName}}</h1><div id="flickerPictures">{{FlickrInfo}}</div>');
				var parkName = this.model.get("name");
				this.$el.html(template({
						parkName: 'park_name',
						// parkName: parkName 
						FlickrInfo: 'flickr_data'
				}));
		},
});

var MarkerView = Backbone.View.extend({
		el: '#markerview',
		render: function() {
				var template = _.template('<h1>{{parkName}}</h1><div>{{FlickrInfo}}</div>');
				this.$el.html(template({
						parkName: 'park_name',
						FlickrInfo: 'flickr_data'
				}));
		},
		initialize: function() {
			var self = this;
				//loop to create markers for all the state parks
			var marker_position = new google.maps.LatLng(self.model.get('latitude'), self.model.get('longitude'));
			var info = new google.maps.InfoWindow();
			var marker = new google.maps.Marker({
				position: marker_position,
				map: theMap.map,
				title: self.model.attributes.name,
				animation: google.maps.Animation.DROP,
			});
			google.maps.event.addListener(marker, 'click', (function(marker) {
				return function() {
					var name = self.model.get("name");
					info.setContent("<div><p>"+ name + "</p><button id='showPictures'>Search</button></div>");
					info.open(theMap.map, marker);
				};
			})(marker));
		}
});

var markerArray = [];
var theMap = {};

var MapView = Backbone.View.extend({
		el: '#map_canvas',
		render: function() {
				//creates map on the page
				var mapCanvas = document.getElementById('map_canvas');
				var Bend = new google.maps.LatLng(44.058173, -121.31531);
				var mapOptions = {
						center: Bend,
						zoom: 7,
						mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				theMap.map = new google.maps.Map(mapCanvas, mapOptions);
				//builds marker views as map is generated
				this.collection.each(function(park) {
						var markerView = new MarkerView({
								model: park,
								map: theMap.map,
						});
						markerView.render();
						//            markerView.map = map;
						markerArray.push(markerView);
				});
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

var parkView = new ParkView({
		model: parkModel
});

parkView.render();
$("#parkdiv").append(parkView.$el);

//$("#markerdiv").append(markerView.$el);

var parkCollection = new Backbone.Collection({
		model: ParkModel
});

var mapView = new MapView({
		model: parkModel,
		collection: parkCollection
});

$("#map_canvas").append(mapView.$el);
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

var SearchParkView = Backbone.View.extend({
	url: '/',
	el: '#parks',
	render: function(){
		var template = _.template('<h2 id="modalTitle">Explore Parks</h2><a class="close-reveal-modal aria-label="Close">&times;</a><div id="parkList"><input id="parkName" class="typeahead" type="text" name="Enter park name:" style="font-family: \'Robot Slab\'" placeholder="Ex: \'cape kiwanda\', \'silver falls state park\'"><br><input id="searchParks" class="submit" value="Explore">');
		this.$el.html(template());
	},
	searchParks: function(){
		console.log('test');
			// var parkName = $("#parkName").val();
			// console.log(parkName);
			//compare each park name in parkCollection.models.attributes.name
				//if parkName === parkCollection.models.attributes.name
					//render flicker data
	},
	events: { 
			// "click #showPictures": //fire flicker api, render pictures on page,
			'click #searchParks': 'searchParks'//fire flicker api, render parkView
			//indended outcome $("#searchParks").click(function(){console.log($('#parkName').val());});
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
		/*function:
			store all pictures of a park into model
			this.render();render this view onto page
			*/

		searchParks: function(){
			console.log('test');
			// var parkName = $("#parkName").val();
			// console.log(parkName);
			//compare each park name in parkCollection.models.attributes.name
				//if parkName === parkCollection.models.attributes.name
					//render flicker data
		},
		events: { 
			// "click #showPictures": //fire flicker api, render pictures on page,
			'click #searchParks': 'searchParks'//fire flicker api, render parkView
			//indended outcome $("#searchParks").click(function(){console.log($('#parkName').val());});
		}

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
					info.setContent("<div><p>"+ self.model.attributes.name + "</p><button id='showPictures'>Search</button></div>");
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

var searchParkView = new SearchParkView({model: parkModel});
searchParkView.render();
$("#parks").append(searchParkView.$el);

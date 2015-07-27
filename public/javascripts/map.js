var info;

var MarkerView = Backbone.View.extend({
	el: '#markerview',

	initialize: function() {
		var self = this;
		//loop to create markers for all the state parks
		var marker_position = new google.maps.LatLng(self.model.get('latitude'), self.model.get('longitude'));
		info = new google.maps.InfoWindow();

		var marker = new google.maps.Marker({
			position: marker_position,
			map: theMap.map,
			title: self.model.attributes.name,
			animation: google.maps.Animation.DROP,
		});
		var sourceArray = [];
		google.maps.event.addListener(marker, 'click', (function(marker) {
			return function() {
				info.setContent("<div><p><b>" + self.model.attributes.name + "</br><a href='#parkInfo'>Explore</a></div>");
				info.open(theMap.map, marker);

				//Close any open infoWindow if the map is clicked
				google.maps.event.addListener(theMap.map, 'click', function() {
					if (info) {
						info.close();
					}
				});
				var flickrURL = self.model.attributes.parkFlickrCall;
				var name = self.model.attributes.name;
				$.getJSON(flickrURL)
					.always(function(data) {
						newJson = JSON.parse(data.responseText.slice(14, -1));
						if ($("#parkLabel").val() === undefined) {
							$("<h1 id='parkLabel'>" + name + "</h1>").appendTo('#parkHeader');
						} else {
							$("#parkHeader").replaceWith("<h1 id='parkLabel'>" + name + "</h1>");
						}
						if (newJson.photos.photo.length > 0) {
							$(".flickrPhoto").remove();
							$("<p>").remove();
							for (var i = 0; i < newJson.photos.photo.length; ++i) {
								var source = "http://farm" + newJson.photos.photo[i].farm + ".static.flickr.com/" + newJson.photos.photo[i].server + "/" + newJson.photos.photo[i].id + "_" + newJson.photos.photo[i].secret + "_" + "m.jpg";
								var link = "http://www.flickr.com/photos/" + newJson.photos.photo[i].owner + "/" + newJson.photos.photo[i].id + " target=_blank";
								sourceArray.push(source);
								$("<a href=" + link + "><img class=flickrPhoto src=" + source + "></a>").appendTo('#pictures');
							}
						} else {
							$("<p>Sorry, we couldn't find any photos from that park.</p>").replaceAll('#pictures');
						}
					});

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
			markerArray.push(markerView);
		});
	}
});

var mapView = new MapView({
	model: parkModel,
	collection: parkCollection
});

$("#map_canvas").append(mapView.$el);

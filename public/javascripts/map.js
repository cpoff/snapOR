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

						//if user clicks on a park with pictures, the pictures are added to the page
						//if the user then clicks on a park without any pictures, the error message appears
						//if a user clicks on a park with no pictures after that, nothing changes
						//if error on page, $("parkInfo p").html() gives error message, adding .length, gives number
						//chandler state wayside has no pictures
						// $("#parkInfo").remove();
						if($("#parkLabel").html()===undefined){
							$("<h1 id='parkLabel'>" + name + "</h1>").appendTo('#parkHeader');
							if (newJson.photos.photo.length > 0){
								for (var i = 0; i < newJson.photos.photo.length; ++i) {
									var source = "http://farm" + newJson.photos.photo[i].farm + ".static.flickr.com/" + newJson.photos.photo[i].server + "/" + newJson.photos.photo[i].id + "_" + newJson.photos.photo[i].secret + "_" + "m.jpg";
									var link = "http://www.flickr.com/photos/" + newJson.photos.photo[i].owner + "/" + newJson.photos.photo[i].id + " target=_blank";
									sourceArray.push(source);
									$("<a href=" + link + "><img class=flickrPhoto src=" + source + "></a>").appendTo('#pictures');
								}
							} else {
								$("<p>Sorry, we couldn't find any photos from that park.</p>").appendTo('#pictures');	
							}
						} else{
							$("#parkLabel").remove();
							$(".flickrPhoto").remove();
							$("#pictures p").remove();
							console.log("dom already populated");
							$("<h1 id='parkLabel'>" + name + "</h1>").appendTo('#parkHeader');
							if (newJson.photos.photo.length > 0){
								for (var i = 0; i < newJson.photos.photo.length; ++i) {
									var source = "http://farm" + newJson.photos.photo[i].farm + ".static.flickr.com/" + newJson.photos.photo[i].server + "/" + newJson.photos.photo[i].id + "_" + newJson.photos.photo[i].secret + "_" + "m.jpg";
									var link = "http://www.flickr.com/photos/" + newJson.photos.photo[i].owner + "/" + newJson.photos.photo[i].id + " target=_blank";
									sourceArray.push(source);
									$("<a href=" + link + "><img class=flickrPhoto src=" + source + "></a>").appendTo('#pictures');
								}
							} else {
								$("<p>Sorry, we couldn't find any photos from that park.</p>").appendTo('#pictures');	
							}
						}
						// if($("#parkInfo").html().length<0){
						// 	$("<h1 id='parkLabel'>" + name + "</h1>").appendTo('#parkHeader');
						// 	if (newJson.photos.photo.length > 0){
						// 		for (var i = 0; i < newJson.photos.photo.length; ++i) {
						// 			var source = "http://farm" + newJson.photos.photo[i].farm + ".static.flickr.com/" + newJson.photos.photo[i].server + "/" + newJson.photos.photo[i].id + "_" + newJson.photos.photo[i].secret + "_" + "m.jpg";
						// 			var link = "http://www.flickr.com/photos/" + newJson.photos.photo[i].owner + "/" + newJson.photos.photo[i].id + " target=_blank";
						// 			sourceArray.push(source);
						// 			$("<a href=" + link + "><img class=flickrPhoto src=" + source + "></a>").appendTo('#pictures');
						// 		}
						// 	} else {
						// 		$("<p>Sorry, we couldn't find any photos from that park.</p>").appendTo('#pictures');	
						// 	}
					// } else{
					// 	$("#parkInfo").remove();
					// 	$("<h1 id='parkLabel'>" + name + "</h1>").appendTo('#parkHeader');
					// 	if (newJson.photos.photo.length > 0){
					// 		for (var i = 0; i < newJson.photos.photo.length; ++i) {
					// 			var source = "http://farm" + newJson.photos.photo[i].farm + ".static.flickr.com/" + newJson.photos.photo[i].server + "/" + newJson.photos.photo[i].id + "_" + newJson.photos.photo[i].secret + "_" + "m.jpg";
					// 			var link = "http://www.flickr.com/photos/" + newJson.photos.photo[i].owner + "/" + newJson.photos.photo[i].id + " target=_blank";
					// 			sourceArray.push(source);
					// 			$("<a href=" + link + "><img class=flickrPhoto src=" + source + "></a>").appendTo('#pictures');
					// 		}
					// 	} else {
					// 		$("<p>Sorry, we couldn't find any photos from that park.</p>").appendTo('#pictures');	
					// 	}
						// }
					});
			};
		})(marker));

	}
});



						// if ($("#parkLabel").html() === undefined) {
						// 	$("<h1 id='parkLabel'>" + name + "</h1>").appendTo('#parkHeader');
						// } else {
						// 	$("#parkHeader").replaceWith("<h1 id='parkLabel'>" + name + "</h1>");
						// }
						// // if($("parkInfo p").html().length>0){
						// // 	$("parkInfo p").remove();
						// // }
						// if (newJson.photos.photo.length > 0 && $("#parkInfo p").html()===undefined) {
						// 	console.log(newJson.photos.photo.length);
						// 	console.log($("#parkInfo p").html());
						// 	$(".flickrPhoto").remove();
						// 	// $("#parkInfo p").remove();
						// 	for (var i = 0; i < newJson.photos.photo.length; ++i) {
						// 		var source = "http://farm" + newJson.photos.photo[i].farm + ".static.flickr.com/" + newJson.photos.photo[i].server + "/" + newJson.photos.photo[i].id + "_" + newJson.photos.photo[i].secret + "_" + "m.jpg";
						// 		var link = "http://www.flickr.com/photos/" + newJson.photos.photo[i].owner + "/" + newJson.photos.photo[i].id + " target=_blank";
						// 		sourceArray.push(source);
						// 		$("<a href=" + link + "><img class=flickrPhoto src=" + source + "></a>").appendTo('#pictures');
						// 	}
						// } else if (newJson.photos.photo.length === 0 && $("#parkInfo p").html()===undefined) {
						// 	$("<p>Sorry, we couldn't find any photos from that park.</p>").replaceAll('#pictures');
						// } else if (newJson.photos.photo.length > 0 && $("#parkInfo p").html()!==undefined){
						// 	console.log(newJson.photos.photo.length);
						// 	console.log($("#parkInfo p").html());
						// 	// $(".flickrPhoto").remove();
						// 	// debugger;
						// 	$("#parkInfo p").remove();
						// 	$("#parkHeader").replaceWith("<h1 id='parkLabel'>" + name + "</h1>");
						// 	for (var i = 0; i < newJson.photos.photo.length; ++i) {
						// 		var source = "http://farm" + newJson.photos.photo[i].farm + ".static.flickr.com/" + newJson.photos.photo[i].server + "/" + newJson.photos.photo[i].id + "_" + newJson.photos.photo[i].secret + "_" + "m.jpg";
						// 		var link = "http://www.flickr.com/photos/" + newJson.photos.photo[i].owner + "/" + newJson.photos.photo[i].id + " target=_blank";
						// 		sourceArray.push(source);
						// 		$("<a href=" + link + "><img class=flickrPhoto src=" + source + "></a>").appendTo('#pictures');
						// 	}
// 						}
// 					});

// 			};
// 		})(marker));

// 	}
// });

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

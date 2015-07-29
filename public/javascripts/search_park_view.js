var SearchParkView = Backbone.View.extend({
	url: '/',
	el: '#parks',
	render: function(){
		//Explore Parks modal, appears in dom when you click Explore Parks
		this.$el.html('<div id="parkList"><input id="parkName" class="typeahead" type="text" name="Enter park name:" style="font-family: \'Robot Slab\'" placeholder="Ex: \'cape kiwanda\', \'silver falls state park\'"><a href="#" class="close-reveal-modal"><input id="searchParks" class="submit button" class="submit" value="Explore"></a></div>');
	},

	searchParks: function(){
		//When the user has the Explore Parks modal open:
		var parkName = $("#parkName").val(); //store the user's input of a park they want to search for

		//parkNames is an array of elements where each element is the name of an Oregon State Park
		var parkNames = [];
		for(var i = 0; i<this.collection.models.length; i++){ //store all the park names into an array from the collection.model
			parkNames.push(this.collection.models[i].attributes.name);
		}

		//If the user entered an Oregon State Park name, that value is matched with the element in parkNames and the index position is stored into var location.  With that index position, the data of that model in the collection can be used to fire the flickr api
		var location = parkNames.indexOf(parkName); //returns the index position of the park the user is searching for
		var flickrUrl = this.collection.models[location].attributes.parkFlickrCall; //sets that index position as the collection.modesls index position, and stores the parkFlicker url into a new variable
		var name = this.collection.models[location].attributes.name;
		$.getJSON(flickrUrl) //fires the flickr url
			.always(function(data) {
				newJson = JSON.parse(data.responseText.slice(14, -1)); //newJson is the object that contains the data for the pictures of the flickr query
				if($("#parkLabel").html()===undefined){//if the user hasn't searched for a park yet, as indicated by zero html in the div#parkLabel
					$("<h1 id='parkLabel'>"+name+"</h1>").appendTo('#parkHeader');//the park name that the user searched for is added to the html
					if(newJson.photos.photo.length>0){ //if newJson has any pictures that can be displayed, each is appended to the page within the flexbox element (div#pictures)
						for(var i = 0; i<newJson.photos.photo.length; ++i){
							var source = "http://farm" + newJson.photos.photo[i].farm + ".static.flickr.com/" + newJson.photos.photo[i].server + "/" + newJson.photos.photo[i].id + "_" + newJson.photos.photo[i].secret + "_" + "m.jpg"; //var source is the src attribute of an img html tag
							var link = "http://www.flickr.com/photos/" + newJson.photos.photo[i].owner + "/" + newJson.photos.photo[i].id + " target=_blank"; //var link anchors each image to it's url from flicker.  If the user clicks on the image, the user is redirected to the flickr website to view the original picture
							$("<a href=" + link + "><img class=flickrPhoto src=" + source + "></a>").appendTo('#pictures');
						}
					} else { //if newJson doesn't have any pictures, the an error message is appended to the page
						$("<p id='no-photos'>Sorry, we couldn't find any photos from that park. Looks like you've got an adventure waiting! </p>").appendTo('#pictures');
					}
				} else { //if the user has already searched for a park (as indicated by a park name and either pictures or an error message appended below the google map), all of those elements of the previous search are removed from the dom, and the query results from the current search are appended.
					$("#parkLabel").remove();
					$(".flickrPhoto").remove();
					$("#pictures p").remove();
					$("<h1 id='parkLabel'>"+name+"</h1>").appendTo('#parkHeader');
					if(newJson.photos.photo.length>0){
						for(var i = 0; i<newJson.photos.photo.length; ++i){
							var source = "http://farm" + newJson.photos.photo[i].farm + ".static.flickr.com/" + newJson.photos.photo[i].server + "/" + newJson.photos.photo[i].id + "_" + newJson.photos.photo[i].secret + "_" + "m.jpg";
							var link = "http://www.flickr.com/photos/" + newJson.photos.photo[i].owner + "/" + newJson.photos.photo[i].id + " target=_blank";
							// sourceArray.push(source);
							$("<a href=" + link + "><img class=flickrPhoto src=" + source + "></a>").appendTo('#pictures');
						}
					} else {
						$("<p>Sorry, we couldn't find any photos from that park. Looks like you've got an adventure waiting!</p>").appendTo('#pictures');
					}
				}
			});
	},
	events: { 
			'click #searchParks': 'searchParks'//fire flicker api, render parkView
	}
});

var searchParkView = new SearchParkView({model: parkModel, collection: parkCollection});
searchParkView.render();
$("#parks").append(searchParkView.$el);
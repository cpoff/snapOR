var SearchParkView = Backbone.View.extend({
	url: '/',
	el: '#parks',
	render: function(){
		var template = _.template('<h2 id="modalTitle">Explore Parks</h2><a class="close-reveal-modal aria-label="Close">&times;</a><div id="parkList"><input id="parkName" class="typeahead" type="text" name="Enter park name:" style="font-family: \'Robot Slab\'" placeholder="Ex: \'cape kiwanda\', \'silver falls state park\'"><br><a href="#" class="close-reveal-modal"><input id="searchParks" class="submit button" class="submit" value="Explore"></a></div>');
		this.$el.html(template());
	},

	searchParks: function(){
		var parkName = $("#parkName").val(); //store the user's input of a park they want to search for
		var parkNames = [];
		for(var i = 0; i<this.collection.models.length; i++){ //store all the park names into an array from the collection.model
			parkNames.push(this.collection.models[i].attributes.name);
		}
		var location = parkNames.indexOf(parkName); //returns the index position of the park the user is searching for
		var flickrUrl = this.collection.models[location].attributes.parkFlickrCall; //sets that index position as the collection.modesls index position, and stores the parkFlicker url into a new variable
		var name = this.collection.models[location].attributes.name;
		console.log(name);
		var sourceArray = [];
		$.getJSON(flickrUrl) //fires the flickr url
			.always(function(data) {
				newJson = JSON.parse(data.responseText.slice(14, -1));
				$("<h1 id='parkName'>"+name+"</h1>").appendTo('#pictures');
				for(var i = 0; i<newJson.photos.photo.length; ++i){
					var source = "http://farm" + newJson.photos.photo[i].farm + ".static.flickr.com/" + newJson.photos.photo[i].server + "/" + newJson.photos.photo[i].id + "_" + newJson.photos.photo[i].secret + "_" + "t.jpg";
					sourceArray.push(source);
					$("<img class=flickrPhoto src=" + source + ">").appendTo('#pictures');
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
var SearchParkView = Backbone.View.extend({
	url: '/',
	el: '#parks',
	render: function(){
		var template = _.template('<h2 id="modalTitle">Explore Parks</h2><a class="close-reveal-modal aria-label="Close">&times;</a><div id="parkList"><input id="parkName" class="typeahead" type="text" name="Enter park name:" style="font-family: \'Robot Slab\'" placeholder="Ex: \'cape kiwanda\', \'silver falls state park\'"><br><input id="searchParks" class="submit button" class="submit" value="Explore"></div>');
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
		$.getJSON(flickrUrl); //fires the flickr url

	},
	events: { 
			'click #searchParks': 'searchParks'//fire flicker api, render parkView
	}
});

var searchParkView = new SearchParkView({model: parkModel, collection: parkCollection});
searchParkView.render();
$("#parks").append(searchParkView.$el);
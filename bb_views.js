var Park = Backbone.Model.extend({
    defaults : {'parkName': '',
                'parkFeatures':[],
                'parkAda':'',
                'parkLat':'',
                'parkLong':'',
                'parkNarrative':'',
                'parkViewUrl':'',
                'parkFlickrCall':'',
                
               },
	initialize : function () {
		this.fetch();
	} 
});

//BUILD MODEL CONTAINING LAT/LONG, PLUS FLICKR API URL
Park.prototype.flickrApi = function () {
    var lat = this.get("parkLat");
    var long = this.get("parkLong");
    var flickrApi = this.set(parkFlickrCall, "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0be06ecdf3fa1ac784e8fd10c279790c&tags=park&lat=" + lat + "&lon=" + long + "&radius=20&per_page=20&format=json");
},

//https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0be06ecdf3fa1ac784e8fd10c279790c&tags=park&lat=[LATITUDE]&lon=[LONGITUDE]&radius=20&per_page=20&format=json

// snapOR homepage
var MasterView = Backbone.View.extend({
	render: function () {      
		this.$el.html("<div>" + "Map API response goes here" + "</div>");
	},


var ParkView = Backbone.View.extend({
	render: function () {  
    console.log(this.model.get(parkFlickrCall()));
		this.$el.html("<div>" + "Flickr API response goes here" + "</div>");
	},
});

//user page
var userModel = Backbone.Model.extend({
	defaults: {"name": "", "email": "", "home": ""}
});// closes userModel

var userView = Backbone.View.extend({
	render : function(){
		var nameVal = this.model.get("name");
		var emailVal = this.model.get("email");
		var homeVal = this.model.get("home");

		this.$el.html = 
		//label 'name' + input:text(name) + button.name-btn:update
		//label 'email' + input:email(from registration) + button.email-btn:update
		//label 'home location' + input:text(home) + button.home-btn:update
	}, // closes render
	initialize : function(){
		this.model.on("change", this.render, this);
	},
	events : {
		'click .name-btn' : "update-name",
		'click .email-btn' : "update-email",
		'click .home-btn' : "update-home"
	}, //closes events
	update-name : function() {

	},
	update-email : function() {

	},
	update-home : function() {
		
	}

});// closes userView

// collection of park pages
var ParkCollection = Backbone.Collection.extend({
	model : ParkModel,
	url : "/parkdetail",
	initialize: function () {
		this.fetch();
	}
});
var parkView;
$(document).ready( function () {
	var parkModel = new Park();
	var parkCollection = new ParkCollection();
    parkView = new ParkView({model : parkModel});
	var userModel = new User();
	var userView = new UserView({model: userModel});

  parkView.render();

  $("#parkdiv").append(parkView.$el);
});



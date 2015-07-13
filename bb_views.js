var ParkModel = Backbone.Model.extend({
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

// snapOR homepage
var MasterView = Backbone.View.extend({
	render: function () {      
		this.$el.html("<div>" + "Map API response goes here" + "</div>");
	},


var ParkView = Backbone.View.extend({
	render: function () {      
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

$(document).ready( function () {
	var parkModel = new Park();
	var parkCollection = new ParkCollection();
	var parkView = new ParkView({model : parkModel});
	var userModel = new User();
	var userView = new UserView({model: userModel});

  parkView.render();

  $("#parkdiv").append(parkView.$el);
});



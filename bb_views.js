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
	urlRoot: '/user',
	defaults: {"name": "", "email": "", "home": ""},
	replace : function(str) {
		this.set("name", str)
	}
});// closes userModel

var userView = Backbone.View.extend({
	render : function(){
		var nameVal = this.model.get("name");
		var nameInput = '<input type="text" id="nameInput" placeholder="enter name"</input>';
		var updateBtn = '<button type="submit" id="update">Update Info</button>';
		var emailVal = this.model.get("email");
		var emailInput = '<input type="text" id="emailInput" placeholder="enter email"</input>';
		var homeVal = this.model.get("home");
		var homeInput = '<input type="text" id="homeInput" placeholder="enter home location"</input>';

		this.$el.html = 
		(nameInput + updateBtn + '<br />' + 
			emailInput + updateBtn + '<br />' +
			homeInput + updateBtn
			);
	}, // closes render
	replace : function() {
		var str = this.$el.find("input").val();
		this.model.replace(str);
	}
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
  userView.render();


  $("#parkdiv").append(parkView.$el);
  $("#userDiv").append(userView.$el);
});



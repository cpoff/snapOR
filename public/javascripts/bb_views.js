var ParkModel = Backbone.Model.extend({
    defaults : {'parkName': '',
                'parkFeatures':[],
                'parkAda':'',
                'parkLat':'',
                'parkLong':'',
                'parkNarrative':'',
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
var UserModel = Backbone.Model.extend({
	urlRoot: '/user',
	defaults: {"name": "", "email": "", "home": ""},
	replace : function(str) {
		this.set("name", str)
	}
});// closes userModel

var UserView = Backbone.View.extend({
	url: '/user',
	render : function(){
		//var nameVal = this.model.get("name");
		var nameInput = '<label>Name: </label><input type="text" id="nameInput" placeholder="enter name"</input>';
		var nameBtn = '<button type="submit" id="nameUpdate">Update Info</button>';
		//var emailVal = this.model.get("email");
		var emailInput = '<label>Email: </label><input type="text" id="emailInput" placeholder="enter email"</input>';
		var emailBtn = '<button type="submit" id="emailUpdate">Update Info</button>';
		//var homeVal = this.model.get("home");
		var homeInput = '<label>Home Location: </label><input type="text" id="homeInput" placeholder="enter home location"</input>';
		var homeBtn = '<button type="submit" id="homeUpdate">Update Info</button>';

		this.$el.html = 
		(nameInput + nameBtn + '<br />' + 
			emailInput + emailBtn + '<br />' +
			homeInput + homeBtn
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
		'click #nameUpdate' : "replace",
		'click #emailUpdate' : "replace",
		'click #homeUpdate' : "replace"
	}, //closes events
});// closes userView

// collection of park pages
var ParkCollection = Backbone.Collection.extend({
	model : ParkModel,
	url : "/parkdetail",
	initialize: function () {
		this.fetch();
	}
});

var parkModel;
var parkCollection;
var parkView;
var userModel;
var userView;

$(document).ready(function() {
	var parkModel = new ParkModel();
	var parkCollection = new ParkCollection();
	var parkView = new ParkView({model : parkModel});
	var userModel = new UserModel();
	var userView = new UserView({model: userModel});

  parkView.render();
  userView.render();


  //$("#parkdiv").append(parkView.$el);
  $("#userDiv").append(userView.$el);
});



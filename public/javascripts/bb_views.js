// snapOR homepage
var MasterView = Backbone.View.extend({
	render: function () {      
		this.$el.html("<div>" + "Map API response goes here" + "</div>");
	}
});

/*
var ParkModel = Backbone.Model.extend({
    defaults : {'name': '',
//                'features':[],
                'latitude':'',
                'longitude':'',
                'parkFlickrCall':'',
               },
	initialize : function () {
        console.log(ParkModel);
        console.log('Yes');
        this.fetch();
	} 
});

// collection of park pages
var ParkCollection = Backbone.Collection.extend({
	model : ParkModel,
//	url : "/parkdetail",
	initialize: function () {
		this.fetch();
	}
});

var parkCollection = new Backbone.Collection(parkArray, {
    model: ParkModel,
});


//BUILD MODEL CONTAINING LAT/LONG, PLUS FLICKR API URL
ParkModel.prototype.flickrApi = function () {
    var lat = this.get("parkLat");
    var lat = this.get("parkLat");
    var long = this.get("parkLong");
    var flickrApi = this.set(parkFlickrCall, "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0be06ecdf3fa1ac784e8fd10c279790c&tags=park&lat=" + lat + "&lon=" + long + "&radius=20&per_page=20&format=json");
};

var ParkView = Backbone.View.extend({
	url : "/parkdetail",
	render: function () {      
		this.$el.html("<div>" + "Flickr API response goes here" + "</div>");
	},
});
*/



//user page
var UserModel = Backbone.Model.extend({
	urlRoot: '/user',
	defaults: {"name": "", "email": "", "home": ""},
	initialize : function() {
		this.fetch();
	},
	replace : function(str) {
		this.set("name", str);
		this.set("email", str);
		this.set("home", str);
		this.save();
	}
});// closes userModel

var UserView = Backbone.View.extend({
	url: '/user',
	render : function(){
		//var nameVal = this.model.get("name");
		var nameInput = '<label>Name: </label><input type="text" id="nameInput" placeholder="enter name" value=""</input>';
		var nameBtn = '<button type="submit" id="nameUpdate">Update Info</button>';
		//var emailVal = this.model.get("email");
		var emailInput = '<label>Email: </label><input type="text" id="emailInput" placeholder="enter email" value=""</input>';
		var emailBtn = '<button type="submit" id="emailUpdate">Update Info</button>';
		//var homeVal = this.model.get("home");
		var homeInput = '<label>Home Location: </label><input type="text" id="homeInput" placeholder="enter home location" value=""</input>';
		var homeBtn = '<button type="submit" id="homeUpdate">Update Info</button>';

		this.$el.html(nameInput + nameBtn + '<br />' + 
			emailInput + emailBtn + '<br />' +
			homeInput + homeBtn
			);
	}, // closes render again
	replace : function() {
		var str = this.$el.find("input").val();
		this.model.replace(str);
	},
	initialize : function(){
		this.model.on("change", this.render, this);
	},
	events : {
		'click #nameUpdate' : "replace",
		'click #emailUpdate' : "replace",
		'click #homeUpdate' : "replace"
	}, //closes events
});// closes userView

//var parkView;
var userModel;
var userView;

$(document).ready(function() {
	//parkModel = new ParkModel();
	//parkCollection = new ParkCollection();
	//parkView = new ParkView({model : parkModel});
	userModel = new UserModel();
	userView = new UserView({model: userModel});

  //parkView.render();
  userView.render();


  //$("#parkdiv").append(parkView.$el);
  $("#userDiv").append(userView.$el);
});



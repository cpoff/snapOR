_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g
}

//user page
var UserModel = Backbone.Model.extend({
	urlRoot: '/user',
	defaults: {
			"name": "",
			"email": "",
			"home": ""
	},
	initialize: function() {
			this.fetch();
	},
	replace: function(str) {
			this.set("name", str);
			this.set("email", str);
			this.set("home", str);
			this.save();
	}
}); // closes userModel

var UserView = Backbone.View.extend({
	url: '/user',
	render: function() {
		//if the user doesn't have property values for name and home location, render this template (to collect this data)
		var update_user_template = _.template('<h2>Update</h2><label>Name: </label><input type="text" id="nameInput" placeholder="enter name" value=""</input><br /><label>Email: </label><input type="text" id="emailInput" placeholder="enter email" value=""</input><br /><label>Home Location: </label><input type="text" id="homeInput" placeholder="enter home location" value=""</input><br /><label>Password: </label><input type="text" id="homeInput" placeholder="enter home location" value=""</input><br /><button type="submit" id="homeUpdate">Update Info</button>');
		var new_user_tempate = _.tempate('<h2>Welcome</h2><p>We have a couple more questions for you so we can make your experience with snapOR more personal.<p><label>Name: </label><input type="text" id="nameInput" placeholder="enter name" value=""</input><br /><label>Home Location: </label><input type="text" id="homeInput" placeholder="enter home location" value=""</input><br /><button type="submit" id="homeUpdate">Save Info</button>');
		var user_template;
		//else render a different template
			//var nameVal = this.model.get("name");
			var nameInput = '<label>Name: </label><input type="text" id="nameInput" placeholder="enter name" value=""</input>';
			var nameBtn = '<button type="submit" id="nameUpdate">Update Info</button>';
			//var emailVal = this.model.get("email");
			var emailInput = '<label>Email: </label><input type="text" id="emailInput" placeholder="enter email" value=""</input>';
			var emailBtn = '<button type="submit" id="emailUpdate">Update Info</button>';
			//var homeVal = this.model.get("home");
			var homeInput = '<label>Home Location: </label><input type="text" id="homeInput" placeholder="enter home location" value=""</input>';
			var homeBtn = '<button type="submit" id="homeUpdate">Update Info</button>';
			this.$el.html(nameInput + nameBtn + '<br />' + emailInput + emailBtn + '<br />' + homeInput + homeBtn);
	}, // closes render again
	replace: function() {
			var str = this.$el.find("input").val();
			this.model.replace(str);
	},
	initialize: function() {
			this.model.on("change", this.render, this);
	},
	events: {
			'click #nameUpdate': "replace",
			'click #emailUpdate': "replace",
			'click #homeUpdate': "replace"
	}, //closes events
}); // closes userView

var userModel, userView;

$(document).ready(function(){
	userModel = new UserModel();
	userView = new UserView({model: userModel});
	userView.render();
	$("#userDiv").append(userView.$el);
});
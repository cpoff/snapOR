'use strict'
_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g
};

//user page 
var UserModel = Backbone.Model.extend({
	urlRoot: '/user',
	defaults: {	
		"name": "",
		"email": "",
		"home": ""
	},
	initialize: function() {
		console.log('new model created');
		this.fetch();
	},
	// replace: function(str) {
	// 		this.set("name", str);
	// 		this.set("email", str);
	// 		this.set("home", str);
	// 		this.save();
	// }
}); // closes userModel

var UserView = Backbone.View.extend({
	url: '/user',
	// new_user_template :  _.template('<h2>Welcome</h2><p>We have a couple more questions for you so we can make your experience with snapOR more personal.<p><label>Name: </label><input type="text" id="nameInput" placeholder="Who are you?" value=""</input><br /><label>Home Location: </label><input type="text" id="homeInput" placeholder="Where do you live?" value=""</input><br /><button type="submit" id="save">Save Info</button>'),
	user_template : _.template('<h1>Welcome to snapOR! {{nameVal}}<button type="submit" id="update">Update info</button><button type="submit" id="logout">Logout</button>'),
	update_user_template : _.template('<h2>Update</h2><label>Name: </label><input type="text" id="nameInput" placeholder={{nameVal}} value=""</input><br /><label>Email: </label><input type="text" id="emailInput" placeholder={{emailVal}} value=""</input><br /><label>Home Location: </label><input type="text" id="homeInput" placeholder={{homeVal}} value=""</input><br /><label>Password: </label><input type="text" id="password" placeholder="change password" value=""</input><br /><button type="submit" id="saveBtn">Update Info</button>'),
	render: function() {
		var nameVal = this.model.get("name");
		var emailVal = this.model.get("email");
		var homeVal = this.model.get("home");
		var new_user_template =  _.template(
			'<div id="userInfoDiv"><h2>Welcome, {{emailVal}}</h2><p>Please review your information below, and update as needed.
			<label id="userLabel">Name: </label><input type="text" id="nameInput" placeholder="Name" value=""</input><br />
			<label id="userLabel">Email: </label><input type="text" id="emailInput" value="{value.email}"</input><br />
			<label id="userLabel">Home Location: </label><input type="text" id="homeInput" placeholder="Where do you live?" value=""</input><br />
			<button type="submit" id="save">Save Info</button></div>');
		if(nameVal === '' && homeVal === ''){
			this.$el.html(new_user_template({emailVal : this.model.get("email")}));
		} else{
			this.$el.html(
				user_template({nameVal : this.model.get("name")}));
		}
	}, // closes render again
	update: function(){
		var nameVal = this.model.get("name");
		var emailVal = this.model.get("email");
		var homeVal = this.model.get("home");
		this.$el.html(update_user_template());
	},
	save: function() {
		//data before changes made
		var nameVal = this.model.get("name");
		var emailVal = this.model.get("email");
		var homeVal = this.model.get("home");
		//changes made on form
		var nameChanged = this.$el.find("#nameInput").val();
		var emailChanged = this.$el.find("#emailInput").val();
		var homeChanged = this.$el.find("#homeInput").val();

		if(nameVal !== nameChanged || emailVal !== emailChanged || omeVal !== homeChanged){
			this.model.update();
		}
		// if(emailVal !== emailChanged){
		// 	this.model.update();
		// }
		// if(homeVal !== homeChanged){
		// 	this.model.update();
		// }
	},
	// initialize: function() {
	// 	this.model.on("change", this.render, this);
	// },
	events: {
		'click #update': "update",
		'click #logout' : 'logout',
		'click #save': 'save'
	} //closes events
}); // closes userView

var userModel;
var userView;

$(document).ready(function(){
	userModel = new UserModel();
	userView = new UserView({model: userModel});
	userView.render();
	$("#userDiv").append(userView.$el);
});

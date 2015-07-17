_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g
};

//user page 
var UserModel = Backbone.Model.extend({
	urlRoot: '/',
	defaults: {	
		"name": "",
		"email": "",
		"home": ""
	},
	initialize: function() {
		console.log('new model created');
		this.fetch();
	},
	replace: function(name, email, home) {
			this.set({"name" : str, "email" : email, "home" : home});
			// this.set("email", str);
			// this.set("home", str);
			this.save();
	}
}); // closes userModel

var UserView = Backbone.View.extend({
	el : '#register',
	url: '/',
	update_user_template : _.template('<h2>Update</h2><label>Name: </label><input type="text" id="nameInput" placeholder={{nameVal}} value=""</input><br /><label>Email: </label><input type="text" id="emailInput" placeholder={{emailVal}} value=""</input><br /><label>Home Location: </label><input type="text" id="homeInput" placeholder={{homeVal}} value=""</input><br /><label>Password: </label><input type="text" id="password" placeholder="change password" value=""</input><br /><button type="submit" id="saveBtn">Update Info</button>'),
	render: function() {
		var nameVal = this.model.get("name");
		var emailVal = this.model.get("email");
		var homeVal = this.model.get("home");
		var new_user_template =  _.template(
			'<div id="userInfoDiv"><h2>Welcome, {{emailVal}}</h2><p>Please review your information below, and update as needed.<label id="userLabel">Name: </label><input type="text" id="nameInput" placeholder="Name" value=""</input><br /><label id="userLabel">Email: </label><input type="text" id="emailInput" value="{value.email}"</input><br /><label id="userLabel">Home Location: </label><input type="text" id="homeInput" placeholder="Where do you live?" value=""</input><br /><button type="submit" id="save">Save Info</button></div>');
		// this.listenTo($('#create_user'), 'click', create_user);
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
	create_user: function(){
		var userEmail = $('#email').val();
		var password = $('#password').val();
		var password_confirm = $('#password_confirm').val();
		if(password===password_confirm){
			userView.render();
			$("#userDiv").append(userView.$el);
			this.model.set("email", userEmail);
		}
		// userView.render();
		// $("#userDiv").append(userView.$el)
		// console.log('woohoo');
		// this.model.set("email", userEmail);

		// if (password === password_confirm){
		// 	this.model.set("email", 'n@gmail.com');
		// }
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
			// this.model.update();
			this.model.replace("name", nameChanged);
			this.model.replace("email", emailChanged);
			this.model.replace("home", homeChanged);
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
		'click .save': 'save',
		'click #create_user': 'create_user'
		// 'click #create_user': 'render'
	} //closes events
}); // closes userView

var userModel = new UserModel();
var userView = new UserView({model: userModel});
// userView.render();
// $("#userDiv").append(userView.$el);


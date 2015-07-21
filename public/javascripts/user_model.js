_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g
};

var UserModel = Backbone.Model.extend({
	urlRoot: '/',
	defaults: {	"name": "", "email": "", "home": ""},
	initialize: function() {
		console.log('new model created');
		this.fetch();
	},
	replace: function(name, email, home) {
			this.set({"name" : str, "email" : email, "home" : home});
			this.save();
	}
}); // closes userModel

var UserView = Backbone.View.extend({
	el : '#register',
	url: '/',
	//TEMPLATE THAT POPULATES WHEN EXIS. USER CLICKS 'UPDATE' ON NAV
	// BUTTON ID = SAVE
	update_user_template : _.template('<h2>Update</h2><label>Name: </label><input type="text" id="nameInput" placeholder={{nameVal}} value=""</input><br /><label>Email: </label><input type="text" id="emailInput" placeholder={{emailVal}} value=""</input><br /><label>Home Location: </label><input type="text" id="homeInput" placeholder={{homeVal}} value=""</input><br /><label>Password: </label><input type="text" id="password" placeholder="change password" value=""</input><br /><button type="submit" id="save">Update Info</button>'),

	// REGISTRATION PROCESS
	render: function() {
		var nameVal = this.model.get("name");
		var emailVal = this.model.get("email");
		var homeVal = this.model.get("home");
		//MODAL WINDOW FOR NEW USER TO ENTER NAME/HOMETOWN
		//BUTTON ID = COMPLETE_REGIS
		var new_user_template =  _.template(
			'<div id="userInfoDiv"><h2>Welcome, {{emailVal}}</h2><p>Please review your information below, and update as needed.</p><form method="post" action="/complete_regis"><label id="userLabel">Name:</label><input id="nameInput" type="text" placeholder="Name"</input><br /><label id="userLabel">Email: </label><input id="emailInput" type="text" value="{{emailVal}}"</input><br /><label id="userLabel">Home Location: </label><input id="homeInput" type="text" placeholder="Where do you live?"</input><br /><button id="complete_regis" type="submit">Save Info</button></form></div>');

		//NAV BAR OPTIONS FOR EXIS. USERS	
		//BUTTON ID = UPDATE
		var user_template = _.template('<h2>Welcome {{nameVal}}</h2><div><button type="sumbit" id="update">Update</button><button type="sumbit" id="logout">Logout</button>');
		if(nameVal === '' && homeVal === ''){
			this.$el.html(new_user_template({emailVal : this.model.get("email")}));
		} else {
			this.$el.html(
				user_template({nameVal : this.model.get("name")}));
		}
	}, // closes render
	events: {
		'click #create_user': 'create_user', // index.jade: Register Account
		'click #complete_regis': 'complete_regis',
		'click #update': "update",//user_template
		'click .save': 'save',//update_user_template
		'click #logout': 'logout',
		'': 'reply' 
		//need an event to render the error message
	},
	create_user: function(){
		var userEmail = $('#email').val();
		var password = $('#password').val();
		var password_confirm = $('#password_confirm').val();
		if(password===password_confirm){
			//jQuery.post( url [, data ] [, success ] [, dataType ] )
			jQuery.post('/begin_regis', {email: userEmail, password: password}, function (reply) {
				if (reply.error) {
					console.log(reply);
					alert("Please use a unique email to register your account.");
				}
			});
			//this.model.set("email", userEmail);
			//userView.render();
			//$("#userDiv").append(userView.$el.html());
		} else {
			alert('Please make sure your password and password confirmation are the same.')
		}
	},
	complete_regis: function(){
		var userName = $('#nameInput').val();
		var userLocation = $('#homeInput').val();
		var userEmail = $('#emailInput').val();
		this.model.replace("name", userName);
		this.model.replace("home", userLocation);
		this.model.replace("email", userEmail);
		userView.render();
		$("#user").append(userView.$el.html());
	},
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

		if(nameVal !== nameChanged || emailVal !== emailChanged || homeVal !== homeChanged){
			// this.model.update();
			this.model.replace("name", nameChanged);
			this.model.replace("email", emailChanged);
			this.model.replace("home", homeChanged);
		}
	},
}); // closes userView

var userModel = new UserModel();
var userView = new UserView({model: userModel});


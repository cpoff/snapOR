_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g
};

var UserModel = Backbone.Model.extend({
	//urlRoot: '/',
	defaults: {	"name": "", "email": "", "home": ""},
	initialize: function() {
		//this.fetch();
	},
	replace: function(name, email, home) {
			this.set({"name" : name, "email" : email, "home" : home});
			this.save();
	}
}); // closes userModel

var UserView = Backbone.View.extend({
	el : '#register',
	// REGISTRATION PROCESS
	render: function() {
		var nameVal = this.model.get("name");
		var emailVal = this.model.get("email");
		var homeVal = this.model.get("home");
	}, // closes render
	events: {
		'click #register_account': 'register_account',
		'click #login_user': 'login_user', 
		'click #update_user': 'update_user', // 'update my account' button from foundation modal
		'click #logout': 'logout'
	},
	// logout: function() {
	// 	jQuery.post('/logout');
	// },
	///////////////////// PROC. TO REGISTER NEW USER FROM LANDING PAGE
	register_account: function(){
		var self = this;
		var userEmail = $('#email').val();
		var password = $('#password').val();
		var password_confirm = $('#password_confirm').val();
		var nameInput = $('#nameInput').val();
		var homeInput = $('#homeInput').val();
		if(password===password_confirm){
			jQuery.post('/begin_regis', {email: userEmail, password: password, name: nameInput, hometown: homeInput})
			.then(function() {
				$('.reveal-modal-bg').css('display', 'none');
				console.log("renderTemplate");
			}())// then
		} else {
			alert('Please make sure your password and password confirmation are the same.');
		}
	},
	login_user: function() {
		var self = this;
		jQuery.post('/user', {email: userEmail, password: password})
		.then(function() {
			console.log('new View')
			$('div.logged-out').hide();
		});
	},
	update_user: function() {
		//jQuery.post( url [, data ] [, success ] [, dataType ] )
		jQuery.post('/update_user_info', {email: userEmail, password: password, name: nameInput, hometown: homeInput})
	},
	// update_user: function() {
	// 	var self = this;
	// 	//jQuery.post( url [, data ] [, success ] [, dataType ] )
	// 	jQuery.post('/update_user_info', {email: userEmail, password: password, name: nameInput, hometown: homeInput}, function (reply) {
	// 		if (reply.error) {
	// 			console.log(reply);
	// 			alert("Error");
	// 		} else {
	// 		}
	// 	});
	// },
	logout: function() {
		//renders default nav
	}
	///////////////////// CURRENT_USER_TEMPLATE
	// update: function(){
	// 	var nameVal = this.model.get("name");
	// 	var emailVal = this.model.get("email");
	// 	var homeVal = this.model.get("home");
	// 	this.$el.html(update_user_template());
	// },
	///////////////////// UPDATE_USER_TEMPLATE
	// save: function() {
	// 	//data before changes made
	// 	var nameVal = this.model.get("name");
	// 	var emailVal = this.model.get("email");
	// 	var homeVal = this.model.get("home");
	// 	//changes made on form
	// 	var nameChanged = this.$el.find("#nameInput").val();
	// 	var emailChanged = this.$el.find("#emailInput").val();
	// 	var homeChanged = this.$el.find("#homeInput").val();

	// 	if(nameVal !== nameChanged || emailVal !== emailChanged || homeVal !== homeChanged){
	// 		// this.model.update();
	// 		this.model.replace("name", nameChanged);
	// 		this.model.replace("email", emailChanged);
	// 		this.model.replace("home", homeChanged);
	// 	}
	// },
}); // closes userView

var userModel = new UserModel();
var userView = new UserView({model: userModel});


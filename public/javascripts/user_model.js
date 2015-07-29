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
});

/***** REGISTER NEW USERS *****/
var RegView = Backbone.View.extend({
	el: '#register',
	events: {
		'click #register_account': 'register_account'
	},
	register_account: function(event){
		event.preventDefault();
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
				$('ul#logout-state').toggleClass('hide-nav');
				$('ul#login-state').toggleClass('hide-nav');
				console.log("renderTemplate");
			}())// then
		} else {
			alert('Please make sure your password and password confirmation are the same.');
		}
	},

});

/***** LOGIN EXISTING USERS *****/
var UserView = Backbone.View.extend({
	el : '#login',
	events: {
		'click #login_user': 'login_user', 
	},
	login_user: function(event) {
		var userEmail = $('#login-email').val();
		var password = $('#login-pw').val();
		console.log('login user func')
		event.preventDefault();
		jQuery.post('/user', {email: userEmail, password: password})
		.then(function() {
			console.log('new View')
			$('ul#logout-state').toggleClass('hide-nav');
			$('ul#login-state').toggleClass('hide-nav');
			$('.reveal-modal-bg').css('display', 'none');
		});
	}
});

/***** UPDATE EXISTING USERS *****/
var UpdateView = Backbone.View.extend({
	el: '#my_account',
	events: {
		'click #update_user': 'update_user'
	},
	update_user: function(event) {
		event.preventDefault();
		console.log('user updated');
		$('.reveal-modal-bg').css('display', 'none');
	}
	/***** WILL PUT INTO EFFECT W/SESSIONS *****/
	// update_user: function(event) {
	// 	event.preventDefault();
	// 	var self = this;
	// 	var userEmail = $('#email_update').val();
	// 	var password = $('#password_update').val();
	// 	var password_confirm = $('#password_confirm_update').val();
	// 	var nameInput = $('#nameInput_update').val();
	// 	var homeInput = $('#homeInput_update').val();
	// 	if(password===password_confirm){
	// 		jQuery.post('/update_user_info', {email: userEmail, password: password, name: nameInput, hometown: homeInput})
	// 	}
	// },
});

/***** LOGOUT USERS *****/
var LogoutView = Backbone.View.extend({
	el: '#login-state',
	events: {
		'click #logout': 'logout'
	},
	logout: function() {
		console.log('user is logged out');
		//$('.reveal-modal-bg').css('display', 'none');
		$('ul#logout-state').toggleClass('hide-nav');
		$('ul#login-state').toggleClass('hide-nav');
	} 
});

var userModel = new UserModel();
var userView = new UserView({model: userModel});
var regview = new RegView({model: userModel});
var logoutview = new LogoutView({model: userModel});

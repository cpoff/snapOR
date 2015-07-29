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
				console.log("renderTemplate");
			}())// then
		} else {
			alert('Please make sure your password and password confirmation are the same.');
		}
	},

});// closes RegView

var UserView = Backbone.View.extend({
	el : '#login',
	// REGISTRATION PROCESS
	// render: function() {
	// 	var nameVal = this.model.get("name");
	// 	var emailVal = this.model.get("email");
	// 	var homeVal = this.model.get("home");
	// }, // closes render
	events: {
		//'click #register_account': 'register_account',
		'click #login_user': 'login_user', 
		'click #update_user': 'update_user',
		'click #my_account': 'my_account',
		'click #logout': 'logout',
	},
	// logout: function() {
	// 	jQuery.post('/logout');
	// 	remove cookie
	// },
	///////////////////// PROC. TO REGISTER NEW USER FROM LANDING PAGE
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
	},
	// my_account: (function() {
	// 	var update_user_template = _.template('<h2>Update Account</h2><label>Name: </label><input type="text" id="nameInput" value={{nameVal}} </input><br /><label>Email: </label><input type="text" id="emailInput" value={{emailVal}} value=""</input><br /><label>Home Location: </label><input type="text" id="homeInput" value={{homeVal}}</input><br /><label>Password: </label><input type="text" id="password" placeholder="change password" value=""</input><br /><label>Password Confirm: </label><input type="text" id="password_confirm" placeholder="re-type password" value=""</input><br /><button type="submit" id="update_user">Update My Account</button>');
	// 	$('#userInfoDiv').html(update_user_template({emailVal: userEmail, nameVal: userName, homeVal: userLocation}));
	// })(),
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
		$('ul#logout-state').toggleClass('hide-nav');
		$('ul#login-state').toggleClass('hide-nav');
		$('.reveal-modal-bg').css('display', 'none');
	}
}); // closes userView

var userModel = new UserModel();
var userView = new UserView({model: userModel});
var regview = new RegView({model: userModel});
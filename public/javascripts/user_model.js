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
	new_user_template :  _.template('<h2>Welcome</h2><p>We have a couple more questions for you so we can make your experience with snapOR more personal.<p><label>Name: </label><input type="text" id="nameInput" placeholder="Who are you?" value=""</input><br /><label>Home Location: </label><input type="text" id="homeInput" placeholder="Where do you live?" value=""</input><br /><button type="submit" id="save">Save Info</button>'),
	user_template : _.template('<h1>Welcome {{nameVal}}<button type="submit" id="update">Update info</button><button type="submit" id="logout">Logout</button>'),
	update_user_template : _.template('<h2>Update</h2><label>Name: </label><input type="text" id="nameInput" placeholder={{nameVal}} value=""</input><br /><label>Email: </label><input type="text" id="emailInput" placeholder={{emailVal}} value=""</input><br /><label>Home Location: </label><input type="text" id="homeInput" placeholder={{homeVal}} value=""</input><br /><label>Password: </label><input type="text" id="password" placeholder="change password" value=""</input><br /><button type="submit" id="save">Update Info</button>'),
	// nameVal : this.model.get("name"),
	// emailVal : this.model.get("email"),
	// homeVal : this.model.get("home"),
	render: function() {
		var nameVal = this.model.get("name");
		var emailVal = this.model.get("email");
		var homeVal = this.model.get("home");
		//this template will appear if the user clicks on the update btn
		// var new_user_tempate = _.tempate('<h2>Welcome</h2><p>We have a couple more questions for you so we can make your experience with snapOR more personal.<p><label>Name: </label><input type="text" id="nameInput" placeholder="Who are you?" value=""</input><br /><label>Home Location: </label><input type="text" id="homeInput" placeholder="Where do you live?" value=""</input><br /><button type="submit" id="save">Save Info</button>');
		//this template will display if 
		// var user_template = _.template('<h1>Welcome {{nameVal}}<button type="submit" id="update">Update info</button><button type="submit" id="logout">Logout</button>');
		//if the user doesn't have property values for name and home location, render the new_user_template
		this.$el.html(this.user_template(this.model.attributes));
		this.input = this.$('.edit');
		return this;
		// if(nameVal === '' && homeVal === ''){
		// 	this.$el.html(
		// 		new_user_template());
		// } else{
		// 	this.$el.html(
		// 		user_template({nameVal : this.model.get("name")}));
		// }
	}, // closes render again
	update: function(){
		var nameVal = this.model.get("name");
		var emailVal = this.model.get("email");
		var homeVal = this.model.get("home");
		// var update_user_template = _.template('<h2>Update</h2><label>Name: </label><input type="text" id="nameInput" placeholder={{nameVal}} value=""</input><br /><label>Email: </label><input type="text" id="emailInput" placeholder={{emailVal}} value=""</input><br /><label>Home Location: </label><input type="text" id="homeInput" placeholder={{homeVal}} value=""</input><br /><label>Password: </label><input type="text" id="password" placeholder="change password" value=""</input><br /><button type="submit" id="save">Update Info</button>');
		this.$el.html(update_user_template());
	},
	save: function() {
		//data before changes made
		var nameVal = this.model.get("name");
		var emailVal = this.model.get("email");
		var homeVal = this.model.get("home");
		//changes made on form
		var nameChanged = this.$el.find("#nameInput");
		var emailChanged = this.$el.find("#emailInput");
		var homeChanged = this.$el.find("#homeInput");

		if(nameVal !== nameChanged){
			this.model.replace(nameVal);
		}
		if(emailVal !== emailChanged){
			this.model.replace(emailVal);
		}
		if(homeVal !== homeChanged){
			this.model.replace(homeVal);
		}
	},
	// initialize: function() {
	// 	this.model.on("change", this.render, this);
	// },
	events: {
		'click #update': "update",
		'click #logout': "logout",
		'click #save': "save"
	} //closes events
}); // closes userView

//example
// var Todo = Backbone.Model.extend({
// 	defaults: {
// 		completed: false
// 	},
// 	initialize: function(){
// 		console.log('this todo model has been initialized');
// 	}
// });
// var todo1 = new Todo();
// console.log(JSON.stringify(todo1));

// var TodoView = Backbone.View.extend({
// 	tagName: 'li',
// 	todoTpl: _.template("an example template"),
// 	render: function(){
// 		this.$el.html(this.todoTpl(this.model.attributes));
// 		this.input = this.$('.edit');
// 		return this;
// 	}
// });
// var todoView = new TodoView();
// console.log(todoView.el);

var userModel1 = new UserModel();
console.log(JSON.stringify(userModel1));

var userView = new UserView({model: userModel1});
console.log(userView.el);

// var userModel, userView;

// $(document).ready(function(){
// 	console.log("tests");
// 	userModel = new UserModel();
// 	userView = new UserView({model: userModel});
// 	userView.render();
// 	$("#userDiv").append(userView.$el);
// });
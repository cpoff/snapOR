var config = require('./config.js');
var db = require('orchestrate')(config.dbKey);
var uuid = require('uuid');

//store email, name, home location, array of favorite parks

var email = document.getElementById();
var name = document.getElementById();
var home_location = document.getElementById();
var favs = [];
var user_key = uuid.v4();

//set a value and allow the serer to generate a key
db.post('snap', {
	'name': name,
	'email': email,
	'home location': home_location,
	'favorite parks': favs
})
.then(function(result){
	console.log('user created');
})
.fail(function(err){})


//set the values for a new user
db.put('snap', user_key, {
	'name': name,
	'email': email,
	'home location': home_location,
	'favorite parks': favs
})
.then(function(result){
	console.log('user created');
})
.fail(function(err){})

//update the values
db.merge('snap', user_key, {
	'name': name,
	'email': email,
	'home location': home_location,
	'favorite parks': favs
})

//remove the user data
db.remove('snap', user_key, true)
.then(function(result){
	console.log("user deleted");
}).fail({})

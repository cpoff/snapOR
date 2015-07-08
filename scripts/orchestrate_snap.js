var config = require('./config.js');
var db = require('orchestrate')(config.dbKey);

//store email, name, home location, array of favorite parks

var email;
var name;
var home_location;
var favs = [];

db.put('snap', 'key', {
	'name': name,
	'email': email,
	'home location': home_location,
	'favorite parks': favs
})
.then(function(result){
	console.log('user created');
})
.fail(function(err){})
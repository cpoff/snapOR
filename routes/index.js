var express = require('express');
var router = express.Router();
if (!process.env.heroku) var config = require('../config.js');
var db = require('orchestrate')(process.env.dbKey || config.dbKey);
var uuid = require('uuid');
var pwd = require('pwd');
var app = require('../app');

/* HOME PAGE */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'snapOR' });
});

/* USER PAGE */
router.get('/user', function(req, res) {
	res.render('user');
});

/* MISTAKE PAGE */
router.get('/mistake', function(req, res) {
	res.render('mistake');
});

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	console.log('email test');
	console.log(re.test(email));
	return re.test(email);
}

//res.cookie

/* NEW USER REGISTRATION */
router.post('/begin_regis', function(req, res){
	console.log("bananas");
	console.log(req.body);
	var email = req.body.email;
	var password = req.body.password;
	//var password_confirm = req.body.password_confirm;
	var user_key = uuid.v4();
	var database = app.get('database');
	//console.log(db.search);
	db.search('snap', 'value.email:'+email)
	.then(function(result) {
		console.log("search result");
		console.log(result.body);
		//console.log('email: ', email)
		if (result.body.count !== 0) {
			res.send ({
				error: "Email has already been used to register."});
		} 
		// else if(!validateEmail(email)){
		// 	res.render ('mistake', {
		// 		error: "Looks like you didn't add a valid email.",
		// 		text: "Please click here to return to the home page: "});
		// } 
		else {
				//The user's registration info
				var raw = {email: 'email', password: 'password'};
				//The info that gets stored
				var stored = {email : 'email', salt:'', hash:''};

				function register(raw) {
					//Create and store encrypted user record:
					pwd.hash(raw.password, function(err,salt,hash) {
						stored = {email:raw.email, salt:salt, hash:hash};
						db.put('snap', user_key, {
							'email': stored.email,
							// 'password': password
							'salt': stored.salt,
							'hash': stored.hash
						})// closes db.put
						.then(function(){
							console.log('user created');
							console.log("db push");
							//console.log(stored);
							res.end();
						})// closes .then
						.fail(function(err){});
					});// closes pwd.hash
				}// closes function register(raw)

				register(raw);
		}// closes else
	});// closes initial db query for existing email
});// closes router.post

// /* ROUTE TO SAVE NEW USER INFO TO ORCHESTRATE */
// router.post('/save_new_user', function(req, res) {
// 	var name = req.body.name;
// 	var hometown = req.body.hometown;
// 	var email = req.body.email; // email field auto-populates with email entered in initial registration modal
// 	var database = app.get('database');

// 	//db search for email value
// 	db.search('snap', 'value.email:'+email)
// 	.then(function(result) {
// 		var currentUser = result.body.results[0].value;
// 		if (result.body.count === 0) {
// 			console.log("whoops")
// 			res.render('mistake', {
// 				error: 'Whoops!',
// 				text: "Let's try that again, shall we?"
// 			});
// 		} else {
// 			db.put('snap', user_key, {
// 				'name': name,
// 				'hometown': hometown
// 			})// closes db.put
// 			.then(function() {
// 				console.log('User info pushed to Orchestrate');
// 				res.end();
// 			})// closes .then
// 			.fail(function(err){});
// 		}// closes else
// });// closes router.post for /save_new_user

/* ROUTE FOR EXISTING USER LOGIN */  
router.post('/user', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	var database = app.get('database');
	db.search('snap', 'value.email:'+email)
	.then(function(result) {
		var currentUser = result.body.results[0].value;
		if (result.body.count === 0) {
			console.log('search results:');
			res.render ('mistake', {
				error: 'We did not find an account with that email address.',
				text: 'Please try again.'
			});

		} else {
			authenticate();
			function authenticate(){
				console.log(currentUser);
				console.log("attempt to auth");
				pwd.hash(password, currentUser.salt, function(err, hash){
					console.log(currentUser.hash);
					console.log(hash);
					if(currentUser.hash===hash){
						console.log("success");
						res.redirect('/user')
					} else {
						res.render('mistake', {
							error: "It looks like your password was incorrect.",
							text: "Please click here to return to the login page: "
						});// closes response.render
					}// closes else
				});// closes pwd.hash
			}// closes function authenticate
		}// closes else
	});// closes .then
});// closes login router
//check for change
module.exports = router;

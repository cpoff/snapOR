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

/* LOGGED-IN NAV */
router.get('/logged-in-nav', function(req, res) {
	res.render('logged-in-nav');
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
	console.log("req.body");
	console.log(req.body);
	console.log("req.body.name");
	console.log(req.body.name);
	console.log('apples');
	var email = req.body.email;
	var name = req.body.name;
	var hometown = req.body.hometown;
	var password = req.body.password;
	console.log("name");
	console.log(name);
	//var password_confirm = req.body.password_confirm;
	var user_key = uuid.v4();
	var database = app.get('database');
	//console.log(db.search);
	db.search('snap', 'value.email:'+email)
	.then(function(result) {
		//console.log('email: ', email)
		if (result.body.count !== 0) {
			console.log("search result");
			console.log(result.body.count);
			res.end();

			// res.render('mistake', {
			// 	error: 'Here is the error',
			// 	text: 'Here is the text'
			// });

			// var message = {error: "Email has already been used to register."};
			// res.send(message);
		} 
		// else if(!validateEmail(email)){
		// 	res.render ('mistake', {
		// 		error: "Looks like you didn't add a valid email.",
		// 		text: "Please click here to return to the home page: "});
		// } 
		else {
			//The user's registration info
			var raw = {email: email, name: name, hometown: hometown, password: password};
			//The info that gets stored
			var stored = {email: email, name: name, hometown: hometown, salt:'', hash:''};
			var register = function (raw) {
				//Create and store encrypted user record:
				pwd.hash(raw.password, function(err,salt,hash) {
					stored = {email: raw.email, name: raw.name, hometown: raw.hometown, salt:salt, hash:hash};
					console.log('stored info');
					console.log(stored);
					db.put('snap', user_key, {
						'email': stored.email,
						'name': stored.name,
						'hometown': stored.hometown,
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
			};// closes function register(raw)

			register(raw);
		}// closes else
	});// closes initial db query for existing email
});// closes router.post

/* ROUTE FOR EXISTING USER LOGIN */  
router.post('/user', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	var database = app.get('database');
	var currentUser;
	console.log('exis user login');
	db.search('snap', 'value.email:'+email)
	.then(function(result) {
		//console.log(result.body.results[0].value)
		console.log(result.body.count)
		currentUser = result.body.results[0].value;
		if (result.body.count === 0) {
			console.log('search results:');
			console.log(result.body.count);
			res.render ('mistake', {
				error: 'We did not find an account with that email address.',
				text: 'Please try again.'
			});
		} else {
			var authenticate = function(){
				console.log(currentUser)
				console.log("attempt to auth")
				pwd.hash(password, currentUser.salt, function(err, hash){
					console.log(currentUser.hash);
					console.log(hash);
					if(currentUser.hash===hash){
						console.log("success");
						//res.redirect('/');
						//res.end();
						res.send('hello');
					} else {
						res.render('mistake', {
							error: "It looks like your password was incorrect.",
							text: "Please click here to return to the login page: "
						});// closes response.render
					}// closes else
				});// closes pwd.hash
			};// closes function authenticate
			authenticate();
		}// closes else
	});// closes .then
});// closes login router

// /* ROUTE FOR UPDATING EXISTING USER INFO */  
// router.post('/update_user_info', function(req, res) {
// 	console.log('beginning update');
// 	console.log(req.body);
// 	var email = req.body.email;
// 	var name = req.body.name;
// 	var hometown = req.body.hometown;
// 	var password = req.body.password;
// 	var database = app.get('database');
	
// 	dp.merge('snap', user_key, {
// 		'email': stored.email,
// 		'salt': stored.salt,
// 		'hash': stored.hash,
// 		'name': stored.name,
// 		'hometown': stored.hometown
// 	})// db.put
// 	.then(function() {
// 		console.log('user updated');
// 		res.end();
// 	})// then
// 	.fail(function(err){});
// });// closes route to update exis. user info
 
router.post('/update', function(req, res) {
	console.log('update route');
	res.end();
});


module.exports = router;

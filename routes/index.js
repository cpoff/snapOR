var express = require('express');
var router = express.Router();
if (!process.env.heroku) var config = require('../config.js');
var db = require('orchestrate')(process.env.dbKey || config.dbKey);
var uuid = require('uuid');
var pass = require('pwd');
var app = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'snapOR' });
});

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	console.log('email test');
	console.log(re.test(email));
	return re.test(email);
}

//res.cookie

/*NEW USER REGISTRATION*/
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
			//if (password === password_confirm){
				//The user's registration info
				var raw = {email: email, password: password};
				//The info that gets stored
				var stored = {email : 'email', salt:'', hash:''};

				function register(raw) {
					//Create and store encrypted user record:
					pass.hash(raw.password, function(err,salt,hash) {
						stored = {email:raw.email, salt:salt, hash:hash};
						//res.render('/complete_regis');
						db.put('snap', user_key, {
							'email': stored.email,
							// 'password': password
							'salt': stored.salt,
							'hash': stored.hash
						})// closes db.put
						.then(function(){
							console.log('user created');
							console.log("db push");
							console.log(stored);
							res.end();
						})// closes .then
						.fail(function(err){});
					});// closes pass.hash
				}// closes function register(raw)

				register(raw);
			//}// closes password_confirm
		}// closes else
	});// closes initial db query for existing email
});// closes router.post

//I THINK THIS IS UNNECESSARY
// router.get('/user', function(req, res) {
// 	res.render('user');
// });// closes registration router

/*ROUTE FOR EXISTING USER LOGIN*/  
router.post('/login', function(req, res) { //this should be a get, it's requesting data from the server, if input matches the data, then user is redirected
	var email = req.body.email;
	var password = req.body.password;
	var database = app.get('database');
	console.log('db search');
	db.search('snap', 'value.email:'+email)
	.then(function(result) {
		if (result.body.count === 0) {
			console.log('search results:')
			console.log(result.body)
			res.render ('mistake', {
				error: 'We did not find an account with that email address.',
				text: 'Please try again.'
			});

		} else {
			function authenticate(attempt){
				pass.hash(attempt.password, stored.salt, function(err, hash){
					if(hash===stored.hash){
						console.log("success");
						response.render('user')
					} else {
						response.render('mistake', {
							error: "It looks like your password was incorrect.",
							text: "Please click here to return to the login page: "
						});// closes response.render
					}// closes else
				});// closes pass.hash
			}// closes function authenticate
		}// closes else
	});// closes .then
});// closes login router
//check for change
module.exports = router;

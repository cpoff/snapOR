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

/*NEW USER REGISTRATION*/
router.post('/user', function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	var password_confirm = req.body.password_confirm;
	//var user_key = uuid.v4();
	var database = app.get('database');
	console.log(db.search);
	db.search('snap', 'value.email:""')
	.then(function(array) {
		if (array.length > 0) {
			response.render ('error', {
				error: 'There is already an account associated with this email.',
				text: 'Please use a unique email address, or click "Forgot Password"'
			});
		} else {
			if (password === password_confirm){
				//The user's registration info
				var raw = {email: 'email', password: 'password'};
				//The info that gets stored
				var stored = {email : 'email', salt:'', hash:''};
				
				function register(raw) {
					//Create and store encrypted user record:
					pass.hash(raw.password, function(err,salt,hash) {
						stored = {name:raw.email, salt:salt, hash:hash};
						console.log(stored);
					})// closes pass.hash
				}// closes function register(raw)

				register(raw);

				db.put('snap', user_key, {
					'email': stored.email,
					// 'password': password
					'salt': stored.salt,
					'hash': stored.hash
				})// closes db.put
				.then(function(){
					console.log('user created');
					// console.log(user_key);
					console.log(stored);
					res.redirect('/user');
				})// closes .then
				.fail(function(err){})
			}// closes password_confirm
		}// closes else
	});// closes initial db query for existing email
});// closes router.post
//put user data
//delete user

router.get('/user', function(req, res) {
	console.log("bananas");
	res.render('user');
});// closes registration router

/*ROUTE FOR EXISTING USER LOGIN*/
router.post('/login', function(req, res) {

	var username = request.body.username;
	var password = request.body.password;
	var database = app.get('database');

	// translate from regis to login
	var database = app.get('database');
	console.log(db.search);
	db.search('snap', 'value.email:""')
	.then(function(array) {
		if (array.length > 0) {
			response.render ('error', {
				error: 'There is already an account associated with this email.',
				text: 'Please use a unique email address, or click "Forgot Password"'
			});

		} else {
			function authenticate(attempt){
				pass.hash(attempt.password, stored.salt, function(err, hash){
					if(hash===stored.hash){
						console.log("success");
					} else {
						response.render('/error', {
							error: "It looks like your password was incorrect.",
							text: "Please click here to return to the login page: "
						})// closes response.render
					}// closes else
				});// closes pass.hash
			}// closes function authenticate
		}// closes else
});// closes login router

module.exports = router;
var express = require('express');
var router = express.Router();
if (!process.env.heroku) var config = require('../config.js');
var db = require('orchestrate')(process.env.dbKey || config.dbKey);
var uuid = require('uuid');
var app = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'snapOR' });
});

//post user registration data
router.post('/user', function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	var password_confirm = req.body.password_confirm;
	var user_key = uuid.v4();
	database = app.get('database');
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
				db.put('snap', user_key, {
					'email': email,
					'password': password
				})// closes db.put
				.then(function(){
					console.log('user created');
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
})

module.exports = router;
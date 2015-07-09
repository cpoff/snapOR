var express = require('express');
var router = express.Router();
var config = require('../config.js');
var db = require('orchestrate')(config.dbKey);
var uuid = require('uuid');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'snapOR' });
});

module.exports = router;


//post user registration data
router.post('/register', function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	var password_confirm = req.body.password_confirm;
	var user_key = uuid.v4();
	console.log(user_key);
	if (password === password_confirm){
		db.put('snap', user_key, {
			'email': email,
			'password': password
		})
		.then(function(result){
			console.log('user created');
		})
		.fail(function(err){})
	}
});
//put user data
//delete user
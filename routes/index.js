var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SnapOR' });
});

module.exports = router;


//post user registration data
//put user data
//delete user
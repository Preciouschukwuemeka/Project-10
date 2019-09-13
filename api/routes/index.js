var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Welcome to Precious\'s REST API Treehouse Project 9!' });
});

module.exports = router;


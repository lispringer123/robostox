var express = require('express');
var router = express.Router();
var exphbs = require('express-handlebars');


/* GET home page. */ //set handlebar routes
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Robo$tox'});
  //res.render('layout');
});






module.exports = router;

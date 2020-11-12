var express = require('express');
var router = express.Router();
var exphbs = require('express-handlebars');

//set handlebars middleware
router.engine('handlebars', exphbs());
router.set('view engine', 'handlebars');


//Serves static files (we need it to import a css file)
router.use(express.static('public'))


/* GET home page. */ //set handlebar routes
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Robo$tox'});
  //res.render('layout');
});






module.exports = router;

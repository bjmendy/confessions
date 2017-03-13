//main variables for the page to show
var express		= require('express'),
	app			= express(),
	server		= require('http').createServer(app);
var bodyParser	= require('body-parser');
var path		= require('path');
var mongoose	= require('mongoose');
//for the mongodb
require('./db/db');
//sets the static up, allowing the page to connect anything in the public folder
app.use(express.static(path.join(__dirname, 'public')));
//sets what you are seeing, and the engine to handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
	res.render('confessionsPage')
})
//this is where the server is being shown 
server.listen(3000, function() {
	console.log('yup, server is listening on port 3000');
})
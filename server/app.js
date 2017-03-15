//main variables for the page to show
var express		= require('express'),
	app			= express(),
	server		= require('http').createServer(app);
var bodyParser	= require('body-parser');
var path		= require('path');
var mongoose	= require('mongoose');
var session 	= require('express-session');
//for the mongodb
require('./db/db');
//sets the static up, allowing the page to connect anything in the public folder
app.use(express.static(path.join(__dirname, 'public')));
//sets what you are seeing, and the engine to handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
	secret: " this is our secret salt",
	resave: false,
	saveUninitialized: true,
	cookie: {secure: false}
}))
<<<<<<< HEAD

// express framework node.js syntax
// var authenticateRoute = function(request, response, next){
// 	if(request.originalUrl === '/' || request.originalUrl === '/'){
// 		next()
// 	}
// 		else {
// 			if(!request.session.loggedIn){
// 				response.redirect('/confessions')
// 			}else{
// 				next()
// 			}
// 		}
// 	}

// app.use(authenticateRoute); //set this before controller!!!! It will run first!!!
=======
app.get('/confessions', function(req, res){
	res.render('confessionsPage')
})
//express framework node.js syntax
var authenticateRoute = function(request, response, next){
	if(request.originalUrl === '/' || request.originalUrl === '/'){
		next()
	}
		else {
			if(!request.session.loggedIn){
				response.redirect('/confessions')
			}else{
				next()
			}
		}
	}

app.use(authenticateRoute); //set this before controller!!!! It will run first!!!
>>>>>>> 218c5a08eaaa4f49dc56b5d95747009dfd211b71

var UserController = require('./controllers/UserController');
var ConfessionsController = require('./controllers/ConfessionsController');

<<<<<<< HEAD
 app.use('/confessions', ConfessionsController);
=======

// app.get('/', function(req, res){
// 	res.render('registerLogin')
// }) //this will grab the registerLogin page when the address is made

>>>>>>> 218c5a08eaaa4f49dc56b5d95747009dfd211b71
app.use('/', UserController);


//this is where the server is being shown 
server.listen(3000, function(){
	console.log('yup, server is listening on port 3000');
});
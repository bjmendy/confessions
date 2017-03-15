var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var bcrypt = require('bcryptjs');
var UserController = require('../controllers/UserController.js');
var ConfessionsController = require('../controllers/ConfessionsController.js');

//app.use(/user) this denotes that every route in this controller starts with /user!!!



router.post('/user/login', function(request, response){
	// var user = new User({username: request.body.username, password: request.body.password});
	// user.save();

	// ////////////
User.findOne({username: request.body.username}), function(error, user){
	if (user){

		bcypt.compare(password, user.password, function(error, match){ //make an object
			//this method returns true or false
			//true the passwords match
			if(match){
				request.session.username = user.username
				request.session.userId = user.id 
				request.session.loggedIn = true
				response.redirect('/confessions')

			}else{
				response.render('/user/login', {message: 'username was taken!'})
			}
			})
		}
	}
})


router.get('/logout', function(request, response){
	request.session.destroy(function(error){
		response.redirect('/');
	})
});



//registration
// router.get('/', function(request, response){
//   response.render('registerLogin', {})
// });


router.post('/user/register', function(request, response){
	console.log(request.body);

	router.get('/', function(request, response){
// CRYPTION

bcrypt.genSalt(10, function(error, salt){
	bcrypt.hash(request.body.password, salt, function(error, hash){
		var hashedPasswordObject = {};

		hashedPasswordObject.username = request.body.username;
		hashedPasswordObject.password = hash;



		User.create(hashedPasswordObject, function(error, user){
			if(user){
				request.session.username = user.username;
				request.session.userId = user.id;
				request.session.loggedIn = true;
				response.redirect('/confessions')
			
			}else{
				response.redirect('/')
			}
			})
		})
	})
})

	User.create(request.body, function(error, user){
		if(user){
			request.session.username = user.username
			request.session.userId = user.id
			request.session.loggedIn = true

			console.log(request.body)

			response.redirect('/confessions')

		}else{
			response.render('/user/register', {message: "username not found"})
		}
		})
	})

router.get('/', function(request, response){
  response.render('registerLogin', {})
});


module.exports = router;


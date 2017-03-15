var express	= require('express');
var router 	= express.Router();
var User 	= require('../models/User.js');
var bcrypt 	= require('bcryptjs');

//app.use(/) this denotes that every route in this controller starts with /!!!

router.get('/login', function(request, response) {
	console.log(request.session);
  	response.render('registerLogin', {});
});

router.get('/register', function(request, response) {
	console.log(request.session);
  	response.render('registerLogin', {notRegistered: true});
});

router.post('/login', function(request, response) {
	console.log(request.body);
	var password = request.body.password;

	User.findOne({username: request.body.username}, function(error, user) {
		if (user) {
			bcrypt.compare(password, user.password, function(error, match) {
				// this method returns true or false
				if (match) {
					request.session.username = user.username;
					request.session.userId = user.id;
					request.session.loggedIn = true;

					response.redirect('/confessions');  // successful login
				}
				else {
					console.log('redirect login hit');
					response.redirect('/user/login');
				}
			})
		}
		else {
			console.log('redirect register hit');
			response.redirect('/user/register');
		}
	})
})

router.post('/register', function(request, response) {
	console.log(request.body);
	User.findOne({username: request.body.username}, function(error, user) {
		if (!user) {
			bcrypt.genSalt(10, function(error, salt) {
				bcrypt.hash(request.body.password, salt, function(error, hash) {
					var hashedPasswordObject = {};

					hashedPasswordObject.username = request.body.username;
					hashedPasswordObject.password = hash;

					User.create(hashedPasswordObject, function(error, user) {
						if (user) {
							request.session.username	= user.username;
							request.session.userId		= user.id;
							request.session.loggedIn	= true;

							response.redirect('/confessions');
						}
						else {
							console.log(error);
							response.redirect('/user/login');
						}
					})
				})
			})
		}
		else {
			response.render('registerLogin', {message: 'Sorry, that username is taken'});
		}
	})
})

router.get('/logout', function(request, response) {
	request.session.destroy(function(error) {
		response.redirect('/user/login');
	})
});

module.exports = router;


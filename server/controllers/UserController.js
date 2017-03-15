var express	= require('express');
var router 	= express.Router();
var User 	= require('../models/User.js');
var bcrypt 	= require('bcryptjs');

//app.use(/) this denotes that every route in this controller starts with /!!!

<<<<<<< HEAD


router.post('/user/login', function(request, response){
	var loginUsername = request.body.username;
User.findOne({username: request.body.username}), function(error, user){
	if (user){

		bcypt.compare(password, user.password, function(error, match){
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
=======
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
					response.redirect('/login');
				}
>>>>>>> login
			})
		}
		else {
			console.log('redirect register hit');
			response.redirect('/register');
		}
	})
})

<<<<<<< HEAD

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
=======
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
							response.redirect('/login');
						}
					})
				})
>>>>>>> login
			})
		}
		else {
			response.render('registerLogin', {message: 'Sorry, that username is taken'});
		}
	})
})

<<<<<<< HEAD
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


=======
router.get('/logout', function(request, response) {
	request.session.destroy(function(error) {
		response.redirect('/login');
	})
});

>>>>>>> login
module.exports = router;


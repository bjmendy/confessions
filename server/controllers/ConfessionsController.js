var express = require('express');
var router = express.Router();
var Confession = require('../models/Confession.js');
var User = require('../models/User.js');

router.get('/', function(request, response){
	console.log('get section of ConfessionController hit');

	var username = request.session.username;

	User.findOne({username: username}, function(error, myName) {
		if (!error) {

			var name = myName.firstName + ' ' + myName.lastName;

			Confession.find(function(error, confessions){
				if (!error) {
					Confession.find({username: username}, function(error, myConfessions){
						if (!error) {
							response.render('confessionsPage', {myName: name, myConfessionArray: myConfessions, confessionArray: confessions});
						}
						else {
							console.log(error);
						}
					})
				}
				else {
					console.log(error);
				}
			});

		}
		else {
			console.log(error);
		}
	})
}); 

router.post('/', function(request, response){
	console.log('confessions post');
	console.log(request.session.username);
	console.log(request.body.confessionBox);
	var confession = new Confession({username: request.session.username, confessionText: request.body.confessionBox});
	confession.save(function(error){
		if (error) {
			console.log(error);
		}else{
			console.log('meow');
		}
	});
	response.redirect("/confessions");
});

router.patch('/:id', function(request, response){
	var id = request.params.id;
	var newInfo = request.body;

	Confession.findById(id, function(err, confession){
		confession.name = newInfo.username;

			confession.save();
			response.redirect('/');
	})
});

module.exports = router;
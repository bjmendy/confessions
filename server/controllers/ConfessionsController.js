var express = require('express');
var router = express.Router();
var Confession = require('../models/Confession.js');
var User = require('../models/User.js');
var ObjectID = require('mongodb');

router.get('/', function(request, response){
	console.log('get section of ConfessionController hit');

	var username = request.session.username;
	var cutoff = new Date(Date.now() - 20000);

	User.findOne({username: username}, function(error, myName) {
		if (!error) {

			var name = myName.firstName + ' ' + myName.lastName;

			Confession.find({ _id: { $gt: objectIdWithTimestamp(cutoff) }}, function(error, confessions){
				if (!error) {
					Confession.find({username: username, _id: { $gt: objectIdWithTimestamp(cutoff) }}, function(error, myConfessions){
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

	function objectIdWithTimestamp(timestamp) {
	    // Convert string date to Date object (otherwise assume timestamp is a date)
	    if (typeof(timestamp) == 'string') {
	        timestamp = new Date(timestamp);
	    }

	    // Convert date object to hex seconds since Unix epoch
	    var hexSeconds = Math.floor(timestamp/1000).toString(16);

	    // Create an ObjectId with that hex timestamp
	    var constructedObjectId = ObjectID.ObjectId(hexSeconds + "0000000000000000");

	    return constructedObjectId
	}

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
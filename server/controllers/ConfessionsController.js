var express = require('express');
var router = express.Router();
var Confession = require('../models/Confession.js');

router.get('/', function(request, response){
	console.log('get section of ConfessionController hit');
	//response.send('Confession Page is Here!');
	Confession.find(function(error, confessions){
		console.log(confessions);
		//searches the database
	//response.render('confessionsPage', {confessionArray: confessions});
	});
	//console.log('confessions');
	response.render('confessionsPage');
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
var express = require('express');
var router = express.Router();
var Confession = require('../models/Confession.js');

router.get('/confessions', function(request, response){
	console.log(request.session)
	Confession.find(function(error, confessions){
		console.log(confessions);
		//searches the database
	response.render('confessions', {confessionArray: confessions});
	});
}); 

router.post('/', function(request, response){
	var confession = new Confession({name: request.body.username, confession: request.body.confession});
	confession.save();
	response.redirect("/confessions");

});

router.patch('/:id', function(request, response){
var id = request.params.id;
var newInfo = request.body;

Confession.findById(id, function(err, confession){
	confession.name = newInfo.username;

		confession.save();
		response.redirect('/confessions');
})
	});

module.exports = router;
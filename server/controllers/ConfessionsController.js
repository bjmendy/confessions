var express = require('express');
var router = express.Router();
var Confession = require('../models/Confession.js');

router.get('/', function(request, response){
	console.log(request.session)
	//response.send('Confession Page is Here!');
	// Confession.find(function(error, confessions){
	// 	console.log(confessions);
	// 	//searches the database
	// response.render('confessions', {confessionArray: confessions});
	// });
	response.render('confessionsPage');
}); 

router.post('/', function(request, response){
	var confession = new Confession({name: request.body.username, confession: request.body.confession});
	confession.save();
	response.redirect("/");

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
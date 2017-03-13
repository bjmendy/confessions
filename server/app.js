var express		= require('express'),
	app			= express(),
	server		= require('http').createServer(app);
var bodyParser	= require('body-parser');
var path		= require('path');
var mongoose	= require('mongoose');

require('./db/db');

server.listen(3000, function() {
	console.log('yup, server is listening on port 3000');
})
var mongoose = require('mongoose');

var ConfessionSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	confessionText: String,
	category: String,
	includeName: Boolean,
	username: String
})

module.exports = mongoose.model('Confession', ConfessionSchema);
const db = require('./db.js');

module.exports.handleSignup = (email, password) => {
	// checking if email already exists
	db.saveUser({email, password});
	// sending welcome email
} 
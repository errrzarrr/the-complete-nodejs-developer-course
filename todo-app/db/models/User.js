var {mongoose, COLLECTIONS} = require('../dbconfig');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const SALT = process.env.SALT || 'G:a4j.';
const ROUNDS = 12;

var UserSchema = new mongoose.Schema({
	name: {type:String, required:true, minLength:1, trim:true}
	,age: {type:Number, default:null}
	,location: {type:String, default:null, trim:true}
	,email:{type:String, required:true, minLength:1, trim:true
		,unique:true
		,lowercase:true
		,validate: {
			validator: (value) => validator.isEmail(value)
			,message: '{VALUE} is not a valid email'
		}
	}
	,password: {
		type:String
		,required:true
		,minLength:6
	}
	,tokens: [{
		access: {
			type: String
			,required:true
		}
		,token: {
			type: String
			,required:true
		}
	}]
});
 
// use a traditional function declaration, because arrows functions dont bind 'this' keyword
UserSchema.methods.generateAuthToken = function() {
	// instance method for the individual document, with lowercase name
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, SALT).toString();
	user.tokens = user.tokens.concat( [{access,token}] );
	// use above instead of user.tokens.push({access, token}), because has compatibility issues w/some mongo versions

	return user.save().then(() => {return token});
};

// overrides mongo's toJSON function
UserSchema.methods.toJSON = function() {
	// instance method
	var user = this;
	return _.pick(user.toObject(), ['_id','name','age','location','email']);
};

UserSchema.statics.findByToken = function(tkn) {
	// Model method, with uppercase first letter 
	var User = this;
	var decoded;

	try {
		decoded = jwt.verify(tkn, SALT);	
	} catch (error) {
		return Promise.reject('some was missing in your auth');
	}
	// returns a Promise
	return User.findOne({
		_id: decoded._id
		,'tokens.token': tkn
		,'tokens.access': 'auth'
	});

};

UserSchema.statics.findByCredentials = function(email, password) {
	var User = this;
	return User.findOne({email}).then((user) => {
		if(!user)
			return Promise.reject();

		// Since bcrypt only accepts call back, 
		// this way is transformed into a Promise --so It can be used with then() & catch()
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, success) => {
				success ? resolve(user) : reject();
			 });
		});
	});
};

UserSchema.methods.removeToken = function(token) {
	var user = this;
	return user.update(	{ $pull: { tokens: {token} } } );
};

// Mongoose Middleware (also called pre and post hooks) are functions called before or after certain events occur.
UserSchema.pre('save', function(next) {
	var user = this;
	if( user.isModified('password') )
	    bcrypt.genSalt(ROUNDS, (err, salt) => {
    		bcrypt.hash(user.password, salt, (err, hashedPass) => {
				user.password = hashedPass;
				next();
			});
		});
	else 
		next();
});

var User = 
	mongoose.model(COLLECTIONS.users, UserSchema);

 module.exports.User = User;
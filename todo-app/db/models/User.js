var {mongoose, COLLECTIONS} = require('../dbconfig');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const SALT = process.env.SALT || 'G:a4j.';

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

}

 var User = 
	mongoose.model(COLLECTIONS.users, UserSchema);

 module.exports.User = User;
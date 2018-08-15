var {mongoose, COLLECTIONS} = require('../dbconfig');
const validator = require('validator');

var UsersSchema = new mongoose.Schema({
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
 


 var User = 
	mongoose.model(COLLECTIONS.users, UsersSchema);

 module.exports.User = User;
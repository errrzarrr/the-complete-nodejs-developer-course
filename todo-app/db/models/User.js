var {mongoose, COLLECTIONS} = require('../dbconfig');

var UsersSchema = new mongoose.Schema({
    name: {type:String, required:true, minLength:1, trim:true}
    ,age: {type:Number, default:null}
    ,location: {type:String, default:null, trim:true}
    ,email:{type:String, required:true, minLength:1, trim:true}
});
 
 var User = 
    mongoose.model(COLLECTIONS.users, UsersSchema);

 module.exports.User = User;
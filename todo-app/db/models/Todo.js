var {mongoose, COLLECTIONS} = require('../dbconfig');

var TodosSchema = new mongoose.Schema({
    text: {type:String, required:true, minLength:1, trim:true}
    ,completed: {type:Boolean, default:false} 
    ,completedAt: {type:Number, default:null}
 });
 
 var Todo = 
    mongoose.model(COLLECTIONS.todos, TodosSchema);

 module.exports.Todo = Todo;
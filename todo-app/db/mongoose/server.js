const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/todoApp', { useNewUrlParser: true });

const SCHEMAS = {
	todo: new mongoose.Schema({
	   text: {type:String, required:true, minLength:1, trim:true}
	   ,completed: {type:Boolean, default:false} 
	   ,completedAt: {type:Number, default:null}
	})
	,user: new mongoose.Schema({
		name: {type:String, required:true, minLength:1, trim:true}
		,age: {type:Number, default:null}
		,location: {type:String, default:null, trim:true}
		,email:{type:String, required:true, minLength:1, trim:true}
	})
};
var Todo = mongoose.model('todos', SCHEMAS.todo);
var User = mongoose.model('users', SCHEMAS.user);

let newTodo = new Todo({text: ' todo #5  '});
let newUser = new User({name:'Marie', email:'marie@freecity.com', location:'Free Individual Street #120'});

newTodo.save()
	.then( (doc) => console.log('New todo saved', doc) )
	.catch( (error) => console.error(`This ${error.name} happened while trying to save new todo\n:${error.message}`) ); 
  

newUser.save()
	.then( (doc) => console.log('New user saved', doc) )
	.catch( (error) => console.error(`'This ${error.name} happened while trying to save new user:\n:${error.message}`) ); 

	
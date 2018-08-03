const mongoose = require('mongoose');
const PORT = 27017;
const URL = `mongodb://localhost:${PORT}`;
const DB = 'todoApp';

var SCHEMAS = {
	todos: new mongoose.Schema({
	   text: {type:String, required:true, minLength:1, trim:true}
	   ,completed: {type:Boolean, default:false} 
	   ,completedAt: {type:Number, default:null}
	})
	,users: new mongoose.Schema({
		name: {type:String, required:true, minLength:1, trim:true}
		,age: {type:Number, default:null}
		,location: {type:String, default:null, trim:true}
		,email:{type:String, required:true, minLength:1, trim:true}
	})
};

const COLLECTIONS = {
	todos: 'todos'
	,users:'users'
};

var Todo = mongoose.model(COLLECTIONS.todos, SCHEMAS.todos)
var User = mongoose.model(COLLECTIONS.users, SCHEMAS.users)
mongoose.Promise = global.Promise;
mongoose.connect(`${URL}/${DB}`, { useNewUrlParser: true });

module.exports.URL = URL;
module.exports.DB = DB;
module.exports.SCHEMAS = SCHEMAS;
module.exports.COLLECTIONS = COLLECTIONS;
module.exports.MODELS = { Todo, User };
module.exports.connected = () => console.log('Connected to MongoDB server');
module.exports.unableToConnect = () => console.log('Unable to connect to MongoDB server');
module.exports.unableFetchTodo = (err) => console.log('unable to fetch todo(s)', err);
module.exports.unableInsertTodo = (err) => console.log(`unable to insert todo(s)`, err);
module.exports.unableInsertUser = (err) => console.log(`unable to insert user(s)`, err);
module.exports.unableUpdateUser = (err) => console.log('unable to update user(s)', err);
module.exports.unableToDeleteTodo = (err) => console.log('unable to delete todo(s)', err)
module.exports.unableToDeleteUser = (err) => console.log('unable to delete user(s)', err)
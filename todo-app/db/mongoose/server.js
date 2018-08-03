const config = require('../dbconfig.js');

var Todo = config.MODELS.Todo;
var User = config.MODELS.User;

let newTodo = new Todo({text: ' todo for Friday #2 '});
let newUser = new User({name:'Ludwig', email:'LvM@freecity.com', location:'Austrian School Ave. #76'});

newTodo.save()
	.then( (doc) => console.log('New todo saved', doc) )
	.catch( (error) => console.error(`This ${error.name} happened while trying to save new todo\n:${error.message}`) ); 

newUser.save()
	.then( (doc) => console.log('New user saved', doc) )
	.catch( (error) => console.error(`'This ${error.name} happened while trying to save new user:\n:${error.message}`) ); 

	
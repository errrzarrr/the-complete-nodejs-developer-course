const config = require('../dbconfig');
var {Todo} = require('../models/Todo');
var {User} = require('../models/User');

let newTodo = new Todo({text: ' todo for Friday #2 '});
let newUser = new User({name:'Ludwig', email:'LvM@freecity.com', location:'Austrian School Ave. #76'});

newTodo.save()
	.then( (doc) => config.newDocSaved(config.COLLECTIONS.todos, doc) )
	.catch( (error) => console.error(`This ${error.name} happened while trying to save new todo\n:${error.message}`) ); 

newUser.save()
	.then( (doc) => config.newDocSaved(config.COLLECTIONS.users, doc) )
	.catch( (error) => console.error(`'This ${error.name} happened while trying to save new user:\n:${error.message}`) ); 

	
let express = require('express');
let app = express();
const PORT = process.env.PORT || 3000;
require('./config/env_var.js');
const _ = require('lodash');
var bodyParser = require('body-parser');
let {ObjectID} = require('mongodb');
var {Todo} = require('./db/models/Todo');
var {User} = require('./db/models/User');
var {authenticate}= require('./middleware/auth');

let todo;
let user;

// app.use( bodyParser.json({type:'*/*'}) ); 
app.use( bodyParser.json({type:'application/json'}) );

app.post('/todo', authenticate, (req, res) => {
	
	todo =
		new Todo({text:req.body.text, completed:req.body.completed, completedAt:req.body.completedAt, _creator:req.user._id});
	todo.save()
		.then( (doc) => res.status(201).send(doc) )
		.catch( (error) => res.status(400).send(`${error.name}: ${error.message}`) ); 
});

app.get('/todo', authenticate, (req, res) => {
	Todo.find( {_creator: req.user._id} )
		.then(todos => res.status(200).send( {todos} ))
		.catch(e => res.status(400).send(e));
});

app.get('/todo/:id', authenticate, (req, res) => {
	var id = req.params.id;

	if(!ObjectID.isValid(id)) 
		res.status(400).send();
	else 
		Todo.findOne({_id:id, _creator:req.user._id})
			.then( (todo) => {
				if(!todo)
					res.status(404).send();
				else
					res.status(200).send({todo}) 
			})
			.catch( (e) => res.status(400).send() );
});

app.delete('/todo/:id', authenticate, (req, res) => {
	var id = req.params.id;

	if(!ObjectID.isValid(id)) 
		res.status(400).send();
	else
		Todo.findOneAndRemove( {_id: id, _creator: req.user._id} )
			.then( (todo) => {
				if(!todo)
					res.status(404).send();
				else
					res.status(200).send({todo}) 
			})
			.catch( (e) => res.status(400).send() );
});

app.patch('/todo/:id', authenticate, (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);
	var options =
		{new: true, upsert:false, runValidators:true };

	if(_.isBoolean(body.completed) && body.completed)
		body.completedAt = new Date().getTime();
	else {
		body.completed = false;
		body.completedAt = null;
	} 

	if(!ObjectID.isValid(id)) 
		res.status(400).send();
	else
		Todo.findOneAndUpdate({_id:id, _creator:req.user._id}, {$set: body}, options)
			.then( (todo) => {
				if(!todo)
					res.status(404).send();
				else
					res.status(200).send({todo}) 
			})
			.catch( (e) => res.status(400).send() );
});

app.post('/user', (req, res) => {
	var body = _.pick(req.body, ['email', 'name', 'age', 'location', 'password']);
	var user = new User(body);
	
	user.save()
		.then( () => {
			return user.generateAuthToken()
		})
		.then((token) => 
			res.header('x-auth',token).status(201).send(user)
		)
		.catch((e) => res.status(400).send(e));
}); 

app.get('/user/me', authenticate, (req, res) => {
	res.status(200).send(req.user);
});

app.post('/user/login', (req, res) => {
	var body = _.pick(req.body, ['email','password']);
	
	User.findByCredentials(body.email,body.password)
		.then( user => {
			return user.generateAuthToken()
				.then(token => res.header('x-auth',token).send(user) )			
		})
		.catch( e => res.status(400).send() );
});

app.delete('/user/me/token', authenticate, (req, res) => {
	req.user.removeToken(req.token).then( 
		() => res.status(200).send()
		,() => res.status(400).send()
	); 
});

app.listen(PORT, () =>
	console.log(`todo-app server up & running on port ${PORT}`)
);

module.exports = {app};

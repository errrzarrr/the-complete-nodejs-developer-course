let express = require('express');
let app = express();
const PORT = process.env.WEBSERVER_PORT || 3000;

var bodyParser = require('body-parser');
let mongoose = require('mongoose');
let config = require('./db/dbconfig');
var {Todo} = require('./db/models/Todo');
var {User} = require('./db/models/User');

let todo;
let user;
// app.use( bodyParser.json({type:'*/*'}) ); 
app.use( bodyParser.json({type:'application/json'}) );

app.post('/todo', (req, res) => {
    console.log('POST /todo recieved body: ', req.body);
    todo =
        new Todo({text:req.body.text, completed:req.body.completed, completedAt:req.body.completedAt});
    todo.save()
        .then( (doc) => res.status(201).send(doc) )
        .catch( (error) => res.status(400).send(`${error.name}: ${error.message}`) ); 
});

app.post('/user', (req, res) => {
    console.log('POST /user received body: ', req.body);
    user = 
        new User({name:req.body.name, email:req.body.email, location:req.body.location, age:req.body.age});
    user.save()
        .then( (doc) => res.status(201).send(doc) )
        .catch( (error) => res.send(`${error.name}: ${error.message}`) ); 
});

app.get('/todo', (req, res) => {
    Todo.find()
        .then(todos => res.status(200).send( {todos} ))
        .catch(e => res.status(400).send(e));
});

app.listen(PORT, () =>
    console.log(`todo-app server up & running on port ${PORT}`)
);

module.exports = {app};

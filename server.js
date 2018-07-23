const express = require('express');

var app = express();
// app.get(``, (req, res) => {});

app.get(`/`, (req, res) => {
	res.send('<h1>Hello Express!</h1>');
});
app.get(`/about`, (req, res) => {
	var about = {
		name: 'Rob'
		,likes: [ 'Rock', 'Metal', 'PlayStation', 'Coding', 'Weightlifting', 'Running' ]
	};
	res.send(about);
});

app.listen(3000);
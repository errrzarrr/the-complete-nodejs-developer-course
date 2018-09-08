const PATH = __dirname+'/../public';
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const {generateMessage} = require('./utils/message');

app.use( express.static(PATH) );

io.on('connection', (socket) =>  {
	console.log('New user connected');

	socket.emit('newMessage', generateMessage('admin', 'welcome to chat at cloud' ));

	socket.broadcast.emit('newMessage',
		generateMessage('admin', 'new user joined')
	);

	socket.on('createMessage', function(message, ackCallback) {
		console.log('createMessage', message);
		
		io.emit( 'newMessage', generateMessage(message.from, message.text) );
		ackCallback(`ack'ed!`);
		/*
		socket.broadcast.emit('newMessage',
			generateMessage(message.from, message.text)
		);
		*/
	});

	socket.on('disconnect', () => {
		console.log('User disconnected')
	});

});

server.listen(PORT, () => 
	console.log(`chat server up & running on port ${PORT}`)
);

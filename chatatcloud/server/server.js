const PATH = __dirname+'/../public';
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/Users');
const {generateMessage,generateLocationMessage} = require('./utils/message');

const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use( express.static(PATH) );

io.on('connection', (socket) =>  {
	console.log('New user connected');
	
	socket.on('join', (params, callback) => {
		if( ! isRealString(params.name) || ! isRealString(params.room) ) {
			return callback('Name & room are required');
		}
		socket.join(params.room);
		users.removeUser( socket.id );
		users.addUser( socket.id, params.name, params.room );
		
		io.to(params.room).emit('updateUserList', users.getAllUsers(params.room));
		
		socket.emit('newMessage', generateMessage('admin', 'welcome to chat at cloud' ));
		socket.broadcast
			.to(params.room)
			.emit('newMessage', 
				generateMessage('admin', `${params.name} has joined`)
			);
		callback();
	});

	socket.on('createMessage', function(message, ackCallback) {
		var user = users.getUser(socket.id);

		if(user && isRealString(message.text))
			io.to(user.room).emit( 'newMessage', generateMessage(user.name, message.text) );
			
		ackCallback();
	});

	socket.on('createLocationMessage', (coords) => {
		var user = users.getUser(socket.id);
		if(user)
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude) );
	});
	
	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);
		if(user) {
			io.to(user.room).emit('updateUserList', users.getAllUsers(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat room`));
		}
	});

});

server.listen(PORT, () => 
	console.log(`chat server up & running on port ${PORT}`)
);

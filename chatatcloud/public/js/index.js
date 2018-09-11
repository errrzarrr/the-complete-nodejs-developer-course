var socket = io();
			
socket.on('connect', function()  {
	console.log('Connected to server');
	
	socket.emit('createMessage' 
		,{ from: 'user' ,text: 'hello server'}
		,() => {}
	);
	
	socket.emit('createMessage' 
		,{ from: 'Frank' ,text: 'Here I am. I request acknowledgement' }   
		,function(msg) {
			console.log(`Message from Server: ${msg}`);
	});
});

socket.on('newMessage', (message) => {
	console.log('newMessage', message);
	var li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`);
	$('#messages').append(li);
});
$('#message-form').on('submit', function(e){
	e.preventDefault();
	socket.emit('createMessage' 
		,{ from: 'User', text: $('[name=message]').val() }
		,() => {}
	);
});
socket.on('disconnect', () => {
	console.log('Disconnected from server');
});


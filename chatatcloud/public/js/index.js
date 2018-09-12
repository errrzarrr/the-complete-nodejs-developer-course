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
socket.on('newLocationMessage', function(message) {
	var li = $(`<li></li>`);
	var a = $(`<a target="_blank">My current location</a>`);
	li.text(`${message.from}: `);
	a.attr(`href`, message.url);
	li.append(a);
	$('#messages').append(li);
});

socket.on('disconnect', () => {
	console.log('Disconnected from server');
});

var locationButton = $('#send-location');

locationButton.on('click',function() {
	if(!navigator.geolocation)
		return alert('Geolocation not supported by your browser');
	navigator.geolocation.getCurrentPosition(
		function(position) {
			socket.emit('createLocationMessage'
				,{latitude: position.coords.latitude	,longitude: position.coords.longitude}
			);
		}
		,function() {
			alert('Unable to fetch location'); 
	});
});




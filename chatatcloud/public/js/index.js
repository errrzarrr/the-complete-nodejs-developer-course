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
	var formattedTime = moment(message.createdAt).format("hh:mma")
	var template = $('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text
		,from: message.from
		,createdAt: formattedTime
	});
	$('#messages').append( html );
});
$('#message-form').on('submit', function(e){
	e.preventDefault();
	socket.emit('createMessage' 
		,{ from: 'User', text: $('[name=message]').val() }
		,() => {}
	);
});
socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format("hh:mma");
 
	var template = $('#location-message-template').html();
	var html = Mustache.render(template, {
		url: message.url
		,from: message.from
		,createdAt: formattedTime
	});
	$('#messages').append( html );
});

socket.on('disconnect', () => {
	console.log('Disconnected from server');
});

var locationButton = $('#send-location');

locationButton.on('click',function() {
	if(!navigator.geolocation)
		return alert('Geolocation not supported by your browser');

	locationButton.attr('disabled', 'disabled').text('Sending...');
	navigator.geolocation.getCurrentPosition(
		function(position) {
			locationButton.removeAttr('disabled').text('Send location');
			socket.emit('createLocationMessage'
				,{latitude: position.coords.latitude ,longitude: position.coords.longitude}
			);
		}
		,function() {
			locationButton.removeAttr('disabled').text('Send location');
			alert('Unable to fetch location'); 
	});
});




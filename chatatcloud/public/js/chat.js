var socket = io();

function scrollToBotton() {
	var messages = $('#messages');
	var newMessage = messages.children('li:last-child');
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		messages.scrollTop(scrollHeight);
	}
};
			
socket.on('connect', function() {
	console.log('Connected to server');
	var params = $.deparam( window.location.search );

	socket.emit('join', params, function(err) {
		if(err) {
			alert(err);
			window.location.href = '/';
		}
		else 
			console.log('No error');
	});
	socket.emit('createMessage' 
		,{ from: 'user' ,text: 'hello server' }
		/* acknowledgement function implementation. 
		* ie: ,function(msg) { console.log(`Message from Server: ${msg}`) };
		*/
		,() => {}  
	);
	socket.on('updateUserList', function(users) {
		 var ol = $('<ol></ol>');

		 users.forEach(function(user){
			 ol.append( $('<li></li>').text(user) );
		 });

		$('#users').html(ol);
		console.log('Users list', users);
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
	scrollToBotton();
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
	scrollToBotton();
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



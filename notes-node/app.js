const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');
const FILENAME = 'greetings.txt';

var userInfo = os.userInfo();
var msg = `Hello ${userInfo.username}! Current year is ${notes.year}`;

console.log('starting app.js');
fs.appendFile(FILENAME, msg,(err)=>{
	if(err)
		console.log('an error has occurred:', err);
	else
		console.log('File successfully saved');
});
console.log( 'result: '+notes.add(1,7) );

var command = process.argv[2];


if(command === 'add')
	console.log('adding a new note');
else if(command === 'list')
	console.log('listing all notes');
else if(command === 'read')
	console.log('reading note');	
else if(command === 'remove')
	console.log('removing note');	
else 
	console.log(`command '${command}' not recognized`);


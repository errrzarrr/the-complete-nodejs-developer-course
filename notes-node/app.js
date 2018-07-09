const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');
const yargs = require('yargs');

const FILENAME = 'greetings.txt';

var userInfo = os.userInfo();
var msg = `Hello ${userInfo.username}! Current year is ${notes.year}`;

var argv = yargs.argv;
var command = argv._[0] ; //also process.argv[2];

console.log('starting app.js');
fs.appendFile(FILENAME, msg,(err)=>{
	if(err)
		console.log('an error has occurred:', err);
	else
		console.log('File successfully saved');
});

if(command === 'add') 
	notes.addNote(argv.title, argv.body);	
else if(command === 'list')
	notes.getAll();
else if(command === 'read')
	notes.getNote(argv.title);
else if(command === 'remove')
	notes.remove(argv.title);
else 
	console.log(`command '${command}' not recognized`);


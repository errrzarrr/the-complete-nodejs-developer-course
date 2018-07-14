const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');
const yargs = require('yargs');
const comHelp = require('./helpers/commands.js');
var argv = 
	yargs
	.command(...comHelp.add)
	.command(...comHelp.list)
	.command(...comHelp.read)
	.command(...comHelp.remove)
	.help()
	.argv;

var command = argv._[0] ; //also process.argv[2];
console.log('starting app.js');


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


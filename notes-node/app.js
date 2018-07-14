const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');
const yargs = require('yargs');
const comHelp = require('./helpers/commands.js');
var argv = 
	yargs
	.command(comHelp.add.name, comHelp.add.description ,comHelp.add.options)
	.command(comHelp.list.name, comHelp.list.description)
	.command(comHelp.read.name, comHelp.read.description, comHelp.read.options)
	.command(comHelp.remove.name, comHelp.remove.description, comHelp.remove.options)
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


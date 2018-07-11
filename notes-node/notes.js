
const fs = require('fs');

module.exports.year = 2018;

const FILENAME = 'notes-data.json';

var addNote = (title, body) => {
	var existingNotes = [];
	var note = {title,body};
	
	try {
		existingNotes = JSON.parse( fs.readFileSync(FILENAME) );
	} catch (error) {
		console.log('error', error);
	}

	var noDuplicates 
		= existingNotes.filter((n) => n.title === title).length == 0;

	if(noDuplicates) {            
		existingNotes.push(note);
		console.log('adding note', note);
		fs.writeFileSync(FILENAME, JSON.stringify(existingNotes));    
	}
	else {
		console.log(`A note titled "${title}" already exists. Most recent one won't be added`);
	}
	

} 
	
var getAll = () => console.log(`getting all notes`);
var getNote = (title) => console.log(`reading note [${title}]`);
var remove = (title) => console.log(`removing note [${title}]`);

module.exports.add = (a, b) => a+b

module.exports = {
	// equals to addNote: addNote
	addNote
	,getAll
	,getNote
	,remove
};
// console.log(module);
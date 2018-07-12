
const fs = require('fs');

module.exports.year = 2018;

const FILENAME = 'notes-data.json';

var fetchNotes = () => {
	try {
		return JSON.parse( fs.readFileSync(FILENAME) );
	} catch (error) {
		return [];
	}
};

var saveNotes = (notes) => 
	fs.writeFileSync(FILENAME, JSON.stringify(notes));

var addNote = (title, body) => {
	var existingNotes = fetchNotes();
	var note = {title,body};	
	var noDuplicates 
		= existingNotes.filter((n) => n.title === title).length == 0;

	if(noDuplicates) {            
		existingNotes.push(note);
		console.log('adding note\n\t', note);
		saveNotes(existingNotes); 
	}
	else {
		console.log(`A note titled "${title}" already exists. Most recent one won't be added`);
	}	
} 
	
var getAll = () => console.log(`getting all notes`);
var getNote = (title) => console.log(`reading note [${title}]`);

var remove = (title) => {
	var existingNotes = fetchNotes();
	var notesWithoutRemoved 
		= existingNotes.filter((n) => n.title !== title);
	var found = notesWithoutRemoved.length < existingNotes.length; 
	console.log(found? `Note titled "${title}" removed` : `Note titled "${title}" wasn't found.`);
	saveNotes(notesWithoutRemoved);
}

module.exports.add = (a, b) => a+b

module.exports = {
	// equals to addNote: addNote
	addNote
	,getAll
	,getNote
	,remove
};
// console.log(module);
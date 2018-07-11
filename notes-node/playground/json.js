const fs = require('fs');
const FILENAME = 'notes.json';

var noteObj = {
	title: 'the title'
	,body: 'here goes the note body'
};
var noteAsString 
	= JSON.stringify( noteObj );

fs.writeFileSync(FILENAME, noteAsString);

var noteFromFile 
	= fs.readFileSync( FILENAME );
var note = JSON.parse(noteFromFile);

console.log(note.title);

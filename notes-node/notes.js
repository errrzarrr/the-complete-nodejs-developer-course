console.log('starting notes.js');
module.exports.year = 2018;

var addNote = (title, body) => console.log('adding note', '\n'+'\t'+title, '\n'+'\t'+body);
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
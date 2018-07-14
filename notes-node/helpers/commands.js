const title = {
	describe: "Title for the note"
	,alias: "t"
	,demand: true
};

const body = {
	describe: "Note's message"
	,alias: "b"
	,demand: true
}

const add = {
	name: "add"
	,description:"Adds a new note"
	,options: {title, body}
};

const list = {
	name: "list"
	,description: "Lists all stored notes"
};

const read = {
	name: "read"
	,description:'Reads a particular note'
	,options: {title}
};

const remove = {
	name: "remove"
	,description: 'Removes a particular note'
	,options: {title}
};

module.exports = { 
	add		:	new Array(add.name, add.description,add.options)
	,list	:	new Array(list.name, list.description)
	,read	:	new Array(read.name, read.description, read.options)
	,remove	:	new Array(remove.name, remove.description, remove.options)
};
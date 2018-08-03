const {MongoClient} = require('mongodb');
const config = require('../dbconfig.js');

MongoClient.connect(`${config.URL}`, (err, client) => {
	if(err)
		return config.unableToConnect()
		
	config.connected()
	let dbo = client.db(config.DB);
	var obj = {text:'something to do', completed:false};
	dbo.collection(config.COLLECTIONS.todos).insertOne(obj, (err, result) => {
		if(err)
			return config.unableInsertTodo();
		console.log( JSON.stringify(result.ops, FIELD_FILTER=undefined, INDENT=2) );
	});
	
	obj = {name:'Vanessa', age:25, location:'Liberty Avenue #123'};
	dbo.collection(config.COLLECTIONS.users).insertOne(obj, (err, result)=> {
		if(err)
			return config.unableInsertUser();
		console.log( JSON.stringify(result.ops, FIELD_FILTER=undefined, INDENT=2) );
	});
	client.close();
});
const {MongoClient} = require('mongodb');


const URL = `mongodb://localhost:27017`;
let dbName = 'todoApp';

MongoClient.connect(URL, (err, client) => {
	if(err)
		return	console.log('Unable to connect to MongoDB server');
		
	console.log('Connected to MongoDB server');
	
	var dbo = client.db(dbName);
	
	var obj = {text:'something to do', completed:false};
	dbo.collection('todos').insertOne(obj, (err, result) => {
		if(err)
			return console.log(`unalbe to insert todo`, err);
		console.log( JSON.stringify(result.ops, FIELD_FILTER=undefined, INDENT=2) );
	});
	
	obj = {name:'Vanessa', age:25, location:'Liberty Avenue #123'};
	dbo.collection('users').insertOne(obj, (err, result)=> {
		if(err)
			return console.log(`unalbe to insert user`, err);
		console.log( JSON.stringify(result.ops, FIELD_FILTER=undefined, INDENT=2) );
	});
	client.close();
});
const {MongoClient, ObjectId} = require('mongodb');

let objId =  new ObjectId();
const URL = `mongodb://localhost:27017`;
let dbName = 'todoApp';

MongoClient.connect(URL, (err, client) => {
	if(err)
		return console.log('Unable to connect to MongoDB server');
		
	console.log('Connected to MongoDB server');
	var dbo = client.db(dbName);

	dbo.collection('todos').find().count()
		.then((count) => {
			console.log(`${count} todos total`);
		})
		.catch((err) =>
			console.log('unable to fetch todos', err)
		);
	dbo.collection('todos').find().toArray()
		.then((docs) => {
			console.log('All todos');
			console.log(JSON.stringify(docs, FIELD_FILTER=undefined, INDENT=2));
		})
		.catch((err) => 
			console.log('unable to fetch todos', err)
		);
	dbo.collection('users').find({name:'Vanessa'}).toArray()
		.then((docs) => {
			console.log('All users with a given name');
			console.log(JSON.stringify(docs, FIELD_FILTER=undefined, INDENT=2));
		})
		.catch((err) => 
			console.log('unable to fetch todos', err)
		);
		
}); 
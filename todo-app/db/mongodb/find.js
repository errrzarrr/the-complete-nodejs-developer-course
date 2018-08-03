const {MongoClient, ObjectId} = require('mongodb');
const config = require('../dbconfig.js');

let objId =  new ObjectId();

MongoClient.connect(config.URL, (err, client) => {
	if(err)
		return config.unableToConnect()
		
	config.connected()
	var dbo = client.db(config.DB);

	dbo.collection(config.COLLECTIONS.todos).find().count()
		.then((count) => {
			console.log(`${count} todos total`);
		})
		.catch((err) =>
			config.unableFetchTodo(err)
		);
	dbo.collection(config.COLLECTIONS.todos).find().toArray()
		.then((docs) => {
			console.log('All todos');
			console.log(JSON.stringify(docs, FIELD_FILTER=undefined, INDENT=2));
		})
		.catch((err) => 
			config.unableFetchTodo(err)
		);
	dbo.collection(config.COLLECTIONS.users).find({name:'Vanessa'}).toArray()
		.then((docs) => {
			console.log('All users with a given name');
			console.log(JSON.stringify(docs, FIELD_FILTER=undefined, INDENT=2));
		})
		.catch((err) => 
			config.unableFetchTodo(err)
		);
		client.close();
		
}); 
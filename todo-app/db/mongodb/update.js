const {MongoClient, ObjectId} = require('mongodb');

let objId =  new ObjectId();
const URL = `mongodb://localhost:27017`;
let dbName = 'todoApp';

MongoClient.connect(URL, (err, client) => {
	if(err)
		return console.log('Unable to connect to MongoDB server');
		
	console.log('Connected to MongoDB server');
	var dbo = client.db(dbName);
	
	// findOneAndUpdate(filter, update)
	dbo.collection('users').findOneAndUpdate( {name: "Andy"}, { $set:{name:"Andy V"}, $inc:{age:1} })
		.then((result) => {
			console.log(result);
		})
		.catch((err) =>
			console.log('unable to update users', err)
		);
	// findOneAndUpdate(filter, update, options)
	// returnOriginal:false returns the updated doc instead of the older one
	dbo.collection('users').findOneAndUpdate( {location: /Liberty Street/i}, {$set:{location:"Voluntary Street", name:"Mike Jefferson"}}, {returnOriginal:false})
		.then((result) => {
			console.log(result);
		})
		.catch((err) =>
			console.log('unable to update users', err)
		);	
	client.close();	
});
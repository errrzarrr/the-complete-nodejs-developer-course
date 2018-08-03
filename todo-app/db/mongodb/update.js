const {MongoClient, ObjectId} = require('mongodb');
const config = require('../dbconfig.js');

let objId =  new ObjectId();

MongoClient.connect(config.URL, (err, client) => {
	if(err)
		return config.unableToConnect();
		
	config.connected();
	var dbo = client.db(config.DB);
	
	// findOneAndUpdate(filter, update)
	dbo.collection(config.COLLECTIONS.users).findOneAndUpdate( {name: "Andy"}, { $set:{name:"Andy V"}, $inc:{age:1} })
		.then((result) => {
			console.log(result);
		})
		.catch( (err) => config.unableUpdateUser(err) );
	
	// findOneAndUpdate(filter, update, options)
	// returnOriginal:false returns the updated doc instead of the older one
	dbo.collection(config.COLLECTIONS.users).findOneAndUpdate( {location: /Liberty Street/i}, {$set:{location:"Voluntary Street", name:"Mike Jefferson"}}, {returnOriginal:false})
		.then((result) => {
			console.log(result);
		})
		.catch( (err) => config.unableUpdateUser(err) );	
	client.close();	
});
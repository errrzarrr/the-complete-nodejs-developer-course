const {MongoClient, ObjectId} = require('mongodb');

const URL = `mongodb://localhost:27017`;
let dbName = 'todoApp';

MongoClient.connect(URL, (err, client) => {
	if(err)
		return console.log('Unable to connect to MongoDB server');
		
	console.log('Connected to MongoDB server');
	var dbo = client.db(dbName);

	dbo.collection('todos').deleteMany({completed:true})
		.then((result) => {
			console.log(result);
		})
		.catch((err) =>
			console.log('unable to delete todos', err)
        );

    /* findOneAndDelete() has the advantage over deleteOne() 
    * that the response is a more especific & shorter reponse  
    * containing whole deleted document, _id included.
    * lastErrorObject property indicates whether successful state or not
    */
    dbo.collection('todos').findOneAndDelete({completed:false})
        .then((result) => {
            console.log(result);
        })
        .catch((err) =>
            console.log('unable to delete todo', err)
        );
    dbo.collection('todos').findOneAndDelete({_id : ObjectId("5b6307cbe040e7221837d4a8") })
		.then((result) => {
			console.log(result);
		})
		.catch((err) =>
			console.log('unable to delete todo', err)
		);    
    client.close();
}); 
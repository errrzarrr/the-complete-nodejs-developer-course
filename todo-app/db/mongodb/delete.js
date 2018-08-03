const {MongoClient, ObjectId} = require('mongodb');
const config = require('../dbconfig.js');

MongoClient.connect(config.URL, (err, client) => {
	if(err)
		return config.unableToConnect();
		
	config.connected();
	var dbo = client.db(config.DB);

	dbo.collection(config.COLLECTIONS.todos).deleteMany({completed:true})
		.then( (result) => console.log(result) )
		.catch( (err) => config.unableToDeleteTodo(err) );

    /* findOneAndDelete() has the advantage over deleteOne() 
    * that the response is a more especific & shorter reponse  
    * containing whole deleted document, _id included.
    * lastErrorObject property indicates whether successful state or not
    */
    dbo.collection(config.COLLECTIONS.todos).findOneAndDelete({completed:false})
		.then( (result) => console.log(result) )
        .catch( (err) => config.unableToDeleteTodo(err) );
 
	dbo.collection(config.COLLECTIONS.todos).findOneAndDelete({_id : ObjectId("5b6307cbe040e7221837d4a8") })
		.then( (result) => console.log(result) )
		.catch( (err) => config.unableToDeleteTodo(err) );

    client.close();
}); 
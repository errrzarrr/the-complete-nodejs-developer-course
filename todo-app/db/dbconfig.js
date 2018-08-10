let mongoose = require('mongoose');

const PORT = process.env.MONGO_PORT || 27017;
const URL = `mongodb://localhost:${PORT}`;
const DB = 'todoApp';

const COLLECTIONS = {
	todos: 'todos'
	,users:'users'
};

mongoose.Promise = global.Promise;
mongoose.connect(`${URL}/${DB}`, { useNewUrlParser: true });

module.exports.mongoose = mongoose;
module.exports.URL = URL;
module.exports.DB = DB;
module.exports.COLLECTIONS = COLLECTIONS;
module.exports.connected = () => console.log('Connected to MongoDB server');
module.exports.unableToConnect = () => console.log('Unable to connect to MongoDB server');
module.exports.unableFetchTodo = (err) => console.log('unable to fetch todo(s)', err);
module.exports.unableInsertTodo = (err) => console.log(`unable to insert todo(s)`, err);
module.exports.unableInsertUser = (err) => console.log(`unable to insert user(s)`, err);
module.exports.unableUpdateUser = (err) => console.log('unable to update user(s)', err);
module.exports.unableToDeleteTodo = (err) => console.log('unable to delete todo(s)', err);
module.exports.unableToDeleteUser = (err) => console.log('unable to delete user(s)', err);
module.exports.newDocSaved = (collectionName, doc) => console.log(`New ${collectionName} saved:\n`, doc);
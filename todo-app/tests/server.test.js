const expect = require('expect');
const supertest =  require('supertest');
let {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {app} = require('../server');
const {Todo} = require('../db/models/Todo');
const {User} = require('../db/models/User');
const SALT = process.env.SALT;

const testTodos = [
	{_id: new ObjectID(), text: 'test todo #1'}
	,{_id: new ObjectID(), text: 'test todo #2', completed:true, completedAt:111}
];

var user1Id = new ObjectID();
var user2Id = new ObjectID();
const testUsers = [{
		_id: user1Id
		,name: 'tester 1'
		,email: 'test1@email.com'
		,password: 'test123456'
		,tokens: [{
			access:'auth'
			,token: jwt.sign({_id: user1Id, access:'auth'}, SALT).toString()
		}]
	}
	,{
		_id: user2Id
		,name: 'tester 2'
		,email: 'test2@email.com'
		,password: 'test123456'
}];

const nonValidId = 'abc123xyz';

// WARNING: This wipes out named collection. A testing DB is needed for this.
// since our DB already has 'todo' docs in it, this method --for test purposes-- wipes them out, so we can 'expect(todos.length).toBe(1)'
beforeEach( (done) => {
	Todo.remove({})
		.then( () => {return Todo.insertMany(testTodos) })
		.then(() => done());
});

beforeEach( (done) => {
	User.remove({})
		.then( () => {
			var userOne = new User(testUsers[0]).save();
			var userTwo = new User(testUsers[1]).save();
			return Promise.all([userOne, userTwo]);
		})
		.then(() => done());
});

describe('/todo routes', () => {
	describe('POST /todo', () => {
		it('should create a new todo', (done) => {
			var text = 'Text to test /todo';
			supertest(app)
				.post('/todo')
				.send({text})
				.expect(201)
				.expect((res) =>
					expect(res.body.text).toBe(text)
				)
				.end((err, res) => {
					if(err)
						done(err);
					else {
						Todo.find({text})
							.then((todos) => {
								expect(todos.length).toBe(1);
								expect(todos[0].text).toBe(text);
								done();
							})
							.catch((e) => done(e));
					}
				});
		});
		it('should NOT create a new todo when given an invalid body data', (done) => {
			supertest(app)
				.post('/todo')
				.send({})
				.expect(400)
				.end((err, res) => {
					if(err)
						done(err);
					else {
						Todo.find()
							.then((todos) => {
								expect(todos.length).toBe(testTodos.length);
								done();
							})
							.catch((e) => done(e));
					}
				});
		});
	});

	describe('GET /todo', () => {
		it('should retrieve all todos', (done) => {
			supertest(app)
				.get('/todo') 
				.expect(200)
				.end((err, res) => {
					if(err)
						done(err);
					else {
						Todo.find({})
							.then((todos) => {
								expect(todos.length).toBe(testTodos.length);
								done();
							})
							.catch((e) => done(e));
					}
				});
		});
		it('should retrieve a todo given an _id', (done) => {
			var testId = testTodos[0]._id.toHexString();
			supertest(app)
				.get(`/todo/${testId}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.todo.text).toBe(testTodos[0].text)
				})
				.end(done);
		}); 
		it('should return 404 given an inexistent _id', (done) => {
			var testId = new ObjectID().toHexString();
			supertest(app)
				.get(`/todo/${testId}`)
				.expect(404)
				.end(done);
		});
		it('should return 400 given a non-valid _id', (done) => {
			supertest(app)
				.get(`/todo/${nonValidId}/`)
				.expect(400)
				.end(done);
		});
		
	});

	describe('DELETE /todo', () => {
		it('should delete a todo given the _id', (done) => {
			var testId = testTodos[0]._id.toHexString();
			supertest(app)
				.delete(`/todo/${testId}/`)
				.expect(200)
				.expect( res => expect(res.body.todo._id).toBe(testId) )
				.end((err,res) => {
					if(err)
						done(err);
					else
						Todo.findById(testId)
							.then((todo) => {
								expect(todo).toNotExist();
								done();
							})
							.catch((e) => done(e));
				});
		});

		it('should return 404 given an inexistent _id', (done) => {
			var testId = new ObjectID().toHexString();
			supertest(app)
				.get(`/todo/${testId}`)
				.expect(404)
				.end(done);
		});
		
		it('should return 400 given a non-valid _id', (done) => {
			supertest(app)
				.get(`/todo/${nonValidId}/`)
				.expect(400)
				.end(done); 
		});
	});

	describe('PATCH /todo', () => {

		it('should update a todo given the _id', (done) => {
			var testId = testTodos[0]._id.toHexString();
			var testBody = {text: "updated text", completed:true};
			
			supertest(app)
				.patch(`/todo/${testId}/`)
				.send(testBody)
				.expect(200)
				.expect((res) => {
					expect(res.body.todo.text).toBe(testBody.text);
					expect(res.body.todo.completed).toBe(testBody.completed);
					expect(res.body.todo.completedAt).toBeA('number');
				})
				.end(done);
		});

		it('should clear completedAt when todo is set as not completed', (done) => {
			var testId = testTodos[1]._id.toHexString();
			var testBody = {text: "updated text", completed:false};
			supertest(app)
				.patch(`/todo/${testId}/`)
				.send(testBody)
				.expect(200)
				.expect((res) => {
					expect(res.body.todo.text).toBe(testBody.text);
					expect(res.body.todo.completed).toBe(testBody.completed);
					expect(res.body.todo.completedAt).toNotExist();
				})
				.end(done);
		});

		it('should return 404 given an inexistent _id', (done) => {
			var testId = new ObjectID().toHexString();
			supertest(app)
				.patch(`/todo/${testId}`)
				.expect(404)
				.end(done);
		});

		it('should return 400 given a non-valid _id', (done) => {
			supertest(app)
				.patch(`/todo/${nonValidId}/`)
				.expect(400)
				.end(done); 
		});	
	});
});
describe('/user routes', () => {
	describe('GET /user/me', () => {
	//	it('', (done) => {});
		it('should return user given valid authentication', (done) => {
			supertest(app)
				.get('/user/me')
				.set('x-auth', testUsers[0].tokens[0].token)
				.expect(200)
				.expect((res) => {
					expect(res.body._id).toBe(testUsers[0]._id.toHexString());
					expect(res.body.name).toBe(testUsers[0].name);
					expect(res.body.email).toBe(testUsers[0].email);
				})
				.end(done);
		});
		it('should return 401 given non-valid authentication', (done) => {
			supertest(app)
				.get('/user/me')
				.set('x-auth', null)
				.expect(401)
				.expect( res => expect(res.body).toEqual( {} ) )
				.end(done);
		});
	});

	describe('POST /user', () => {
		it('should create a new user', (done) => {
			var email = 'example@example.com';
			var password = '123abc;';
			var name = 'Test Dummy';
			supertest(app)
				.post('/user')
				.send({name, email, password})
				.expect(201)
				.expect((res) => {
					expect(res.headers['x-auth']).toExist();
					expect(res.body._id).toExist();
					expect(res.body.email).toBe(email);
				})
				.end((err) => {
					if(err)
						return done(err);
					User.findOne({email}).then((user) => {
						expect(user).toExist();
						expect(user.password).toNotBe(password);
						done();
					});
				});
		});

		it('should return validation errors given invalid user body', (done) => {
			var email = 'notAnEmail ';
			var password = '';
			var name = 'Test Dummy';
			supertest(app)
				.post('/user')
				.send({name, email, password})
				.expect(400)
				.expect(res => {
					expect(res.body.errors.email).toExist();
					expect(res.body.errors.password).toExist();
				})
				.end(done);
		});
		
		it('should not create user if email exists', (done) => {
			var password = '123abc;';
			var name = 'Test Dummy';
			supertest(app)
				.post('/user')
				.send({name, email:testUsers[0].email, password})
				.expect(400)
				.expect(res => {
					expect(res.body.message).toInclude('duplicate')
				})
				.end(done);
		});
	});
});
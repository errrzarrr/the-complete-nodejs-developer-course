const expect = require('expect');
const supertest =  require('supertest');
let {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../db/models/Todo');

const testTodos = [
	{_id: new ObjectID(), text: 'test todo #1'}
	,{_id: new ObjectID(), text: 'test todo #2'}
];

const nonValidId = 'abc123xyz';

// WARNING: This wipes out named collection. A testing DB is needed for this.
// since our DB already has 'todo' docs in it, this method --for test purposes-- wipes them out, so we can 'expect(todos.length).toBe(1)'
beforeEach( (done) => {
	Todo.remove({})
		.then( () => {return Todo.insertMany(testTodos) })
		.then(() => done());
});

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
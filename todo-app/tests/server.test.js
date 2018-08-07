const expect = require('expect');
const supertest = require('supertest');

const {app} = require('../server');
const {Todo} = require('../db/models/Todo');

// WARNING: This wipes out named collection. A testing DB is needed for this.
// since our DB already has 'todo' docs in it, this method --for test purposes-- wipes them out, so we can 'expect(todos.length).toBe(1)'
beforeEach( (done) => Todo.remove({}).then(() => done()) );

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
					Todo.find()
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
							expect(todos.length).toBe(0);
							done();
						})
						.catch((e) => done(e));
				}
			});
	});

});

const supertest = require('supertest');
const expect = require('expect');
var app = require('../server.js').app;

describe('server', () => {
	describe('GET', () => {
		it('should respond with greeting text', (done) => {
			supertest(app)
				.get('/helloworld')
				.expect(200)
				.expect('Content-Type', /text\/html/)
				.expect('Hello World')
				.end(done);
		});
  
		it('should respond with an object describing me', (done) => {
			/* outter expect is supertest's, inner is expect lib
			* but supertest.expect ONLY verifies whole JSON responses
			* since supertest.expect also accepts functions
			* this is the method (toInclude) used to verify parts of a JSON response
			*/
			supertest(app)
				.get('/about')
				.expect(200)
				.expect('Content-Type', /json/)
				.expect('Content-Type', /utf-8/i)
				.expect( (res) => 
					expect(res.body).toInclude( {name: 'Rob'} )
				)
				.end(done);
		});

		it('should respond with an error object', (done) => {
			supertest(app)
				.get('/bad')
				.expect(400)
				.expect('Content-Type', /json/)
				.expect( res => expect(res.charset).toBe('utf-8') )
				.expect( {errorMessage: "Error. This request didn't went well."} )
				.end(done);
		});
	});
	describe('POST', () => {});
});
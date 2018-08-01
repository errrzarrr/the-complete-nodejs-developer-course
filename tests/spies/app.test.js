const expect = require('expect');
const rewire = require('rewire');
var app = rewire('./app');

describe('generic rewire testing', () => {
	it('should NOT call the spy', () => {
		var spy = expect.createSpy();
		expect(spy).toNotHaveBeenCalled();
	});
	it('should call the spy', () => {
		var spy = expect.createSpy();
		spy();
		expect(spy).toHaveBeenCalled();
	});
	it('should call the spy with exactly 2 args', () => {
		var spy = expect.createSpy();
		spy('Rob', 123);
		expect(spy).toHaveBeenCalledWith('Rob', 123);
	});
});

describe('db', () => {
	var spiedDb = 
		{ saveUser: expect.createSpy() };
	app.__set__('db', spiedDb);

	it('should call saveUser with user obj', () => {
		var user = 
			{ email : 'test@email.com', password : '1234abcd' };
		app.handleSignup(user.email, user.password);
		expect(spiedDb.saveUser)
			.toHaveBeenCalledWith( user );
	});
});
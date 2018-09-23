var {Users} = require('./Users.js');
var expect = require('expect');

describe('Users', () => {
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: `1`
			,name: 'R'
			,room: '101'

		}, {
			id: `2`
			,name: 'S'
			,room: '101'

		}, {
			id: `3`
			,name: 'T'
			,room: 'Camera Room'
		}];
	});
	it('should add new user', () => {
		var users = new Users();
		var user = {
			id: 123
			,name: 'R'
			,room: '101'
		};
		var resUser = users.addUser(user.id, user.name, user.room);
		expect( users.users ).toEqual( [user] );
	});
	it('should find an user', () => {
		var userId = '1';
		var user = users.getUser(userId);
		expect(user.id).toBe(userId);
	});
	it('should not find an user', () => {
		var userId = '99';
		var user = users.getUser(userId);
		expect(user).toNotExist();
	});
	it('should remove an user', () => {
		var userId = '2';
		var qty = users.users.length - 1;
		var user  = users.removeUser(userId);
		expect( user.id ).toBe( userId );
		expect( users.users.length ).toBe( qty );
	});
	it('should not remove an user', () => {
		var userId = '99';
		var qty = users.users.length;
		var user = users.removeUser(userId);
		expect( user ).toNotExist();
		expect( users.users.length ).toBe( qty );
	});

	it('should return the names for room "101"', () => {
		var userList = users.getAllUsers('101');
		expect(userList).toEqual( ['R','S'] );
	});
	it('should return the names for room "Camera Room"', () => {
		var userList = users.getAllUsers("Camera Room");
		expect(userList).toEqual( ['T'] );
	});

});
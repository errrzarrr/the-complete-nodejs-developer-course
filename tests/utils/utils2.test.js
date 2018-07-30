const utils = require('./utils');
const expect = require('expect');
let dataType = 'number';

// BDD-syntax
// this version is the way done 
// WITH an assestion library
it('should add 2 given numbers', () => {
	var expected = 44;
	var result = utils.add(33,11);
	dataType = 'number';
	expect(result)
		.toBeA(dataType)
		.toBe(expected);
});

it('should square a given number', () => {
	var expected = 9;
	var result = utils.square(3);
	dataType = 'number';
	expect(result)
		.toBeA(dataType)
		.toBe(expected);
});

it('should expect some values', () => {
	expect(12)
		.toNotBe(10);

	/* this won't work, since for objs is different 
	expect({name: 'Rob'})
		.toBe({name: 'Rob'});
	*/

	// this is how is done
	expect({name: 'Rob'})
		.toEqual({name: 'Rob'});	
	
	expect([1,2,3])
		.toInclude(3)
		.toExclude(4);

	expect({name: 'Rob', profession: "Software Engineer"})
		.toInclude({ profession: "Software Engineer"})
		.toExclude({age: 0});
});

it('should set firstName & lastName', () => {
	dataType ='object';
	var user = {location: 'DR', profession: 'Software Engineer'};
	var fullName = 'Roberto M';
	var result = utils.setName(user, fullName);

	expect(user)
		.toBeA(dataType)
		.toInclude({ firstName: "Roberto", lastName: "M" });
	
	/* Since user is passed by reference 
	* user and result object are the same 
	* --so, in fact, no need to return a value
	* and user obj should be enough
	*/
	expect(user)
		.toBe(result);
});

it('should asynchronously add 2 numbers', (done) => {
	var expected = 44;
	dataType = 'number';
	utils.asyncAdd(33,11, (sum) => {
		expect(sum)
			.toBeA(dataType)
			.toBe(expected);
			done();	
		}
	);
});
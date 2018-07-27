const utils = require('./utils');

// BDD-syntax
it('should add 2 given numbers', () => {
	var expected = 44;
	var result =  utils.add(33,11);
	if(result != expected)   
		throw new Error(`Expected ${expected}, but got ${result} instead`);
});

it('should square a given number', () => {
	var expected = 9;
	var result =  utils.square(3);
	if(result != expected)   
		throw new Error(`Expected ${expected}, but got ${result} instead`);
});

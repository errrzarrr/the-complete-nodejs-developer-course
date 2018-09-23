const expect = require('expect');
const {isRealString} = require('./validation.js');

describe('isRealString', () => {
	var res;
	it('should reject non-string values', () => {
		res = isRealString(100);
		expect(res).toBe(false);
	});
	it('should reject strings with only spaces', () => {
		res = isRealString("    ");
		expect(res).toBe(false);
	});
	it('should allow strings with non-space characters', () => {
		res = isRealString(" valid room name ");
		expect(res).toBe(true);
	}); 
});

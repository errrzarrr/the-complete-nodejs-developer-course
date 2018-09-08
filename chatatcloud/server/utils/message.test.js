var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from =  'tester';
        var text = 'hello'; 
        let message = generateMessage(from, text);
        
        expect(message).toInclude({ from, text });
        expect(message.createdAt).toBeA('number');
    });    
});
var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from =  'tester';
        var text = 'hello'; 
        let message = generateMessage(from, text);
        
        expect(message).toInclude({ from, text });
        expect(message.createdAt).toBeA('number');
    });    
});
describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from =  'tester';
        var coord = {latitude: 1.1, longitude:1.2};
        var url = `https://www.google.com/maps?q=${coord.latitude},${coord.longitude}`;

        let message = generateLocationMessage(from, coord.latitude, coord.longitude);
        
        expect(message).toInclude({ from, url });
        expect(message.createdAt).toBeA('number');
    });    
});
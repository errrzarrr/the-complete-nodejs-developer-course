const fs = require('fs');
const os = require('os');
const FILENAME = 'greetings.txt';

var userInfo = os.userInfo();
var msg = `Hello ${userInfo.username}!`;

fs.appendFile(FILENAME, msg,(err)=>{
    if(err)
        console.log('an error has occurred:', err);
    else
        console.log('File successfully saved');
});
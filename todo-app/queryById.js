const mongoose = require('mongoose');

const {Todo} = require('./db/models/Todo');
const {User} = require('./db/models/User');

var validId = '5b6c52f0769db51454236e91';
var nonExistingId = '6b6c52f0769db51454236e91';
var invalidFormatId = '5b6c52f0769db51454236e9x';
User.findById(validId)
    .then((user) => {
        if(!user)
            console.log('unable to find user');
        else    
            console.log(JSON.stringify(user,undefined,2));
    })
    .catch(e => console.log(e.message));

//NOTES:
// find({_id:id}) returns an array of objects, an empty one if nothing was found
// findOne({_id:id}) returns an object, but null if nothing was found
module.exports.add = (a,b) => (a+b);
module.exports.square = (a) => a*a;
module.exports.setName = (user, fullName) => {
    [user.firstName, user.lastName] 
        = fullName.split(' ');
    return user;
};
// Mocha by default cancels tests delayed ofr longer than 2secs,
module.exports.asyncAdd = (a, b, callback) => 
    setTimeout( () => callback(a+b), 1000);

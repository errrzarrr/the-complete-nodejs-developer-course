var {User} = require('./../db/models/User');

var authenticate = (req, res, next) => {
	var token = req.header('x-auth');
	User.findByToken(token)
		.then((user) => {
			// if no user: jump to caller's catch(...)
			if (!user)
				return Promise.reject('user not found');
			req.user = user;
			req.token = token;
			next();
		})
		.catch( (e) => res.status(401).send(e) );
};

module.exports = {authenticate};
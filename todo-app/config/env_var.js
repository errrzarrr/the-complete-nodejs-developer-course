/*
	this configs and switches development and testing enviroments
	so development or production DBs aren't affected by tests.
	In heroku or any other production server this is set to 'production'
	and won't be executed.
*/

const ENV = process.env.NODE_ENV || 'development';


if(ENV === 'development' || ENV === 'test') {
	const config = require('./config.json');
	var envConfig = config[ENV];
	Object.keys(envConfig)
		.forEach( key => process.env[key] = envConfig[key] );
}

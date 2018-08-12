/*
  this configs and switches development and testing enviroments
  so development or production DBs aren't affected by tests.
  In heroku or any other production server this is set to 'production'
  and won't be executed.
*/
const ENV = process.env.NODE_ENV || 'development';
switch(ENV) {
	case 'development':
		process.env.ENV_TABLE = 'todoApp';
		break;
	case 'test':
		process.env.ENV_TABLE = 'todoApp_test';
		break;
	default: break;
}
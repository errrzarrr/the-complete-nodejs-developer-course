const request = require('request');
var url ='https://maps.googleapis.com/maps/api/geocode/json';
var reqObj =
	{ url: url+'?address=Avenida Enriquillo 38, Santo Domingo, Republica Dominicana', json: true };
const PROPERTIES_WHITELIST = null; // set null to show all object's properties
const INDENT_SPACES = 2;

request(reqObj, (error, response, body) => {
	console.log( JSON.stringify(body, PROPERTIES_WHITELIST, INDENT_SPACES) );
	console.log(`${body.results[0].formatted_address}`);
	console.log(`\tLatitude: ${body.results[0].geometry.location.lat}`);
	console.log(`\tLongitude: ${body.results[0].geometry.location.lng}`);

}); 
console.log('----------------');

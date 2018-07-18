const request = require('request');
const yargs = require('yargs');

const PROPERTIES_WHITELIST = null; // set null to show all object's properties
const INDENT_SPACES = 2;
const argv = yargs
		.options({
			address: {
				demand : true
				,alias: 'a'
				,describe: 'Address to fetch for'
				,string: true
			}
		})
		.help()
		.alias('help', 'h')
		.argv;
		
var url 
	= `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent( argv.address )}&key=${ process.env.GEOKEY }`;

var reqObj = { url, json: true };
console.log(reqObj);

request(reqObj, (error, response, body) => {
	if(error)
		console.log(`An error has befallen. Unable to connect to ${error.host}`);
	else if(body.status === 'ZERO_RESULTS') 
		console.log(`That address yielded no results.`);
	else if(body.status === 'OK') {
		console.log( JSON.stringify(body, PROPERTIES_WHITELIST, INDENT_SPACES) );
		console.log(`${body.results[0].formatted_address}`);
		console.log(`\tLatitude: ${body.results[0].geometry.location.lat}`);
		console.log(`\tLongitude: ${body.results[0].geometry.location.lng}`);
	}

}); 
console.log('----------------');

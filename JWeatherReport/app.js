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

var coord;
var reqObj = { 
	url : `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent( argv.address )}&key=${ process.env.GEOKEY }`
	,json: true 
};

request(reqObj, (error, response, body) => {
	if(error)
		console.log(`An error has befallen. Unable to connect to ${error.host}`);
	else if(body.status === 'ZERO_RESULTS') 
		console.log(`That address yielded no results.`);
	else if(body.status === 'OK') {
		coord = {
			lat: body.results[0].geometry.location.lat
			,long: body.results[0].geometry.location.lng
		};
		reqObj.url 
			= `https://api.darksky.net/forecast/${ process.env.FORECASTKEY }/${coord.lat},${coord.long}?units=ca&exclude=minutely,hourly,daily`;

		console.log(`requesting weather info for coordinates [${coord.lat}, ${coord.long}]`);

		request(reqObj, (err, resp, theBody) => {
			if(err)
				console.log(`An error has befallen. Unable to connect to ${err.host}`);
			else if(new Number(resp.statusCode) >= 400 && new Number(resp.statusCode) <= 499 ) 
				console.log('There must be an error in request');
			else if(!err && new Number(resp.statusCode) == 200 )
				console.log(`\ttemp: ${theBody.currently.temperature} °C ( that feels like ${theBody.currently.apparentTemperature})`);
			else 
				console.log('For some reason couldnt get the weather information');
		}); 

	}
}); 

const units = {
	si	:	{name: 'si', note: 'International System, with windSpeed at meter/sec'}
	,ca	:	{name: 'ca', note: 'same as si, except that windSpeed is in km/h'}
};

console.log('----------------');

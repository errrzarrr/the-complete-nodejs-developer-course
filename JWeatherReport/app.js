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

const units = {
	si	:	{name: 'si', note: 'International System, with windSpeed at meter/sec'}
	,ca	:	{name: 'ca', note: 'same as si, except that windSpeed is in km/h'}
};

let getGeoCoords = (address) => {
	var reqObj = { 
		url : `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent( address )}&key=${ process.env.GEOKEY }`
		,json: true 
	};
	return new Promise((resolve, reject) => {
		request(reqObj, (error, response, body) => {
			if(error)
				reject(`An error has befallen. Unable to connect to ${error.host}`);
			else if(body.status === 'ZERO_RESULTS') 
				reject(`That address yielded no results.`);
			else if(body.status === 'OK') {
				coord = {
					lat: body.results[0].geometry.location.lat
					,long: body.results[0].geometry.location.lng
				};
				console.log(`\tCoordinates[lat, long] found: [${coord.lat}, ${coord.long}]`);
				resolve(coord);
			}
		});
	}); 
};

let getForecast = (coord) => {
	var reqObj = {
		url:`https://api.darksky.net/forecast/${ process.env.FORECASTKEY }/${coord.lat},${coord.long}?units=ca&exclude=minutely,hourly,daily`
		,json:true
	};
	return new Promise((resolve, reject) => {
		request(reqObj, (error, resp, body) => {
			console.log(`\tRequesting weather info for given coordinates`);
			if(error)
				reject(`An error has befallen. Unable to connect to ${error.host}`);
			else if( /^4[{\d}]{2}$/.test(resp.statusCode) ) 
				reject('There must be an error in request. Verify');
			else if(!error && new Number(resp.statusCode) == 200 )
				resolve(`\ttemp: ${body.currently.temperature} °C (that feels like ${body.currently.apparentTemperature})`);
			else 
				reject("For some reason couldn't get the weather information");
		});
	});
};
console.log('----------------');

getGeoCoords(argv.address)
	.then( (r) => getForecast(r) )
	.then( (r) => console.log(r) )
	.catch( (r) => console.log(r) );


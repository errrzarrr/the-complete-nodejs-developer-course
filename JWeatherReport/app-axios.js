/*this is the axios version of app.js
* instead of request library, we'll be using axios library
*/
const yargs = require('yargs');
const axios = require('axios');

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

var address = 
	`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent( argv.address )}&key=${ process.env.GEOKEY }`;

	axios.get(address)
		.then( (geoResp) => { 
			if (geoResp.data.status === 'ZERO_RESULTS')
				throw new Error(`That address yielded no results.`);	
			else if(geoResp.data.status === 'OK') {
				var coord = {
					lat: geoResp.data.results[0].geometry.location.lat
					,long: geoResp.data.results[0].geometry.location.lng
				};
				console.log(`\tCoordinates[lat, long] found: [${coord.lat}, ${coord.long}]`);
				return axios.get(`https://api.darksky.net/forecast/${ process.env.FORECASTKEY }/${coord.lat},${coord.long}?units=ca&exclude=minutely,hourly,daily`);
			}		
			console.log( geoResp.data.results[0].formatted_address );
		})
		.then( (forecastResp) => { 
			var temp = forecastResp.data.currently.temperature;
			var apparentTemp = forecastResp.data.currently.apparentTemperature;
			console.log(`\ttemp: ${temp} °C (that feels like ${apparentTemp})`);
		})
		.catch( (e) => {
			if(e.code === 'ENOTFOUND')
				console.log(`Unable to connect to API servers`);
			else
				console.log(e.message);
		});
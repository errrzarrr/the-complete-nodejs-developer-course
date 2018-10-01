const axios = require('axios');

const CURRKEY = process.env.CURRKEY;
const CURR_URL = "http://data.fixer.io/api"
const COUNTRY_URL = "https://restcountries.eu/rest/v2";


const getExchangeRate = async (from,to) => {
	try {
		const response = await axios.get(`${CURR_URL}/latest?access_key=${CURRKEY}`);
		const euro = 1 / response.data.rates[ from ];
		const rate = euro * response.data.rates[ to ];
		return rate;
	}
	catch(e) {
        throw new Error(`Unable to get Exchange Rate ${from}:${to}`);
    }
};

const getCountriesForCurrency = async (currencyCode) => {
	try {
		var response = await axios.get(`${COUNTRY_URL}/currency/${currencyCode}`);
		return response.data.map( country => country.name );
	}
	catch(e) {
		throw new Error(`Unable to get countries for currency with code '${currencyCode}'`);	
	}
};
const getCountry = async (countryCode) => {
    try{
        var response = await axios.get(`${COUNTRY_URL}/alpha/${countryCode}`);
        var country =response.data;
        return { nativeName: country.nativeName 
                ,name: country.name 
                ,alpha2Code: country.alpha2Code
                ,alpha3Code: country.alpha3Code
                ,UNM49Code : country.numericCode
                ,currencies: country.currencies.map( c => c.code)
            };
    }
    catch(e) {
        throw new Error(`Unable to get country with code '${countryCode}'`);
    }
};
const convertCurrency = async (from, to, amount) => {
    try {
		var rate = await getExchangeRate(from, to);
		return (amount * rate).toFixed(2);
	}
	catch(e) {
		throw new Error(`Unable to convert currency from '${from}' to '${to}'`);
	}
};
const convertCurrencyAndWhereUsed = async (from, to, amount) => {
	try {
		var rate = await getExchangeRate(from, to);
		var countries = await getCountriesForCurrency( to );
	
		var convertedAmount = (amount * rate).toFixed(2);
		return `${amount} ${from} is worth ${convertedAmount} ${to}. Officially valid in ${countries.join(', ')}`;
	}
	catch(e) {
		throw new Error(`Unable to convertCurrencyAndWhereUsed from '${from}' to '${to}'`);
	}
};
getExchangeRate( 'USD', 'DOP')
    .then(rate => console.log(rate))
    .catch( e => console.log(e));

convertCurrency('EUR', 'DOP', 5)
    .then(a => console.log(a))
    .catch( e => console.log(e));

getCountriesForCurrency('USD')
    .then(a => console.log('USD can be used at: '+a.join(', ')))
    .catch( e => console.log(e));
   
getCountry('ca')
    .then(a => console.log(a))
    .catch( e => console.log(e));
    
convertCurrencyAndWhereUsed('DOP', 'EUR', 500)
    .then(a => console.log(a))
    .catch( e => console.log(e));
	/*   

*/
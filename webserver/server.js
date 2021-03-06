const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const pug = require('pug');

var app = express();
const PORT = process.env.WEBSERVER_PORT || 3000;
let obj = {};
const LOG_FILE = 'log/requests.log';

// app.get(``, (req, res) => {});
 
/* by default it looks into 'views' dir
* to set it otherwise:
* app.set('views', __dirname+'/altDirName');   
*/
app.set('view engine', 'hbs');
hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('currentYear', () => new Date().getFullYear());
hbs.registerHelper('codeToChar', (num) => String.fromCodePoint(num));
hbs.registerHelper('linkify', (href, text) => {
	//href = handlebars.escapeExpression(href);
	//text = handlebars.escapeExpression(text);	
	//	return new Handlebars.SafeString(`<a href='${href}'>${text}</a>`);
	
	return `<a href='${href}'>${text}</a>`;
});

/* Since this isn't next()'ed, the execution is halted
* hence, subsequent pages or methods aren't shown.
* Take notice this should be done BEFORE exposing the '/public' dir.
* Otherwise, resources there would be accessible even under maintenance.
*
* Uncomment to go into maintenance mode.
 app.use((req, res, next) => res.render('maintenance.hbs') );	
*/

// everything inside this dir is publicly exposed
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {  
	var d = new Date();
	var now 
		= d.toISOString().slice(0,10) +' '+d.toLocaleTimeString();
	var log = `[${now}] ${req.method} : ${req.url}`;

	console.log(log);
	fs.appendFile(LOG_FILE, log+'\n', 'utf8', (error) => {
		if(error)
			console.log(`An error happened while writting into ${LOG_FILE}`);
	});
	next();
});

app.get(`/`, (req, res) => {
	obj = {
		pageTitle:	"Home"
		,subMessage:"Welcome to our site. Feel free to nagivate broadly."
	};	
	res.render('home.hbs', obj);
});
app.get(`/about`, (req, res) => {
	var about = {
		name: 'Rob'
		,likes: [ 'Rock', 'Metal', 'PlayStation', 'Coding', 'Weightlifting', 'Running' ]
	};
	res.status(200).send(about);
});
app.get(`/bad`, (req, res) => {
	var err = {errorMessage: "Error. This request didn't went well."};
	res.status(400)
		.set('X-Powered-By', 'Rob API')
		.send(err);
});
app.get(`/ourproducts`, (req, res) => {
	obj = {
		pageTitle: "Our Products"
		,subMessage: "Welcome to our wide catalogue of products we have to offer you."
		,currencySymbol:"$"
		,products: [ {
				name:"G.H. Bass & Co. Men's Bennett Boot"
				,price:80.08
				,description:"Rough but elegant manly chukka boot. Upper made of genuine leather, Rubber sole"
				,available: true
			}
			,{
				name:"Nunn Bush Men's Quail Valley Slip-on Loafer"
				,price:39.99
				,description:"Elegant but fresh lightweight driver-style shoes. Man Made, Imported, Synthetic sole"
				,available: false
			}
			,{
				name:"BRUNO MARC NEW YORK Men's Desert Storm  Boots"
				,price:21.99
				,description:"suede leather suede leather, comes in a wide variety of colors"
				,available: true
			}		
		]
	};
	res.render('ourproducts.hbs', obj);
});
app.get(`/product`, (req, res) => {
	obj = {
		pageTitle: "Product Details"
		,subMessage: "Product broad and deep details for this particular product —so you can buy best informed"
		,currencySymbol:"$"
		,currentYear: 2018
		,product: {
			name:"BRUNO MARC NEW YORK Men's Desert Storm  Boots"
			,price:21.99
			,description:"suede leather suede leather, comes in a wide variety of colors"
			,available: true
			,weight: 2
			,categories: ['shoes', 'boots', 'casual', 'for work']				
		}
	};
	
	var html = pug.renderFile('./views/product.pug', obj);
	res.send(html);
});
app.get(`/helloworld`, (req, res) => 	
	res.status(200).send('Hello World')
);

app.listen(PORT, () =>
	console.log(`Server up & running on port ${PORT}`)
);

module.exports.app = app;
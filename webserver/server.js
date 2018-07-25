const express = require('express');
const hbs = require('hbs');

var app = express();
const PORT = 3000;

// app.get(``, (req, res) => {});
 
// everything inside this dir is publicly exposed
app.use(express.static(`${__dirname}/public`));

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


let obj = {};

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
	res.send(about);
});
app.get(`/bad`, (req, res) => {
	var err = {errorMessage: "Error. This didn't went well."};
	res.send(err);
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
			},
		
		]
	};
	res.render('ourproducts.hbs', obj);
});

app.listen(PORT, () =>
	console.log(`Server up & running on port ${PORT}`)
);
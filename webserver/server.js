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
	};
	res.render('ourproducts.hbs', obj);
});

app.listen(PORT, () =>
	console.log(`Server up & running on port ${PORT}`)
);
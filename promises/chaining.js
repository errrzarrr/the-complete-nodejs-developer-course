// chaining those promises.

const getRandomInt 
	= (min, max) =>  Math.floor(Math.random() * (max - min)) + min;

const placeBet = (amount) => {
	var boolRand 
		= getRandomInt(0,2)  === 1 ? true : false;
	if(boolRand)
		return Promise.resolve(amount);
	else
		return Promise.reject( 'Bets not open now' );
};

const  throwDice = (guess) => {
	var dice = getRandomInt(1,6);
	if( guess === dice)
		return 'succeed';
	else
		return Promise.reject('try again');
};

placeBet(5000)
	.then( 	throwDice(1) )
	.then( (res) => console.log(res) )
	.catch( (res) => console.log(res) );

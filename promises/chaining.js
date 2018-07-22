// chaining those promises.

const getRandomInt 
	= (min, max) =>  Math.floor(Math.random() * (max - min)) + min;

const placeBet = (amount) => {
	var boolRand 
		= getRandomInt(0,2)  === 1 ? true : false;
	return new Promise( (resolve, reject) => {
		if(boolRand)
			resolve(amount);
		else
			reject( 'Bets not open now' );
	});
};

const  throwDice = (guess) => {
	var dice = getRandomInt(1,6);
	return new Promise( (resolve, reject) => {
		if( guess === dice)
			resolve('succeed');
		else
			reject('try again');
	});
};

placeBet(5000)
	.then( () => {return throwDice(1)} )
	.then( (res) => console.log(res) )
	.catch( (res) => console.log(res) );
// chaining those promises.

const getRandomInt 
	= (min, max) =>  Math.floor(Math.random() * (++max - min)) + min;

const placeBet = (amount) => {
	var boolRand 
		= getRandomInt(0,1)  === 1 ? true : false;
	return new Promise( (resolve, reject) => {
		if(boolRand)
			resolve({amount, msg: 'Joined the bet'});
		else
			reject( 'Bets not open now' );
	});
};

const  throwDice = (guess, bet) => {
	var dice = getRandomInt(1,6);
	console.log(`${bet.msg}. Threw dice attemping a [${guess}] and got [${dice}]`);
	return new Promise( (resolve, reject) => {
		if( guess === dice)
			resolve({ amount: bet.amount, msg:'Succeed'});
		else
			reject('Dice missed. Try again');
	});
};

const betWon 
	= (res) => console.log(`${res.msg}! Won a bet of ${res.amount}$`)

const handleReject = (rej) => console.log(rej);

placeBet(5000)
	.then( (res) => { return throwDice(1, res) })
	.then( (res) => betWon(res) )
	.catch( (rej) => handleReject(rej) );
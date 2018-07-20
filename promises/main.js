var asyncAdd = (a, b) => new Promise((resolve,reject) => {
	setTimeout( () => {
		if(typeof a==='number' && typeof b==='number')
			resolve(a+b);
		else
			reject('Arguments must be numbers');
	},1500);
});

asyncAdd(5, 15)
	.then( (res) => console.log('total: ', res) )
	.catch( (res) => console.log(res) ); 

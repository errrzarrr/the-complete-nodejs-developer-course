const temp = {
	cToF  = (tempF) => (tempF - 32) / (9/5)
	,fToC = (tempC) =>  (tempC * 9/5) + 32
};

module.exports.temp = temp;

var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length >= 1;
};

module.exports = {isRealString};
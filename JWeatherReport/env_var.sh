FILENAME='key.txt';
export GEOKEY=$( sed -n '1p' $FILENAME ); 
echo 'GEOKEY set';
# To retrieve it from node: process.env.GEOKEY;

export FORECASTKEY=$( sed -n '2p' $FILENAME ); 
echo 'FORECASTKEY set';
# To retrieve it from node: process.env.FORECASTKEY;
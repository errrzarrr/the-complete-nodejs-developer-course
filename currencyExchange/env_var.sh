#!/bin/bash

FILENAME='keys.txt';
export CURRKEY=$( sed -n '1p' $FILENAME ); 
echo 'CURRKEY set';
# To retrieve it from node: process.env.CURRKEY;

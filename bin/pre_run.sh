#!/usr/bin/env bash

DIR_BIN="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR_BIN
cd node_modules
cd disposables

file=".babelrc"

if [ -f $file ] ; then
    rm $file
    echo "babel file remove"
fi
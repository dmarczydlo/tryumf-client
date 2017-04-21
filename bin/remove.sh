#!/usr/bin/env bash

DIR_BIN="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR_BIN
cd ..

rm node_modules
rm src
rm .babelrc
rm package.json
rm README.md
rm webpack-dev-server.config.js
rm webpack-production.config.js
mv public/* ./
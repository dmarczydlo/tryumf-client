#!/usr/bin/env bash
DIR_BIN="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR_BIN
cd ..
cat > composer.json <<- "EOF"
{}
EOF


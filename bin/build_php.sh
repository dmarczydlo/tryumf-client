#!/usr/bin/env bash

echo "RUN POST BUILD SCRIPT"
DIR_BIN="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR_BIN
cd ..
cat > index.php <<- "EOF"
<?php include_once("./public/index.html"); ?>
EOF
echo 'SCRIPT DONE'

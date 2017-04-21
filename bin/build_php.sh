#!/usr/bin/env bash

DIR_BIN="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR_BIN
cd ../build
cat > index.php <<- "EOF"
<?php include_once("home.html"); ?>
EOF
mv index.html home.html
echo 'SCRIPT DONE'

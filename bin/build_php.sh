#!/usr/bin/env bash

DIR_BIN="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR_BIN
cd ..
cat > index.php <<- "EOF"
<?php include_once("./build/index.html"); ?>
EOF
echo 'SCRIPT DONE'

#!/usr/bin/env bash

echo "RUN POST BUILD SCRIPT"
DIR_BIN="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR_BIN
cd ..
cat > index.php <<- "EOF"
<?php include_once("public/index.html");
 echo "start";
 $files1 = scandir("./");
 echo "<pre>";
 print_r($files1);
 $files2 = scandir("./public/");
 echo "<pre>";
 print_r($files2);
?>
EOF
echo 'SCRIPT DONE'

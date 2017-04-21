#!/usr/bin/env bash

echo "RUN POST BUILD SCRIPT"
DIR_BIN="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR_BIN
cd ..
cd public
cat > index.php <<- "EOF"
<?php include_once("index.html");
$files1 = scandir("./");
echo "<pre>";
print_r($files1);
?>

EOF

cat > composer.json <<- "EOF"
{}
EOF

echo 'SCRIPT DONE'

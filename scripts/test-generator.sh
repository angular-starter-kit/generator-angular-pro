#!/bin/bash

# Simple testing script, that generates all kinds of projects and checks that
# generated projects build and pass tests.

set -e

export CWD=`pwd`
export SCRIPT_FOLDER=`dirname "${BASH_SOURCE[0]}"`
export TEST_FOLDER=$CWD/sample-app
export CACHE_FOLDER=$CWD/cache
export TEST_APP_NAME="Sample App"
export TEST_CASES=$SCRIPT_FOLDER/test-cases/**/*.json

function cleanup() {
    cd $CWD
    rm -rf $TEST_FOLDER
    rm -rf $CACHE_FOLDER
}

# Cleanup test folder in case of error
trap cleanup ERR

mkdir -p $CACHE_FOLDER

for file in $TEST_CASES
do

    mkdir -p $TEST_FOLDER
    cd $TEST_FOLDER

    if [ -d $CACHE_FOLDER/node_modules ]; then
        mv $CACHE_FOLDER/node_modules .
    fi

    echo
    echo -------------------------------------------------------------
    echo Testing generator with $file
    echo -------------------------------------------------------------
    echo

    yo angular-pro --automate "$CWD/$file" $TEST_APP_NAME

    gulp test
#    gulp clean && gulp protractor
#    gulp clean && gulp protractor:dist
    gulp clean && gulp build

    mv node_modules $CACHE_FOLDER

    cd $CWD
    rm -rf $TEST_FOLDER

done

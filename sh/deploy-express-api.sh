#!/bin/bash

project_path="/root/dev/projects/express-api"

timestamp=$(date "+%Y%m%d%H%M%S")

echo "strt at: $timestamp"

cd $project_path

git pull

yarn install --frozen-lockfile

killall -9 node

yarn start

echo "job succeed"
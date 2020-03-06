#!/bin/bash

project_path="/root/dev/projects/aliyun-site-ui"
serve_path="/root/site/nginx/static/"

timestamp=$(date "+%Y%m%d%H%M%S")

echo $timestamp

cd $project_path

git pull

yarn install --frozen-lockfile

yarn build

file_name="${timestamp}.release.zip"
zip -r $file_name ./build/

mv -f $file_name $serve_path

cd $serve_path

del "${serve_path}build/"

unzip $file_name
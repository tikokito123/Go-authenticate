#!/bin/sh

echo "creating .dev.env file"

touch ../.env.dev

echo -e "mongo_URL=\nPORT=80\nHOST=0.0.0.0\nJWT_TOKEN=" > ../.env.dev

cat ../.env.dev
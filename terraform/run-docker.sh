#!/bin/bash

export HOST=0.0.0.0
export PORT=80
export mongo_URL=mongodb+srv://tikokito:this_is_no_one@tinyurl-tikoweb.dpmu5.mongodb.net/Golang?retryWrites=true
export JWT_TOKEN=SomeTokenradns

docker pull tikokito/go-backend:latest 

docker run -itd -p 80:80 -e mongo_URL=${mongo_URL} -e JWT_TOKEN=${JWT_TOKEN} tikokito/go-backend:latest 



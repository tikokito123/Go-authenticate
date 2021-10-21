#!/bin/bash

export HOST=0.0.0.0
export PORT=80

docker pull tikokito/go-backend:latest 

docker run -itd -p 80:80 tikokito/go-backend:latest


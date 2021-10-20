#!/bin/bash

export HOST=0.0.0.0
export PORT=80

docker pull :latest #todo my image

docker run -it -p 80:80 #todo run my image

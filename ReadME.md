# Tikal Test

Hey there :), here is a little guide about the app and how to use it...
the app is simple... you have a home page, you can sign up and then see all the users in the db...
very secured I know :D (it was... hmm... it was a joke). the app has unit testing, docker file and ci/cd.
I used packer to build an ami with docker inside it. 

You upload the app on aws, the app will have 2 instances, both on the same region but different azs,
They have a load balancer who take cares of them.

## Guide to deploy on aws

#### prerequests

- packer (optional) to build ami

- terraform on your local machine if you want to test it locally

- AWS account with credantioals, if you want the app running on your account

- github account

- docker if you want to build locally, docker-compose if you want to use the docker-compose.yaml

## deploy with ci/cd

1. clone the repo! **https://github.com/tikokito123/Golang-Backend.git** to your remote!

2. go to github ```settings``` ==> ```secrets``` ==> ```new repository secret```

Add the next secrets:

- DOCKER_HUB_USERNAME=dockerhubUsername
 
- DOCKER_HUB_ACCESS_TOKEN=dockerhubAccessToken

- AWS_ACCESS_KEY_ID=Your AWS access key credantial!

- AWS_SECRET_ACCESS_KEY=Your AWS secret key credantial!

- MONGO_URL=your Mongo Atlas...

- HOST=0.0.0.0

- PORT=80

- JWT_TOKEN=JWT_This_ISS_MYyy_PAsSword

- TF_API_TOKEN=your terraform clound


3. create a .txt file and leave it empty for commiting a change...```git add.``` ```git commit -m "Hello-world"``` to the repo, ```git push```



#### side-note!!!

I know you see a k8s file in the repo... please ignore it! It is not part of the application.
although you can test it with minikube. 
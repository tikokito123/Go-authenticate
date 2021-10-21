# Tikal Test

Hey there :), here is a little guide about the app and how to use it...
the app is simple... you have a home page, you can sign up and then see all the users in the db...
very secured I know :D (it was... hmm... it was a joke). the app has unit testing, dockerfile and ci/cd using github actions.
I used packer to build an ami with docker inside it. So you don't need to worry about building the docker image or pulling it. everything is ready! 

You upload the app on aws, the app will have 2 instances, both on the same region but different azs,
They have alb who take cares of them.

## Guide to deploy on AWS

#### prerequests

- packer (optional) to build ami

- terraform on your local machine if you want to test it locally

- AWS account with credentials, if you want the app running on your account

- github account

- docker if you want to build locally, docker-compose if you want to use the docker-compose.yaml

## deploy with ci/cd

The ci/cd proccess handle by github actions

Lets create the enviourment for the CI/CD.

1. clone the repo! **https://github.com/tikokito123/Golang-Backend.git** to your remote!

2. go to github ```settings``` ==> ```secrets``` ==> ```new repository secret```

Add the next secrets:

- ```DOCKER_HUB_USERNAME```=dockerhubUsername
 
- ```DOCKER_HUB_ACCESS_TOKEN```=dockerhubAccessToken

- ```AWS_ACCESS_KEY_ID```=Your AWS access key credentials!

- ```AWS_SECRET_ACCESS_KEY```=Your AWS secret key credentials!

- ```MONGO_URL```= your Mongo Atlas...

- ```HOST```=0.0.0.0

- ```PORT```=80

- ```JWT_TOKEN```=JWT_This_ISS_MYyy_PAsSword

- ```TF_API_TOKEN```=your terraform clound


3. create a .txt file and leave it empty for commiting a change...```git add.``` ```git commit -m "Hello-world"``` to the repo, ```git push```




## deploy with your local machine


##### provide AWS credentials

To deploy the app with your local machine you will need terraform, and your AWS credentials!


1. go to terminal on your local machine

2.  > $ export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
    > $ export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

or on windows powershell

    > $Env:AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
    > $Env:AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"

### terraform

1. clone the repo! **https://github.com/tikokito123/Golang-Backend.git** to your directory! then, enter terraform folder: ```cd terraform```.

2. Run the command, ```terraform validate``` and ```terraform fmt .``` to check if everything is in place

3. Great! let's look at the vars.tf file,
first, where are you from? suggest you put the region you want to work with! Because it is free tier you can only use 3 tiers. Well, That what amazon told me. so on default it is ```us-east-2```, but you can change it to whatever you want. You also want to config your profile to fit, and your s3 service. PLEASE NOTE!!! you also need to change the s3 service name manually on ```terraform block``` inside ```backend```! 

4. Run the command, ```terraform init```, he will ask you for a aws access key, pass it through the console. you can also run the command ```terraform init -backend-config="key=${AWS_ACCESS_KEY_ID}"```. It's so it will have access to the console.

5. And now, the moment we all waiting for!! DRUMS~~~!!~!! ```terraform apply``` :O :O :O :O.
upload the terraform infrastructure to your cloud.

6. go to your aws ui, click on `ec2` --> `load balancers`. found the load balancer. Coppy the DNS name. paste it and you are in!

> Please make sure you have access to the s3 backend service.


### docker

Great! we have an infrastructure on aws, and it is running! but... what if we don't want an infrastructure because the app is so amazing we want to keep it to ourselves! Wow docker is here! great.

1. still on the terraform directory? ```cd ..```, not on the terrafrom directory? start building

2. set enviourments variables 
    `mongo_URL=mongodb://host.docker.internal:27017/`
    `JWT_TOKEN=SomeSecret`

3. `docker build -t user/go-backend .`

4. `docker run -it -p 80:80 user/go-backend`

5. Running (and pulling) mongo service: `docker run -itd -p 27017:27017 mongo:latest`

6. `docker ps` to validate if our docker container is running!

7. check it on your local machine with `localhost:80/` or `localhost`


### Docker-compose 

1. `docker-compose build`

2. `docker-compose up`

3. `docker ps` to validate if our docker container is running!

4. check it on your local machine with `localhost:80/` or `localhost`






#### SIDENOTES!

when the app in production, if you will take a look at the terraform folder, and then run-docker.sh, you will see that the app will connect to my mongoDb atlas. if you want to change it to your mongodb you can, although remember it is not safe to put the mongo_URL like that without a vault, I acknowledge the problem...



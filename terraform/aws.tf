terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  region  = var.region
  
  profile = var.profile

  access_key = "my-access-key"
  secret_key = "my-secret-key"
}

resource "aws_instance" "app_server" {
  ami           = var.ami
  instance_type = "t2.micro"

  tags = {
    Name = "TikalTestServerInstance"
  }
  provisioner "file" {
    source      = var.exec-sh-path
    destination = "/tmp/run-docker.sh"
  }
  provisioner "remote-exec" {
    inline = [
      "chmod +x /tmp/run-docker",
      "sudo /tmp/run-docker.sh"
    ]
  }
}


resource "aws_vpc" "main" {
  cidr_block       = "10.128.0.0/16"
  instance_tenancy = "default"

  tags = {
    Name = "main"
    Location = "Frankfrut"
  }
}

resource "aws_subnet" "subnet_public-1" {
  vpc_id = "${aws_vpc.main.id}"
  map_public_ip_on_launch = "true"
  cidr_block = "10.128.0.0/19"
  availability_zone = "${var.region}a"

   tags = {
     name = "subnet_for_instance_1"
   }
 }

 resource "aws_subnet" "subnet_public-2" {
   vpc_id = "${aws_vpc.main.id}"
   map_public_ip_on_launch = "true"
   cidr_block = "10.128.32.0/19"
   availability_zone = "${var.region}b"
   
   tags = {
     name = "subnet_for_instance_2"
   }
 }



resource "aws_internet_gateway" "igw" {
    vpc_id = "${aws_vpc.main.id}"
    tags = {
        Name = "igw"
    }
}

resource "aws_route_table" "public-route" {
    vpc_id = "${aws_vpc.main.id}"
    
    route {
        //associated subnet can reach everywhere
        cidr_block = "0.0.0.0/0"
        gateway_id = "${aws_internet_gateway.igw.id}" 
    }
    
    tags = {
        Name = "public-route"
    }
}


resource "aws_elb" "webapp_elb" {
  name               = "terraform-webapp_elb"
  availability_zones = ["${var.region}a", "${var.region}b", "${var.region}c"]

  access_logs {
    bucket        = "logs"
    bucket_prefix = "bucket"
    interval      = 60
  }

  listener {
    instance_port     = 80
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    target              = "HTTP:80/"
    interval            = 30
  }

  instances                   = [aws_instance.app_server.id]
  cross_zone_load_balancing   = true
  idle_timeout                = 400
  connection_draining         = true
  connection_draining_timeout = 400

  tags = {
    Name = "terraform-web_app-elb"
  }
}




resource "aws_route_table_association" "asspcoation-public-subnet-1"{
    subnet_id = "${aws_subnet.subnet_public-1.id}"
    route_table_id = "${aws_route_table.public-route.id}"
}

resource "aws_route_table_association" "asspcoation-public-subnet-2"{
    subnet_id = "${aws_subnet.subnet_public-2.id}"
    route_table_id = "${aws_route_table.public-route.id}"
}


resource "aws_security_group" "firewall-allow" {
    vpc_id = "${aws_vpc.main.id}"
    
    egress {
        from_port = 0
        to_port = 0
        protocol = -1
        cidr_blocks = ["0.0.0.0/0"]
      }    
    ingress {
        from_port = 80
        to_port = 80
        protocol = "http" 
        cidr_blocks = ["0.0.0.0/0"]
      }   
    tags = {
        Name = "firewall-allowed"
    }
}
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  backend "s3" {
    bucket = "terraform-with-ci-cd"
    region = "us-east-2"
    key    = ".terraform/terraform.tfsafe"
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  region  = var.region
  profile = var.profile
}



module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "tikal-mission-VPC"
  cidr = "10.128.0.0/16"

  azs            = ["${var.region}a", "${var.region}b", "${var.region}c"]
  public_subnets = ["10.128.0.0/19", "10.128.32.0/19"]

  enable_nat_gateway = true
  enable_vpn_gateway = true

  tags = {
    Terraform   = "true"
    Environment = var.env

  }

}

resource "aws_security_group" "firewall" {
  vpc_id = module.vpc.vpc_id

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  // this is here only for testing! do not use it in production!!!
  // ingress {
  //   from_port   = 22
  //   to_port     = 22
  //   protocol    = "tcp"
  //   cidr_blocks = ["0.0.0.0/0"]
  // }

}

// WARNING! billing!

// resource "aws_launch_template" "template" {
//   name_prefix            = "instance-auto-scalling"
//   image_id               = var.ami
//   instance_type          = "t2.micro"
//   vpc_security_group_ids = [aws_security_group.firewall.id]
//   user_data              = filebase64("./run-docker.sh")
// }





resource "aws_launch_configuration" "web" {
  name_prefix = "web-"

  image_id      = var.ami
  instance_type = "t2.micro"

  security_groups             = [aws_security_group.firewall.id]
  associate_public_ip_address = true

  user_data = "${filebase64("./run-docker.sh")}"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_autoscaling_group" "auto-scalling" {
  vpc_zone_identifier  = [module.vpc.public_subnets[0], module.vpc.public_subnets[1]]
  desired_capacity     = 2
  max_size             = 3
  min_size             = 1
  launch_configuration = aws_launch_configuration.web.name
  health_check_type    = "ELB"

  load_balancers = [
    aws_elb.web_elb.id
  ]
  // launch_template will trigger your credit card
  // launch_template {
  //   id = aws_launch_template.template.id
  // }
  lifecycle {
    create_before_destroy = true
  }
}


resource "aws_elb" "web_elb" {
  name = "web-elb"
  security_groups = [
    aws_security_group.firewall.id
  ]
  subnets = [module.vpc.public_subnets[0], module.vpc.public_subnets[1]]

  cross_zone_load_balancing = true

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 3
    timeout             = 3
    interval            = 30
    target              = "HTTP:80/"
  }

  listener {
    lb_port           = 80
    lb_protocol       = "http"
    instance_port     = "80"
    instance_protocol = "http"
  }

  tags = {
    Name      = "web_ELB"
    terraform = "True"
  }

}

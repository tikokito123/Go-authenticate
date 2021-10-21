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
}

resource "tls_private_key" "private_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "key" {
  key_name   = "webapp_tikal_test"
  public_key = tls_private_key.private_key.public_key_openssh
}

resource "aws_instance" "app_server" {
  ami           = var.ami
  instance_type = "t2.micro"
  count = 2
  subnet_id              = "${element(module.vpc.public_subnets, count.index)}"
  key_name               = aws_key_pair.key.key_name
  user_data              = file("./run-docker.sh")
  vpc_security_group_ids = ["${aws_security_group.firewall.id}"]

  tags = {
    Name      = "TikalTestServerInstance"
    Terraform = "true"
    ENV       = var.env
  }

}


module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "my-vpc"
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

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

}


module "alb" {
  source  = "terraform-aws-modules/alb/aws"
  version = "~> 6.0"

  name = "my-alb"

  load_balancer_type = "application"

  vpc_id             = "vpc-abcde012"
  subnets            = ["subnet-abcde012", "subnet-bcde012a"]
  security_groups    = ["sg-edcd9784", "sg-edcd9785"]

  access_logs = {
    bucket = "my-alb-logs"
  }

  target_groups = [
    {
      name_prefix      = "pref-"
      backend_protocol = "HTTP"
      backend_port     = 80
      target_type      = "instance"
      targets = [
        {
          target_id = "i-0123456789abcdefg"
          port = 80
        },
        {
          target_id = "i-a1b2c3d4e5f6g7h8i"
          port = 8080
        }
      ]
    }
  ]

  https_listeners = [
    {
      port               = 443
      protocol           = "HTTPS"
      certificate_arn    = "arn:aws:iam::123456789012:server-certificate/test_cert-123456789012"
      target_group_index = 0
    }
  ]

  http_tcp_listeners = [
    {
      port               = 80
      protocol           = "HTTP"
      target_group_index = 0
    }
  ]

  tags = {
    Environment = "Test"
  }
}



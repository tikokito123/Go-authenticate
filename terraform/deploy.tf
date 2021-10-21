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
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  region  = var.region
  profile = var.profile
}

// resource "aws_s3_bucket" "s3Bucket" {
//   bucket = var.bucket_name
//   acl    = "public-read"

//   policy = <<EOF
// {
//   "Id": "MakePublic",
//   "Version": "2012-10-17",
//   "Statement": [
//     {
//       "Action": [
//         "s3:GetObject"
//       ],
//       "Effect": "Allow",
//       "Resource": "arn:aws:s3:::terraformwithcicd/*",
//       "Principal": "*"
//     }
//   ]
// }
// EOF

//   website {
//     index_document = "index.html"
//   }
// }

resource "tls_private_key" "private_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "key" {
  key_name   = "keyPair${random_shuffle.az.result[1]}"
  public_key = tls_private_key.private_key.public_key_openssh
}

resource "aws_instance" "app_server" {
  ami                    = var.ami
  instance_type          = "t2.micro"
  count                  = 2
  subnet_id              = element(module.vpc.public_subnets, count.index)
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
  // this is here only for testing! do not use it in production!!!
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

}
resource "random_shuffle" "az" {
  input        = ["alb", "tikal", "tikokito", "devops"]
  result_count = 2
}

module "alb" {
  source  = "terraform-aws-modules/alb/aws"
  version = "~> 6.0"
  name    = "alb${random_shuffle.az.result[0]}"

  load_balancer_type = "application"

  vpc_id          = module.vpc.vpc_id
  subnets         = [module.vpc.public_subnets[0], module.vpc.public_subnets[1]]
  security_groups = [aws_security_group.firewall.id]

  target_groups = [
    {
      name_prefix      = "pref-"
      backend_protocol = "HTTP"
      backend_port     = 80
      target_type      = "instance"
      targets = [
        {
          target_id = "${aws_instance.app_server[0].id}"
          port      = 80
        },
        {
          target_id = "${aws_instance.app_server[1].id}"
          port      = 80
        }
      ]
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
    Environment = var.env
    terraform   = "true"
  }
}



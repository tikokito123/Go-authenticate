packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

source "amazon-ebs" "ubuntu" {
  ami_name      = "tikokito/ubuntu-with-docker-20.04"
  instance_type = "t2.micro"
  region        = "us-east-2"

  source_ami_filter {
    filters = {
      name                = "ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["099720109477"]
  }
  ssh_username = "ubuntu"
}

build {
  name = "build-packer-docker"
  sources = [
    "source.amazon-ebs.ubuntu"
  ]

  provisioner "shell" {
    environment_vars = [

    ]
    inline = [
      "echo Installing docker",

      "sudo apt update",
      "sudo apt -y upgrade",

      "sudo apt -y install docker.io",

      "sudo systemctl start docker",
      "sudo systemctl enable docker",

      "echo adding user to docker group",

      "sudo usermod -aG docker ubuntu",
      "newgrp docker",

      "docker --version"
    ]
  }

}

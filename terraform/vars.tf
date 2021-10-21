variable "region" {
  default = "us-east-2"
}

variable "exec-sh-path" {
  default = "./run-docker.sh"
}

variable "ami" {
  default = "ami-0c544fb1ed26c3b00"
}

variable "profile" {
  default = "Amir"
}

variable "env" {
  default     = "production"
  description = "the env you upload terraform with"
}

variable "bucket_name" {
  default = "terraformwithcicd"
}

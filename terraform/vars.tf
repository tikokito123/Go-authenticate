variable "region"{
  default = "eu-central-1"
}

variable "exec-sh-path" {
    default = "./run-docker.sh"
}

variable "ami" {
    default = "ami-017989ecf53fd51ce"
}

variable "profile" {
    default = "TIKOKITO"
}

variable "access_key" {
    type = string
    description = ["your aws access_key"]
}
variable "secret_key" {
    type = string
    description = ["your aws secret_key"]
}   

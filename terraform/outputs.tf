output "vpc_id" {
  description = "ID of project VPC"
  value       = module.vpc.vpc_id
}

output "subnet_ids" {
  value = [module.vpc.public_subnets[0], module.vpc.public_subnets[1]]
}
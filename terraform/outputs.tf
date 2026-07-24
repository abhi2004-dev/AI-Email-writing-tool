output "container_id" {
  description = "The ID of the local Nginx test container"
  value       = docker_container.infra_test.id
}

output "container_ip" {
  description = "The IP address of the local Nginx test container"
  value       = docker_container.infra_test.network_data[0].ip_address
}
# =============================================================================
# Terraform Outputs
# =============================================================================

output "cluster_name" {
  description = "The name of the GKE cluster"
  value       = google_container_cluster.primary.name
}

output "cluster_endpoint" {
  description = "The GKE cluster endpoint"
  value       = google_container_cluster.primary.endpoint
  sensitive   = true
}

output "cluster_ca_certificate" {
  description = "The cluster CA certificate (base64 encoded)"
  value       = google_container_cluster.primary.master_auth[0].cluster_ca_certificate
  sensitive   = true
}

output "vpc_network" {
  description = "The VPC network name"
  value       = google_compute_network.vpc.name
}

output "subnet_name" {
  description = "The subnet name"
  value       = google_compute_subnetwork.subnet.name
}

output "gke_service_account" {
  description = "The GKE service account email"
  value       = google_service_account.gke_sa.email
}

output "kubectl_config_command" {
  description = "Command to configure kubectl"
  value       = "gcloud container clusters get-credentials ${google_container_cluster.primary.name} --zone ${var.zone} --project ${var.project_id}"
}

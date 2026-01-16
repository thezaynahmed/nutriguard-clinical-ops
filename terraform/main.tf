# =============================================================================
# NutriGuard Infrastructure as Code
# Terraform configuration for Google Cloud Platform
# =============================================================================

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.25"
    }
  }

  # Remote state configuration
  backend "gcs" {
    bucket = "nutriguard-terraform-state"
    prefix = "terraform/state"
  }
}

# =============================================================================
# Provider Configuration
# =============================================================================

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

# Configure Kubernetes provider after GKE cluster is created
provider "kubernetes" {
  host                   = "https://${google_container_cluster.primary.endpoint}"
  token                  = data.google_client_config.default.access_token
  cluster_ca_certificate = base64decode(google_container_cluster.primary.master_auth[0].cluster_ca_certificate)
}

data "google_client_config" "default" {}

# =============================================================================
# Variables
# =============================================================================

variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "region" {
  description = "GCP Region"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "GCP Zone"
  type        = string
  default     = "us-central1-a"
}

variable "environment" {
  description = "Environment name (production, staging)"
  type        = string
  default     = "production"
}

# =============================================================================
# Networking
# =============================================================================

resource "google_compute_network" "vpc" {
  name                    = "nutriguard-vpc"
  auto_create_subnetworks = false
  project                 = var.project_id
}

resource "google_compute_subnetwork" "subnet" {
  name          = "nutriguard-subnet"
  ip_cidr_range = "10.0.0.0/24"
  region        = var.region
  network       = google_compute_network.vpc.id
  project       = var.project_id

  secondary_ip_range {
    range_name    = "pods"
    ip_cidr_range = "10.1.0.0/16"
  }

  secondary_ip_range {
    range_name    = "services"
    ip_cidr_range = "10.2.0.0/20"
  }
}

# =============================================================================
# GKE Cluster
# =============================================================================

resource "google_container_cluster" "primary" {
  name     = "nutriguard-cluster"
  location = var.zone
  project  = var.project_id

  # We can't create a cluster with no node pool defined, but we want to only use
  # separately managed node pools. So we create the smallest possible default
  # node pool and immediately delete it.
  remove_default_node_pool = true
  initial_node_count       = 1

  network    = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name

  ip_allocation_policy {
    cluster_secondary_range_name  = "pods"
    services_secondary_range_name = "services"
  }

  # Enable Workload Identity
  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"
  }

  # Enable Network Policy
  network_policy {
    enabled  = true
    provider = "CALICO"
  }

  # Release channel for automatic upgrades
  release_channel {
    channel = "REGULAR"
  }

  # Logging and Monitoring
  logging_config {
    enable_components = ["SYSTEM_COMPONENTS", "WORKLOADS"]
  }

  monitoring_config {
    enable_components = ["SYSTEM_COMPONENTS"]
    managed_prometheus {
      enabled = true
    }
  }
}

# =============================================================================
# GKE Node Pool
# =============================================================================

resource "google_container_node_pool" "primary_nodes" {
  name       = "nutriguard-node-pool"
  location   = var.zone
  cluster    = google_container_cluster.primary.name
  project    = var.project_id
  node_count = 3

  node_config {
    preemptible  = false
    machine_type = "e2-medium"

    # Google recommends custom service accounts with cloud-platform scope
    service_account = google_service_account.gke_sa.email
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]

    labels = {
      env = var.environment
      app = "nutriguard"
    }

    # Enable workload identity on nodes
    workload_metadata_config {
      mode = "GKE_METADATA"
    }
  }

  autoscaling {
    min_node_count = 3
    max_node_count = 10
  }

  management {
    auto_repair  = true
    auto_upgrade = true
  }
}

# =============================================================================
# Service Accounts
# =============================================================================

resource "google_service_account" "gke_sa" {
  account_id   = "nutriguard-gke-sa"
  display_name = "NutriGuard GKE Service Account"
  project      = var.project_id
}

resource "google_project_iam_member" "gke_sa_roles" {
  for_each = toset([
    "roles/logging.logWriter",
    "roles/monitoring.metricWriter",
    "roles/monitoring.viewer",
    "roles/stackdriver.resourceMetadata.writer",
  ])

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.gke_sa.email}"
}

# =============================================================================
# Cloud SQL (Future - PostgreSQL for production data)
# =============================================================================

# resource "google_sql_database_instance" "main" {
#   name             = "nutriguard-db"
#   database_version = "POSTGRES_15"
#   region           = var.region
#   project          = var.project_id
#
#   settings {
#     tier = "db-f1-micro"
#     
#     backup_configuration {
#       enabled = true
#     }
#   }
# }

# =============================================================================
# Outputs
# =============================================================================

output "cluster_name" {
  value       = google_container_cluster.primary.name
  description = "GKE Cluster Name"
}

output "cluster_endpoint" {
  value       = google_container_cluster.primary.endpoint
  description = "GKE Cluster Endpoint"
  sensitive   = true
}

output "cluster_ca_certificate" {
  value       = google_container_cluster.primary.master_auth[0].cluster_ca_certificate
  description = "GKE Cluster CA Certificate"
  sensitive   = true
}

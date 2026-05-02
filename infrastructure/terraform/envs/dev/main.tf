module "hybrid_network" {
  source = "./modules/networking"

  vpc_cidr = "10.50.0.0/16"
}

module "hybrid_identity_cluster" {
  source = "./modules/compute"

  cluster_name = "identity-sync-hub"
  node_count   = 2
}

module "hybrid_metadata_db" {
  source = "./modules/database"

  instance_class = "db.t3.small"
}

resource "kubernetes_namespace" "w365_ops" {
  metadata {
    name = "windows-365-hybrid"
  }
}

resource "aws_vpn_gateway" "hybrid_vpn" {
  vpc_id = module.hybrid_network.vpc_id
}

resource "aws_customer_gateway" "on_prem_gateway" {
  bgp_asn    = 65000
  ip_address = "203.0.113.12"
  type       = "ipsec.1"
}

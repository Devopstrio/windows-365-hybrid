import uuid
import time

class IdentityEngine:
    def __init__(self):
        self.ad_users = [
            {"username": "jdoe", "name": "John Doe", "department": "Finance", "sid": "S-1-5-21-123"},
            {"username": "asmith", "name": "Alice Smith", "department": "IT", "sid": "S-1-5-21-456"}
        ]
        self.azure_ad_users = []

    def sync_to_azure_ad(self):
        # Simulated AD Connect sync
        self.azure_ad_users = [
            {**u, "aad_id": str(uuid.uuid4()), "upn": f"{u['username']}@corp.com"}
            for u in self.ad_users
        ]
        return len(self.azure_ad_users)

class ProvisioningEngine:
    def __init__(self):
        self.cloud_pcs = {}

    def provision_pc(self, upn, spec="2vCPU/8GB/128GB"):
        pc_id = f"CPC-{uuid.uuid4().hex[:6].upper()}"
        self.cloud_pcs[upn] = {
            "pc_id": pc_id,
            "status": "PROVISIONING",
            "spec": spec,
            "created_at": time.time(),
            "last_seen": None
        }
        return pc_id

    def get_status(self, upn):
        return self.cloud_pcs.get(upn, {"status": "NOT_FOUND"})

class DevicePolicyEngine:
    def evaluate_compliance(self, pc_data):
        # Simulated Intune compliance check
        checks = {
            "os_version": True,
            "encryption_enabled": True,
            "firewall_active": True,
            "antivirus_active": True
        }
        is_compliant = all(checks.values())
        return {"is_compliant": is_compliant, "checks": checks}

class CostModeler:
    def estimate_monthly_cost(self, num_pcs):
        # Mock Windows 365 licensing
        price_per_user = 31.0 # 2vCPU/8GB Business
        return {
            "total_monthly": num_pcs * price_per_user,
            "currency": "USD",
            "license_type": "Windows 365 Business"
        }

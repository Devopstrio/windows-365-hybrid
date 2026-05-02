from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from core.provisioning.engine import IdentityEngine, ProvisioningEngine, DevicePolicyEngine, CostModeler

app = FastAPI(title="Windows 365 Hybrid API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

identity = IdentityEngine()
provisioning = ProvisioningEngine()
policy = DevicePolicyEngine()
cost = CostModeler()

@app.get("/health")
def health():
    return {"status": "ok", "service": "windows-365-hybrid"}

@app.post("/users/sync")
def sync_users():
    count = identity.sync_to_azure_ad()
    return {"status": "SUCCESS", "synced_users": count}

@app.post("/cloudpc/provision")
def provision_pc(data: dict = Body(...)):
    upn = data.get("upn")
    if not upn:
        raise HTTPException(status_code=400, detail="UPN required")
    pc_id = provisioning.provision_pc(upn)
    return {"status": "PROVISIONING", "pc_id": pc_id}

@app.get("/devices")
def list_devices():
    devices = []
    for upn, pc in provisioning.cloud_pcs.items():
        compliance = policy.evaluate_compliance(pc)
        devices.append({
            "upn": upn,
            "pc_id": pc["pc_id"],
            "status": pc["status"],
            "compliance": compliance
        })
    return {"devices": devices}

@app.get("/dashboard/summary")
def get_summary():
    num_pcs = len(provisioning.cloud_pcs)
    return {
        "total_cloud_pcs": num_pcs,
        "active_sessions": 42,
        "compliant_devices": num_pcs, # Simplification
        "monthly_cost": cost.estimate_monthly_cost(num_pcs)["total_monthly"]
    }

@app.get("/metrics")
def get_metrics():
    return {
        "avg_provisioning_time_min": 18.5,
        "round_trip_latency_ms": 32,
        "connection_success_rate": 0.999
    }

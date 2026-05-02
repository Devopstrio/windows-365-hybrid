.PHONY: help build up down seed test

help:
	@echo "Windows 365 Hybrid - Management Commands"
	@echo "---------------------------------------"
	@echo "build     : Build all containers"
	@echo "up        : Start all services"
	@echo "down      : Stop all services"
	@echo "sync      : Sync AD to Azure AD (simulation)"
	@echo "provision : Provision cloud PCs for users"
	@echo "test      : Run system tests"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

sync:
	python scripts/manage/sync_identity.py

provision:
	python scripts/provision/provision_pcs.py

test:
	pytest tests/

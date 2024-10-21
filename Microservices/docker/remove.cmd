@echo off

:: Shutdown running Docker containers.
docker compose down

:: Remove Docker images.
docker rmi dosomedev-catalog:0.0.1
docker rmi dosomedev-order:0.0.1
docker rmi dosomedev-payment:0.0.1
docker rmi dosomedev-shipping:0.0.1
docker rmi dosomedev-view:0.0.1

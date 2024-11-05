@echo off

:: Stop and remove Docker containers
docker-compose down

:: Remove the directory
rmdir /s /q .\db

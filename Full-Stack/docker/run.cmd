@echo off

:: Stop MySQL service (if applicable)
:: This step might vary depending on your MySQL installation.

:: Create the directory
md .\db

:: Start Docker containers
docker-compose up -d

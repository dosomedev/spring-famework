@echo off

:: Copy services into temp directory
xcopy ..\microservices\services .\tmp\ /e

:: Build Spring microservices.
cd tmp\catalog
call build.cmd
cd ..\..

cd tmp\order
call build.cmd
cd ..\..

cd tmp\payment
call build.cmd
cd ..\..

cd tmp\shipping
call build.cmd
cd ..\..

cd tmp\view
call build.cmd
cd ..\..

:: Set vars.
set CONTAINER_NAME_CATALOG=dosomedev-catalog
set CONTAINER_VERSION_CATALOG=0.0.1

set CONTAINER_NAME_ORDER=dosomedev-order
set CONTAINER_VERSION_ORDER=0.0.1

set CONTAINER_NAME_PAYMENT=dosomedev-payment
set CONTAINER_VERSION_PAYMENT=0.0.1

set CONTAINER_NAME_SHIPPING=dosomedev-shipping
set CONTAINER_VERSION_SHIPPING=0.0.1

set CONTAINER_NAME_VIEW=dosomedev-view
set CONTAINER_VERSION_VIEW=0.0.1

:: Build Docker images.
docker build -t "%CONTAINER_NAME_CATALOG%:%CONTAINER_VERSION_CATALOG%" -f dockerfile-catalog .
docker build -t "%CONTAINER_NAME_ORDER%:%CONTAINER_VERSION_ORDER%" -f dockerfile-order .
docker build -t "%CONTAINER_NAME_PAYMENT%:%CONTAINER_VERSION_PAYMENT%" -f dockerfile-payment .
docker build -t "%CONTAINER_NAME_SHIPPING%:%CONTAINER_VERSION_SHIPPING%" -f dockerfile-shipping .
docker build -t "%CONTAINER_NAME_VIEW%:%CONTAINER_VERSION_VIEW%" -f dockerfile-view .

:: Remove services temp directory.
rmdir /s /q tmp

:: Start Docker containers.
docker-compose up -d

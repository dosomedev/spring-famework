@echo off

cd dosomedev-view

:: Install project libraries.
call npm install

:: Run application in development mode.
call npm run build

cd ..
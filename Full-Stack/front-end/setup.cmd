@echo off

:: Install Vite boilerplate React project.
npm create vite@5.5.4 web-view -- --template react-ts --yes

cd web-view

:: Install Material UI, Roboto font, and Material Icons.
npm install @mui/material @emotion/react @emotion/styled @fontsource/roboto @mui/icons-material
:: Install Roboto font.
npm install @fontsource/roboto

:: Install Material Icons.
npm install @mui/icons-material

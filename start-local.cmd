@echo off
setlocal
cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js and npm are required. Install the LTS version from https://nodejs.org/
  pause
  exit /b 1
)

echo Starting the local service...
echo Open http://localhost:4173/ in your browser.
echo Press Ctrl+C or close this window to stop the service.
echo.

start "" "http://localhost:4173/"
call npm run start

if errorlevel 1 pause

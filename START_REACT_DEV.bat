@echo off
title P101 React/Vite Local Dev Server
cd /d "%~dp0"
set "PATH=C:\Users\laure\AppData\Local\Programs\MinGit\cmd;C:\Users\laure\AppData\Local\Programs\NodeJS;%PATH%"

echo ========================================================================
echo               STARTING P101 REACT + VITE LOCAL DEV SERVER
echo ========================================================================
echo.
echo Starting Vite... Open http://localhost:5173/P101/ in your browser.
echo Press Ctrl+C in this terminal to stop the server.
echo.
npm.cmd run dev
pause

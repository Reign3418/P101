@echo off
title Deploy P101 to GitHub Pages
cd /d "%~dp0"
set "PATH=C:\Users\laure\AppData\Local\Programs\MinGit\cmd;C:\Users\laure\AppData\Local\Programs\NodeJS;%PATH%"

echo ========================================================================
echo              BUILDING & DEPLOYING P101 TO GITHUB PAGES
echo ========================================================================
echo.
echo Step 1: Building production bundle with Vite...
call npm.cmd run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo Step 2: Pushing to gh-pages branch on GitHub...
cd dist
git init -b gh-pages >nul 2>&1
git config user.name "Reign3418"
git config user.email "reign3418@users.noreply.github.com"
git remote add origin https://github.com/Reign3418/P101.git >nul 2>&1
git add .
git commit -m "deploy: update GitHub Pages bundle" >nul 2>&1
git push -f origin gh-pages
cd ..
rmdir /s /q dist\.git >nul 2>&1

echo.
echo ========================================================================
echo  SUCCESS! Your site has been updated on GitHub Pages!
echo  Visit: https://reign3418.github.io/P101/
echo ========================================================================
pause

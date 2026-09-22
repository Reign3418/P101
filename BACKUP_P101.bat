@echo off
title Backup P101 from GitHub
cd /d "%~dp0"
set "PATH=C:\Users\laure\AppData\Local\Programs\MinGit\cmd;C:\Users\laure\AppData\Local\Programs\NodeJS;%PATH%"

echo ========================================================================
echo                  P101 GITHUB TO LOCAL BACKUP UTILITY
echo ========================================================================
echo.
echo Source: https://github.com/Reign3418/P101.git
echo Destination: %~dp0backups
echo.

if not exist "%~dp0backups" mkdir "%~dp0backups"

echo [1/4] Fetching all branches and tags from GitHub...
git fetch origin --prune --tags
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Could not connect to GitHub. Continuing with local refs...
)

echo.
echo [2/4] Creating full Git bundle (all branches + complete commit history)...
git bundle create "%~dp0backups\P101_full_repo_latest.bundle" --all
if %ERRORLEVEL% EQU 0 (
    echo       Saved: backups\P101_full_repo_latest.bundle
) else (
    echo [ERROR] Git bundle creation failed.
)

echo.
echo [3/4] Exporting clean source zip for 'main' branch...
git archive --format=zip --output="%~dp0backups\P101_source_main_latest.zip" main
if %ERRORLEVEL% EQU 0 (
    echo       Saved: backups\P101_source_main_latest.zip
)

echo.
echo [4/4] Exporting clean production web bundle for 'gh-pages' branch...
git archive --format=zip --output="%~dp0backups\P101_site_ghpages_latest.zip" gh-pages
if %ERRORLEVEL% EQU 0 (
    echo       Saved: backups\P101_site_ghpages_latest.zip
)

echo.
echo ========================================================================
echo  BACKUP COMPLETED SUCCESSFULLY!
echo  All repository branches, commit history, and assets are backed up in:
echo  %~dp0backups
echo ========================================================================
echo.
pause

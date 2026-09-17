@echo off
title Push P101 to GitHub
cd /d "%~dp0"
set "PATH=C:\Users\laure\AppData\Local\Programs\MinGit\cmd;C:\Users\laure\AppData\Local\Programs\NodeJS;%PATH%"

echo ========================================================================
echo                 PUSHING P101 STUDY PORTAL TO GITHUB
echo ========================================================================
echo Target: https://github.com/Reign3418/P101.git
echo Branch: main
echo.
echo If prompted for Username, enter: Reign3418
echo If prompted for Password, enter your GitHub Personal Access Token (PAT):
echo (Generate one at: https://github.com/settings/tokens with 'repo' checked)
echo.
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================================
    echo  SUCCESS! Code pushed to https://github.com/Reign3418/P101.git
    echo.
    echo  To update the live website on GitHub Pages, run DEPLOY_PAGES.bat:
    echo  Live URL: https://reign3418.github.io/P101/
    echo ========================================================================
) else (
    echo [ERROR] Push did not complete. Check your token or repository permissions.
)
pause

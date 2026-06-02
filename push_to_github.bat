@echo off
echo === VectorShift — Final Push to GitHub ===
echo.

echo [1/4] Copying screenshots...
mkdir frontend\docs 2>nul
copy "C:\Users\Sonu\.gemini\antigravity\brain\ffefd4d0-8816-4f94-a61b-0d6f96d61b6b\editor_screenshot_1780425617206.png" "frontend\docs\editor_screenshot.png" >nul
copy "C:\Users\Sonu\.gemini\antigravity\brain\ffefd4d0-8816-4f94-a61b-0d6f96d61b6b\dag_modal_screenshot_1780425637395.png" "frontend\docs\dag_modal_screenshot.png" >nul
echo    Done.

echo [2/4] Removing embedded git from frontend...
git rm --cached frontend 2>nul
rmdir /S /Q frontend\.git 2>nul
echo    Done.

echo [3/4] Staging all files...
git add .
echo    Done.

echo [4/4] Committing and force pushing...
git commit -m "fix: include all source files, bug fixes, screenshots, clean repo"
git push --force
echo.
echo === DONE. Check your GitHub repo now! ===
pause

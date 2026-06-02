@echo off
REM Run this from the frontend_technical_assessment root to copy screenshots into README docs folder
mkdir frontend\docs 2>nul
copy "C:\Users\Sonu\.gemini\antigravity\brain\ffefd4d0-8816-4f94-a61b-0d6f96d61b6b\editor_screenshot_1780425617206.png" "frontend\docs\editor_screenshot.png"
copy "C:\Users\Sonu\.gemini\antigravity\brain\ffefd4d0-8816-4f94-a61b-0d6f96d61b6b\dag_modal_screenshot_1780425637395.png" "frontend\docs\dag_modal_screenshot.png"
echo Screenshots copied to frontend/docs/

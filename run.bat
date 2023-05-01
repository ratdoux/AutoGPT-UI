@echo off
copy .\websocketd.exe ..\AutoGPT\websocketd.exe
echo websocketd.exe >> ..\AutoGPT\.gitignore
cd ..
cd AutoGPT
start cmd.exe /k "websocketd --address=localhost --loglevel=debug --binary=true --port=8080 run.bat"
cd ..
cd AutoGPT-GraphUI
start cmd.exe /k "npm start"

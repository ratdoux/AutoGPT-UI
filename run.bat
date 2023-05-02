@echo off
setlocal enabledelayedexpansion

copy .\websocketd.exe ..\Auto-GPT\websocketd.exe
echo websocketd.exe >> ..\Auto-GPT\.gitignore

set "first_line_processed=false"
(for /F "tokens=*" %%A in (..\Auto-GPT\run.bat) do (
    if not "!first_line_processed!"=="true" (
        echo @echo off > ..\Auto-GPT\temp_run.bat
        echo SET USERPROFILE=%%HOMEDRIVE%%%%HOMEPATH%% >> ..\Auto-GPT\temp_run.bat
        set "first_line_processed=true"
    ) else (
        echo %%A >> ..\Auto-GPT\temp_run.bat
    )
))
move /Y ..\Auto-GPT\temp_run.bat ..\Auto-GPT\run.bat

cd ..
cd Auto-GPT
start cmd.exe /k "websocketd --address=localhost --loglevel=debug --binary=true --port=8080 run.bat"
cd ..
cd AutoGPT-UI
start cmd.exe /k "npm install && npm start"

start "" "%ProgramFiles(x86)%\Microsoft VS Code\code" .
start gulp dev
timeout /T 5
start http://localhost:8080
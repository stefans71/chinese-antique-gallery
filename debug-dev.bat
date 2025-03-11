@echo on
cd /d "%~dp0"
set NODE_ENV=development
set DEBUG=*
call npm run dev

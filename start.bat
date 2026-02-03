@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo 🚀 Démarrage de Ghost Tech...
echo.

REM Vérifier Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js n'est pas installé
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js trouvé: %NODE_VERSION%
echo.

REM Installer les dépendances du frontend
if not exist "node_modules" (
    echo 📦 Installation des dépendances frontend...
    call npm install
)

REM Installer les dépendances du serveur
if not exist "server\node_modules" (
    echo 📦 Installation des dépendances serveur...
    cd server
    call npm install
    cd ..
)

echo.
echo 🎯 Démarrage de l'application...
echo.
echo 🖥️  Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:5000
echo.

REM Démarrer les deux serveurs en parallèle
call npm run dev

endlocal

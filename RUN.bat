@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

cls
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║          🎬 GHOST TECH - Video Download Manager        ║
echo ║                   Lancement Automatique                ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Vérifier Node.js
echo [1/5] Vérification de Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ❌ Node.js n'est pas installé ou n'est pas dans le PATH
    echo 📥 Téléchargez-le sur: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js trouvé: %NODE_VERSION%
echo.

REM Installer les dépendances frontend
echo [2/5] Installation des dépendances frontend...
if exist "node_modules" (
    echo ✅ Dépendances frontend déjà installées
) else (
    echo 📦 Installation en cours... (cela peut prendre 2-3 minutes)
    call npm install --legacy-peer-deps
    if errorlevel 1 (
        echo ❌ Erreur lors de l'installation des dépendances frontend
        pause
        exit /b 1
    )
)
echo ✅ Dépendances frontend OK
echo.

REM Installer les dépendances backend
echo [3/5] Installation des dépendances backend...
if exist "server\node_modules" (
    echo ✅ Dépendances backend déjà installées
) else (
    echo 📦 Installation en cours... (cela peut prendre 1-2 minutes)
    cd server
    call npm install --legacy-peer-deps
    if errorlevel 1 (
        echo ❌ Erreur lors de l'installation des dépendances backend
        cd ..
        pause
        exit /b 1
    )
    cd ..
)
echo ✅ Dépendances backend OK
echo.

REM Vérifier les fichiers de configuration
echo [4/5] Vérification de la configuration...
if not exist ".env.local" (
    echo 📝 Création de .env.local...
    (
        echo REACT_APP_API_URL=http://localhost:5000
        echo REACT_APP_DOMAIN=localhost
        echo REACT_APP_ENV=development
    ) > .env.local
    echo ✅ Fichier .env.local créé
) else (
    echo ✅ Fichier .env.local trouvé
)

if not exist "server\.env" (
    echo 📝 Création de server\.env...
    (
        echo NODE_ENV=development
        echo PORT=5000
        echo CLIENT_URL=http://localhost:3000
    ) > server\.env
    echo ✅ Fichier server\.env créé
) else (
    echo ✅ Fichier server\.env trouvé
)
echo.

REM Démarrage
echo [5/5] Démarrage de l'application...
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║              🚀 Application lancée!                    ║
echo ║                                                        ║
echo ║  🖥️  Frontend:  http://localhost:3000                  ║
echo ║  🔧 Backend:   http://localhost:5000                  ║
echo ║  💻 API Test:  http://localhost:5000/api/health       ║
echo ║                                                        ║
echo ║  ⏳ Patientez 5-10 secondes pour le chargement...      ║
echo ║                                                        ║
echo ║  Pour arrêter: Ctrl + C dans les terminaux            ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Lancer les deux serveurs
call npm run dev

endlocal
pause

#!/bin/bash

clear

echo "╔════════════════════════════════════════════════════════╗"
echo "║          🎬 GHOST TECH - Video Download Manager        ║"
echo "║                   Lancement Automatique                ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vérifier Node.js
echo "[1/5] Vérification de Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    echo "📥 Téléchargez-le sur: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js trouvé: $NODE_VERSION${NC}"
echo ""

# Installer les dépendances frontend
echo "[2/5] Installation des dépendances frontend..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ Dépendances frontend déjà installées${NC}"
else
    echo "📦 Installation en cours... (cela peut prendre 2-3 minutes)"
    npm install --legacy-peer-deps
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erreur lors de l'installation${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}✅ Dépendances frontend OK${NC}"
echo ""

# Installer les dépendances backend
echo "[3/5] Installation des dépendances backend..."
if [ -d "server/node_modules" ]; then
    echo -e "${GREEN}✅ Dépendances backend déjà installées${NC}"
else
    echo "📦 Installation en cours... (cela peut prendre 1-2 minutes)"
    cd server
    npm install --legacy-peer-deps
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erreur lors de l'installation${NC}"
        cd ..
        exit 1
    fi
    cd ..
fi
echo -e "${GREEN}✅ Dépendances backend OK${NC}"
echo ""

# Vérifier les fichiers de configuration
echo "[4/5] Vérification de la configuration..."
if [ ! -f ".env.local" ]; then
    echo "📝 Création de .env.local..."
    cat > .env.local << EOF
REACT_APP_API_URL=http://localhost:5000
REACT_APP_DOMAIN=localhost
REACT_APP_ENV=development
EOF
    echo -e "${GREEN}✅ Fichier .env.local créé${NC}"
else
    echo -e "${GREEN}✅ Fichier .env.local trouvé${NC}"
fi

if [ ! -f "server/.env" ]; then
    echo "📝 Création de server/.env..."
    cat > server/.env << EOF
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
EOF
    echo -e "${GREEN}✅ Fichier server/.env créé${NC}"
else
    echo -e "${GREEN}✅ Fichier server/.env trouvé${NC}"
fi
echo ""

# Démarrage
echo "[5/5] Démarrage de l'application..."
echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║              🚀 Application lancée!                    ║"
echo "║                                                        ║"
echo "║  🖥️  Frontend:  http://localhost:3000                  ║"
echo "║  🔧 Backend:   http://localhost:5000                  ║"
echo "║  💻 API Test:  http://localhost:5000/api/health       ║"
echo "║                                                        ║"
echo "║  ⏳ Patientez 5-10 secondes pour le chargement...      ║"
echo "║                                                        ║"
echo "║  Pour arrêter: Ctrl + C dans les terminaux            ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Lancer les deux serveurs
npm run dev

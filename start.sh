#!/bin/bash

echo "🚀 Démarrage de Ghost Tech..."
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

echo "✅ Node.js trouvé: $(node --version)"
echo ""

# Installer les dépendances du frontend
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances frontend..."
    npm install
fi

# Installer les dépendances du serveur
if [ ! -d "server/node_modules" ]; then
    echo "📦 Installation des dépendances serveur..."
    cd server
    npm install
    cd ..
fi

echo ""
echo "🎯 Démarrage de l'application..."
echo ""
echo "🖥️  Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:5000"
echo ""

# Démarrer les deux serveurs en parallèle
npm run dev

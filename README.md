# 🎬 Ghost Tech - Gestionnaire de Téléchargement Vidéo

Application React permettant de télécharger et exporter des vidéos vers différentes plateformes cloud (Google Drive, Dropbox, OneDrive, AWS S3).

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 16+ ([Télécharger](https://nodejs.org/))
- npm ou yarn

### Installation et Lancement

#### Windows
```bash
# Double-cliquez sur start.bat
# OU utilisez la commande:
start.bat
```

#### macOS/Linux
```bash
# Rendez le script exécutable
chmod +x start.sh

# Lancez le script
./start.sh
```

#### Manuel
```bash
# 1. Installer les dépendances
npm install
cd server && npm install && cd ..

# 2. Terminal 1 - Démarrer le serveur
npm run server:dev

# 3. Terminal 2 - Démarrer l'application
npm start
```

## 📍 Accès à l'Application

Après le démarrage, accédez à:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 🔧 Configuration

Créez un fichier `.env.local` à la racine:

```bash
REACT_APP_API_URL=http://localhost:5000
REACT_APP_DOMAIN=localhost
REACT_APP_ENV=development
```

Créez un fichier `server/.env`:

```bash
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
```

## 📁 Structure du Projet

```
ghost-tech/
├── src/
│   ├── components/
│   │   └── VideoDownloadManager.jsx
│   ├── api/
│   │   ├── authService.js
│   │   └── uploadService.js
│   └── App.js
├── server/
│   ├── routes/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── index.js
│   └── package.json
├── .env.local
└── package.json
```

## 🎯 Fonctionnalités

✅ Téléchargement local de vidéos
✅ Export vers Google Drive
✅ Export vers Dropbox
✅ Export vers OneDrive
✅ Export vers AWS S3
✅ Authentification OAuth2 sécurisée
✅ Gestion de session avec expiration
✅ Indicateur de progression
✅ Gestion d'erreur robuste

## 🔐 Sécurité

- Authentification OAuth2
- Tokens stockés en sessionStorage
- Vérification d'origine stricte
- Communication HTTPS prête
- Gestion d'expiration de session

## 📝 Scripts Disponibles

```bash
# Frontend uniquement
npm start              # Démarrage dev
npm run build         # Build production
npm run test          # Tests
npm run dev:frontend  # Démarrage frontend seul

# Backend uniquement
npm run server        # Production
npm run server:dev    # Développement
npm run dev:backend   # Démarrage backend seul

# Les deux (recommandé)
npm run dev           # Frontend + Backend concurrents
```

## 🐛 Dépannage

### Port 3000 déjà utilisé
```bash
# Changez le port
PORT=3001 npm start
```

### Port 5000 déjà utilisé
```bash
# Changez le port du serveur
PORT=5001 npm run server:dev
```

### Module introuvable
```bash
# Réinstallez les dépendances
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Support

Pour toute question ou problème, ouvrez une issue.

## 📄 License

MIT

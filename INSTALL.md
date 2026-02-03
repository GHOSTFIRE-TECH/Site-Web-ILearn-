# 📦 Guide d'Installation Détaillé

## Étape 1: Installer Node.js

### Windows
1. Visitez https://nodejs.org/
2. Téléchargez la version LTS
3. Exécutez l'installeur
4. Suivez les étapes par défaut

### macOS
```bash
# Avec Homebrew
brew install node

# Ou téléchargez depuis https://nodejs.org/
```

### Linux
```bash
# Ubuntu/Debian
sudo apt-get install nodejs npm

# Fedora
sudo dnf install nodejs npm
```

## Étape 2: Vérifier l'installation

```bash
node --version
npm --version
```

## Étape 3: Cloner/Extraire le Projet

```bash
# Si vous avez un dépôt Git
git clone <repository-url>
cd ghost-tech

# Sinon, extrayez le dossier zip
```

## Étape 4: Installer les Dépendances

```bash
# Dépendances frontend
npm install

# Dépendances backend
cd server
npm install
cd ..
```

## Étape 5: Configuration

### Créer `.env.local` (Frontend)

À la racine du projet:

```bash
REACT_APP_API_URL=http://localhost:5000
REACT_APP_DOMAIN=localhost
REACT_APP_ENV=development
```

### Créer `server/.env` (Backend)

```bash
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_id
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
```

## Étape 6: Démarrer l'Application

### Option 1: Script Automatique

**Windows:**
```bash
start.bat
```

**macOS/Linux:**
```bash
chmod +x start.sh
./start.sh
```

### Option 2: Manuel

Terminal 1 (Backend):
```bash
npm run server:dev
```

Terminal 2 (Frontend):
```bash
npm start
```

## Vérification du Démarrage

- ✅ Backend lancé: http://localhost:5000/api/health
- ✅ Frontend lancé: http://localhost:3000
- ✅ Pas d'erreurs console

## 🎉 Succès!

L'application est maintenant active!

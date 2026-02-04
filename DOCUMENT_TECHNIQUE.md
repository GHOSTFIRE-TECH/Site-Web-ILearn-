# 🛠️ DOCUMENT TECHNIQUE
## Plateforme d'Apprentissage Digital - Ghost Tech

---

## TABLE DES MATIÈRES
1. [Architecture générale](#architecture-générale)
2. [Stack technologique](#stack-technologique)
3. [Architecture détaillée](#architecture-détaillée)
4. [Bases de données](#bases-de-données)
5. [API Rest](#api-rest)
6. [Sécurité](#sécurité)
7. [Performance](#performance)
8. [Déploiement](#déploiement)
9. [Monitoring et Logs](#monitoring-et-logs)
10. [Guide de développement](#guide-de-développement)

---

## 🏗️ ARCHITECTURE GÉNÉRALE

### Vue d'ensemble
```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (NAVIGATEUR)                      │
│            React 18 + Material-UI (Responsive)             │
│         http://localhost:3000 (Développement)              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP/HTTPS
                     │
┌────────────────────▼────────────────────────────────────────┐
│           API GATEWAY / LOAD BALANCER                       │
│              (Production: Nginx/CloudFlare)                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ REST API
                     │
┌────────────────────▼─────────────────────────────────────────┐
│              BACKEND (Node.js/Express)                       │
│         http://localhost:5000 (Développement)               │
│                                                               │
│  ├─ Routes d'authentification          /api/auth           │
│  ├─ Gestion des utilisateurs           /api/users          │
│  ├─ Gestion des cours                  /api/courses        │
│  ├─ Upload de fichiers                 /api/upload         │
│  ├─ Notifications en temps réel        /api/notifications  │
│  ├─ Tâches et évaluations             /api/assignments    │
│  └─ Rapports                           /api/reports        │
└──┬───┬──────┬──────┬─────────────────────┬──────────────────┘
   │   │      │      │                     │
   │   │      │      │                     │
┌──▼─┐│ ┌──┐ │ ┌──┐ │  ┌──────────┐ ┌───▼──┐
│ FB ││ │SG ││ │MB ││  │ Redis    │ │ CDN │
│Auth││ │Mail││ │IM ││  │ (Cache) │ │(S3) │
└────┘│ └──┘ │ └──┘ │  └──────────┘ └─────┘
      │      │      │
   ┌──▼──┬──┬▼───┬──▼──┐
   │ FB  │  │AWS │ GCP │
   │Stor │  │S3  │     │
   │age  │  │    │     │
   └─────┴──┴────┴─────┘

Legend:
FB = Firebase
SG = SendGrid
MB = Message Broker
```

### Modèle de déploiement
```
DÉVELOPPEMENT              STAGING                PRODUCTION
(Local/Docker)            (Cloud)                (Cloud Scale)
├─ Node.js local    →    ├─ Node.js Docker  →   ├─ K8s cluster
├─ Firebase local   →    ├─ Firebase Cloud →    ├─ Firebase
├─ SQLite optional  →    ├─ Firestore     →    ├─ Firestore
└─ React local      →    └─ React Build    →   └─ CDN + React
```

---

## 📚 STACK TECHNOLOGIQUE

### Frontend
```json
{
  "Framework": "React 18.2.0",
  "UILibrary": "Material-UI (MUI) 5.14.18",
  "StateManagement": "React Context API",
  "Styling": {
    "Emotion": "11.11.1",
    "Styled-components": "5.x"
  },
  "MediaPlayer": "React-Player 2.16.0",
  "Notifications": "React-Toastify 9.1.3",
  "Build": "React-Scripts 5.0.1",
  "Testing": "Jest + React Testing Library",
  "Linting": "ESLint",
  "Formatting": "Prettier"
}
```

### Backend
```json
{
  "Runtime": "Node.js 18+ (LTS)",
  "Framework": "Express.js 4.x",
  "Database": "Firebase Realtime DB / Firestore",
  "Authentication": "Firebase Authentication",
  "FileStorage": "Firebase Storage",
  "RealTime": "Firebase Realtime DB / Socket.io",
  "Email": "SendGrid / Nodemailer",
  "TaskQueue": "Bull / Celery",
  "Caching": "Redis",
  "Security": {
    "JwtTokens": "jsonwebtoken",
    "Bcrypt": "bcryptjs",
    "CORS": "express-cors",
    "Helmet": "helmet"
  }
}
```

### Infrastructure
```
Cloud Providers:
  - Firebase (Auth, DB, Storage, Hosting)
  - Google Cloud Platform (Compute, CDN)
  - AWS (S3, SES, Lambda)
  - Vercel (Optional frontend hosting)

Monitoring:
  - Datadog / New Relic / Sentry
  - CloudWatch (AWS)
  - Cloud Logging (GCP)

CDN:
  - CloudFlare
  - Google Cloud CDN
  - AWS CloudFront
```

---

## 🏛️ ARCHITECTURE DÉTAILLÉE

### 1. COUCHE PRÉSENTATION (Frontend)

#### Structure des composants
```
src/
├── components/
│   ├── common/
│   │   ├── NavBar.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── NotificationBell.jsx
│   │   └── Header.jsx
│   ├── auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── RoleSelector.jsx
│   │   └── PasswordReset.jsx
│   ├── dashboard/
│   │   ├── Dashboard.jsx
│   │   ├── TeacherDashboard.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── StudentSchoolDashboard.jsx
│   │   └── ParentDashboard.jsx
│   ├── courses/
│   │   ├── CourseList.jsx
│   │   ├── CourseDetail.jsx
│   │   ├── ModuleManager.jsx
│   │   └── ResourceManager.jsx
│   ├── media/
│   │   ├── VideoPlayer.jsx
│   │   ├── MediaLibrary.jsx
│   │   ├── VideoDownloadManager.jsx
│   │   └── DocumentViewer.jsx
│   ├── assignments/
│   │   ├── AssignmentBoard.jsx
│   │   ├── AssignmentDetail.jsx
│   │   ├── SubmissionForm.jsx
│   │   └── GradingInterface.jsx
│   ├── communication/
│   │   ├── ChatBox.jsx
│   │   ├── MessagesList.jsx
│   │   ├── DiscussionForum.jsx
│   │   └── NotificationCenter.jsx
│   └── analytics/
│       ├── ResultsPanel.jsx
│       ├── PerformanceChart.jsx
│       ├── GradeAnalysis.jsx
│       └── ReportGenerator.jsx
│
├── api/
│   ├── authService.js
│   ├── uploadService.js
│   ├── courseService.js
│   ├── assignmentService.js
│   ├── communicationService.js
│   └── analyticsService.js
│
├── firebase/
│   ├── config.js
│   ├── auth.js
│   ├── db.js
│   └── storage.js
│
├── utils/
│   ├── performanceOptimization.js
│   ├── advancedPerformanceTracker.js
│   ├── validators.js
│   ├── formatters.js
│   └── helpers.js
│
├── styles/
│   ├── theme.js
│   ├── global.css
│   └── variables.css
│
├── hooks/
│   ├── useAuth.js
│   ├── useCourse.js
│   ├── useNotification.js
│   └── usePerformance.js
│
├── app.js
└── index.js
```

#### Composant exemple : VideoPlayer
```jsx
import React, { useState, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Download, Share } from '@mui/icons-material';

const VideoPlayer = ({ url, title, onDownload }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handleProgress = useCallback((state) => {
    setProgress(state.played);
  }, []);

  return (
    <Box className="video-player-container">
      <ReactPlayer
        url={url}
        playing={playing}
        onProgress={handleProgress}
        controls
        width="100%"
        height="100%"
      />
      <Box className="player-actions">
        <Tooltip title="Télécharger">
          <IconButton onClick={() => onDownload(url)}>
            <Download />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
```

### 2. COUCHE MÉTIER (Backend)

#### Structure du serveur
```
server/
├── src/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── courses.js
│   │   ├── assignments.js
│   │   ├── upload.js
│   │   ├── messages.js
│   │   ├── notifications.js
│   │   └── reports.js
│   │
│   ├── middleware/
│   │   ├── authentication.js
│   │   ├── authorization.js
│   │   ├── validation.js
│   │   ├── errorHandler.js
│   │   ├── logging.js
│   │   └── rateLimit.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── assignmentController.js
│   │   ├── userController.js
│   │   ├── notificationController.js
│   │   └── reportController.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── courseService.js
│   │   ├── firebaseService.js
│   │   ├── emailService.js
│   │   ├── storageService.js
│   │   ├── analyticsService.js
│   │   └── cacheService.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Assignment.js
│   │   ├── Grade.js
│   │   └── Notification.js
│   │
│   ├── utils/
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   ├── logger.js
│   │   └── constants.js
│   │
│   └── config/
│       ├── firebase.js
│       ├── database.js
│       ├── env.js
│       └── constants.js
│
└── index.js
```

#### Exemple de route
```javascript
// server/routes/courses.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticate, authorize } = require('../middleware/authentication');

// GET tous les cours
router.get('/', authenticate, courseController.getAllCourses);

// GET un cours spécifique
router.get('/:id', authenticate, courseController.getCourseById);

// POST créer un nouveau cours
router.post('/', authenticate, authorize('teacher'), courseController.createCourse);

// PUT mettre à jour un cours
router.put('/:id', authenticate, authorize('teacher'), courseController.updateCourse);

// DELETE supprimer un cours
router.delete('/:id', authenticate, authorize('teacher'), courseController.deleteCourse);

// POST ajouter une ressource au cours
router.post('/:id/resources', authenticate, authorize('teacher'), courseController.addResource);

module.exports = router;
```

### 3. COUCHE DONNÉES (Firebase)

#### Structure Firestore
```
firestore/
├── users/
│   ├── {uid}
│   │   ├── email: string
│   │   ├── firstName: string
│   │   ├── lastName: string
│   │   ├── role: string (teacher|student|parent|admin)
│   │   ├── school: string (ref)
│   │   ├── createdAt: timestamp
│   │   └── lastLogin: timestamp
│
├── courses/
│   ├── {courseId}
│   │   ├── title: string
│   │   ├── description: string
│   │   ├── teacher: string (uid ref)
│   │   ├── school: string (ref)
│   │   ├── students: array (uid refs)
│   │   ├── modules: array
│   │   │   ├── id: string
│   │   │   ├── title: string
│   │   │   └── resources: array
│   │   │       ├── id: string
│   │   │       ├── type: string (video|document|link)
│   │   │       ├── url: string
│   │   │       └── metadata: object
│   │   ├── createdAt: timestamp
│   │   └── updatedAt: timestamp
│
├── assignments/
│   ├── {assignmentId}
│   │   ├── title: string
│   │   ├── description: string
│   │   ├── course: string (ref)
│   │   ├── teacher: string (uid ref)
│   │   ├── dueDate: timestamp
│   │   ├── maxPoints: number
│   │   ├── submissions/
│   │   │   ├── {studentId}
│   │   │   │   ├── file: string (storage ref)
│   │   │   │   ├── submittedAt: timestamp
│   │   │   │   ├── grade: number
│   │   │   │   └── feedback: string
│   │   └── rubric: object
│
├── messages/
│   ├── {conversationId}
│   │   ├── participants: array
│   │   ├── messages: array
│   │   │   ├── id: string
│   │   │   ├── sender: string (uid ref)
│   │   │   ├── text: string
│   │   │   ├── timestamp: timestamp
│   │   │   └── read: boolean
│   │   └── createdAt: timestamp
│
├── notifications/
│   ├── {notificationId}
│   │   ├── user: string (uid ref)
│   │   ├── type: string (assignment|grade|message|alert)
│   │   ├── title: string
│   │   ├── message: string
│   │   ├── read: boolean
│   │   ├── createdAt: timestamp
│   │   └── link: string
│
├── schools/
│   ├── {schoolId}
│   │   ├── name: string
│   │   ├── address: string
│   │   ├── director: string (uid ref)
│   │   ├── departments: array
│   │   └── createdAt: timestamp
│
└── analytics/
    └── {userId}
        ├── coursesCompleted: number
        ├── averageGrade: number
        ├── lastActivity: timestamp
        └── engagementScore: number
```

---

## 💾 BASES DE DONNÉES

### Firebase Realtime Database
```json
{
  "users": {
    "uid1": {
      "email": "teacher@example.com",
      "role": "teacher",
      "profile": {
        "firstName": "John",
        "lastName": "Doe"
      }
    }
  },
  "courses": {
    "course1": {
      "title": "Mathématiques",
      "studentCount": 30
    }
  }
}
```

### Firestore (Recommandé)
- Collections au lieu de chemins imbriqués
- Requêtes plus efficaces
- Meilleure scalabilité
- Transactions ACID

### Stratégie de cache
```javascript
// Redis cache pour données fréquemment accédées
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

// Cache les cours
async function getCourseWithCache(courseId) {
  const cacheKey = `course:${courseId}`;
  
  // Vérifier le cache
  const cached = await client.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  // Récupérer de la BD
  const course = await db.collection('courses').doc(courseId).get();
  
  // Mettre en cache (expire en 1 heure)
  await client.setex(cacheKey, 3600, JSON.stringify(course.data()));
  
  return course.data();
}
```

---

## 🔗 API REST

### Authentification
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/verify-email
```

### Utilisateurs
```
GET    /api/users/profile
PUT    /api/users/profile
GET    /api/users/{id}
PUT    /api/users/{id}
DELETE /api/users/{id}
POST   /api/users/bulk-import
```

### Cours
```
GET    /api/courses
GET    /api/courses/{id}
POST   /api/courses
PUT    /api/courses/{id}
DELETE /api/courses/{id}
POST   /api/courses/{id}/enroll
GET    /api/courses/{id}/students
POST   /api/courses/{id}/resources
DELETE /api/courses/{id}/resources/{resourceId}
```

### Tâches
```
GET    /api/assignments
GET    /api/assignments/{id}
POST   /api/assignments
PUT    /api/assignments/{id}
DELETE /api/assignments/{id}
POST   /api/assignments/{id}/submit
PUT    /api/assignments/{id}/submit/{submissionId}
POST   /api/assignments/{id}/grade
```

### Messages
```
GET    /api/messages
GET    /api/messages/{conversationId}
POST   /api/messages/{conversationId}
GET    /api/conversations
POST   /api/conversations
```

### Notifications
```
GET    /api/notifications
PUT    /api/notifications/{id}
DELETE /api/notifications/{id}
POST   /api/notifications/mark-all-read
```

### Uploads
```
POST   /api/upload
POST   /api/upload/avatar
POST   /api/upload/bulk
DELETE /api/files/{id}
```

### Rapports
```
GET    /api/reports/performance
GET    /api/reports/grades
GET    /api/reports/attendance
GET    /api/reports/export
```

### Exemple de requête
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Réponse
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uid1",
    "email": "user@example.com",
    "role": "teacher"
  }
}
```

---

## 🔐 SÉCURITÉ

### Authentification et Autorisation
```javascript
// Middleware d'authentification
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware d'autorisation basée sur les rôles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
```

### Chiffrement des données
```javascript
// Chiffrement des mots de passe
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Stockage des données sensibles
const crypto = require('crypto');

function encryptData(data, key) {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}
```

### Protection CSRF et XSS
```javascript
const helmet = require('helmet');
const csrf = require('csurf');

app.use(helmet()); // Headers de sécurité
app.use(csrf()); // Protection CSRF
app.use(xss()); // Protection XSS

// Sanitisation des inputs
const { body, validationResult } = require('express-validator');

const validateCourse = [
  body('title').trim().escape(),
  body('description').trim().escape(),
  body('code').isAlphanumeric()
];
```

### Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives
  message: 'Too many login attempts'
});

app.post('/api/auth/login', loginLimiter, authController.login);
```

### RGPD et Conformité
- Droit à l'oubli (suppression de données)
- Droit d'accès aux données
- Audit logs de tous les accès
- Consentement explicite
- Chiffrement de données sensibles
- Politique de rétention des données

---

## ⚡ PERFORMANCE

### Optimisations Frontend
```javascript
// Code Splitting
const CourseDetail = lazy(() => import('./pages/CourseDetail'));

// Lazy Loading des images
<img loading="lazy" src="image.jpg" alt="Description" />

// Service Worker pour PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

// Compression des images
import imageCompression from 'browser-image-compression';
const compressed = await imageCompression(file, options);
```

### Optimisations Backend
```javascript
// Pagination
router.get('/courses', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  
  const courses = await db.collection('courses')
    .skip(skip)
    .limit(limit)
    .get();
});

// Indexes Firestore
db.collection('courses').createIndex([['teacher', 'asc'], ['createdAt', 'desc']]);

// Batch operations
const batch = db.batch();
batch.set(doc1, data1);
batch.set(doc2, data2);
await batch.commit();
```

### Métriques de Performance
| Métrique | Cible | Outil |
|----------|-------|-------|
| FCP (First Contentful Paint) | < 1.8s | Lighthouse |
| LCP (Largest Contentful Paint) | < 2.5s | Web Vitals |
| CLS (Cumulative Layout Shift) | < 0.1 | Web Vitals |
| TTFB (Time to First Byte) | < 600ms | Datadog |

---

## 🚀 DÉPLOIEMENT

### Environnement de développement
```bash
# Installation
npm install
cd server && npm install && cd ..

# Configuration
cp .env.local.example .env.local
cp server/.env.example server/.env

# Lancer
npm run dev
```

### Docker
```dockerfile
# Frontend
FROM node:18-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Backend
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --only=production
COPY server .
EXPOSE 5000
CMD ["node", "index.js"]
```

### Déploiement Firebase
```bash
# Installation Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Deploy
firebase deploy

# Functions
firebase deploy --only functions
firebase deploy --only hosting
```

### Déploiement Kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ghost-tech-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ghost-tech-backend
  template:
    metadata:
      labels:
        app: ghost-tech-backend
    spec:
      containers:
      - name: backend
        image: ghost-tech:latest
        ports:
        - containerPort: 5000
        env:
        - name: FIREBASE_CONFIG
          valueFrom:
            configMapKeyRef:
              name: firebase-config
              key: config
```

---

## 📊 MONITORING ET LOGS

### Logging
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

logger.info('User logged in', { userId: user.id, timestamp: new Date() });
```

### Monitoring en temps réel
```javascript
// Datadog
const statsd = require('node-dogstatsd').StatsD;
const client = new statsd();

client.increment('api.requests', 1, { endpoint: '/api/courses' });
client.gauge('db.connections', activeConnections);
```

### Alertes
- CPU > 80%
- Mémoire > 90%
- Erreurs API > 1% des requêtes
- Temps réponse > 1000ms
- Downtime quelconque

---

## 👨‍💻 GUIDE DE DÉVELOPPEMENT

### Standards de code
```javascript
// ESLint config
{
  "env": {
    "node": true,
    "es2020": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "single"]
  }
}

// Prettier config
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2
}
```

### Testing
```javascript
// Jest tests
describe('courseController', () => {
  test('should get all courses', async () => {
    const req = { user: { id: 'uid1' } };
    const res = { json: jest.fn() };
    
    await courseController.getAllCourses(req, res);
    
    expect(res.json).toHaveBeenCalled();
  });
});
```

### Git Workflow
```bash
# Feature branches
git checkout -b feature/video-download
git commit -m "feat: add video download functionality"
git push origin feature/video-download

# Pull Request → Code Review → Merge
```

---

**Document préparé le** : 04/02/2026
**Version** : 1.0
**Mainteneur** : Équipe Développement Ghost Tech

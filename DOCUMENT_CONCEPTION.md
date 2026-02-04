# 📐 DOCUMENT DE CONCEPTION
## Plateforme d'Apprentissage Digital - Ghost Tech

---

## TABLE DES MATIÈRES
1. [Diagrammes UML](#diagrammes-uml)
2. [Modèle de données](#modèle-de-données)
3. [Flux de processus](#flux-de-processus)
4. [Interactions utilisateur](#interactions-utilisateur)
5. [Design patterns](#design-patterns)
6. [Principes de conception](#principes-de-conception)

---

## 📊 DIAGRAMMES UML

### 1. DIAGRAMME DE CAS D'USAGE (Use Case)

```
                              ┌─────────────────────────────────────┐
                              │    SYSTÈME GHOST TECH LEARNING      │
                              └─────────────────────────────────────┘
                                          │
                    ┌───────────────────┬─┼─┬───────────────────┐
                    │                   │ │ │                   │
          ┌─────────▼────────┐  ┌───────▼─▼────────┐  ┌────────▼────────┐
          │   Authentification│  │  Enseignant      │  │  Étudiant       │
          │   - S'enregistrer │  │  - Créer cours   │  │  - S'enregistrer│
          │   - Se connecter  │  │  - Assigner tâche│  │  - Se connecter │
          │   - Se déconnecter│  │  - Évaluer travaux│ │  - Consulter res│
          │                   │  │  - Communiquer   │  │  - Soumettre tra│
          └─────────┬─────────┘  │                  │  │  - Voir notes   │
                    │             └──────────────────┘  └────────┬────────┘
                    │                      │                    │
          ┌─────────▼──────────────────────┼────────────────────┴──────┐
          │                                │                           │
    ┌─────▼────────────┐       ┌──────────▼─────────┐       ┌────────▼────┐
    │ Gestion Contenu  │       │ Communication      │       │ Suivi Academ│
    │ - Créer cours    │       │ - Envoyer messages │       │ - Voir notes│
    │ - Ajouter res    │       │ - Participer forum │       │ - Voir stats│
    │ - Organiser modu │       │ - Recevoir notif   │       │ - Télécharger│
    │ - Publier        │       └────────────────────┘       └─────────────┘
    └──────────────────┘
                │
          ┌─────▼──────────────┐
          │ Télécharger Médias │
          │ - Télécharger vidéo│
          │ - Export vers cloud│
          │ - Partager ressource│
          └────────────────────┘

┌─────────────┐     ┌──────────────┐     ┌────────────┐     ┌──────────┐
│ Administrateur│   │ Parent       │     │ Appareils  │     │ Systèmes │
│ - Gérer users│   │ - Voir progress │   │ - Desktop  │     │ - Firebase│
│ - Config sys │   │ - Voir notes  │   │ - Mobile   │     │ - Cloud  │
│ - Voir rapps │   │ - Voir alerts │   │ - Tablet   │     │ - Storage│
└──────────────┘   └───────────────┘   └────────────┘     └──────────┘
```

### 2. DIAGRAMME DE CLASSES

```
┌──────────────────────────────────────────────────────────────────────────┐
│                            <<interface>>                                 │
│                          IUserEntity                                     │
├──────────────────────────────────────────────────────────────────────────┤
│ + getId(): string                                                        │
│ + getEmail(): string                                                     │
│ + getRole(): Role                                                        │
│ + hasPermission(permission: string): boolean                            │
│ + updateProfile(data: object): void                                      │
└──────────────┬───────────────────────────────────────────────────────────┘
               │
       ┌───────┴─────────┬──────────────┬──────────────┐
       │                 │              │              │
┌──────▼────────┐ ┌─────▼────────┐ ┌────▼─────────┐ ┌──▼──────────┐
│    User       │ │  Teacher     │ │   Student    │ │   Parent    │
├───────────────┤ ├──────────────┤ ├──────────────┤ ├─────────────┤
│- uid: string  │ │- courses: [] │ │- enrollment: │ │- children:[]│
│- email: string│ │- students:[]│ │  Course[]   │ │- access:    │
│- firstName    │ │- ratings: {} │ │- submissions │ │  Student[]  │
│- lastName     │ │- feedback:str│ │- grades: {}  │ │- alerts:[]  │
│- role: Role   │ └──────────────┘ │- progress:%  │ └─────────────┘
│- school: ref  │                  │- attendance: │
│- createdAt    │                  │  object      │
│- lastLogin    │                  └──────────────┘
└───────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│                            Course                                        │
├──────────────────────────────────────────────────────────────────────────┤
│- id: string                                                              │
│- title: string                                                           │
│- description: string                                                     │
│- teacher: User (Teacher)                                                │
│- students: User[] (Student)                                             │
│- modules: Module[]                                                      │
│- assignments: Assignment[]                                              │
│- createdAt: timestamp                                                    │
│- updatedAt: timestamp                                                    │
│- school: School                                                         │
├──────────────────────────────────────────────────────────────────────────┤
│+ createModule(title): Module                                             │
│+ addStudent(student: Student): void                                      │
│+ removeStudent(student: Student): void                                   │
│+ createAssignment(data): Assignment                                      │
│+ getStudentProgress(student: Student): number                           │
│+ publishCourse(): void                                                   │
│+ archiveCourse(): void                                                   │
└──────────────────────────────────────────────────────────────────────────┘

        ┌─────────────────────────┐
        │       Module            │
        ├─────────────────────────┤
        │- id: string             │
        │- title: string          │
        │- order: number          │
        │- resources: Resource[]  │
        │- description: string    │
        └──────────┬──────────────┘
                   │
                   │ contains
                   │
        ┌──────────▼──────────────────────────────────────────────┐
        │              Resource                                   │
        ├─────────────────────────────────────────────────────────┤
        │- id: string                                             │
        │- title: string                                          │
        │- type: enum (VIDEO, DOCUMENT, LINK, TEXT)             │
        │- url: string                                            │
        │- fileSize: number                                       │
        │- mimeType: string                                       │
        │- metadata: object                                       │
        │- createdAt: timestamp                                   │
        └─────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│                         Assignment                                       │
├──────────────────────────────────────────────────────────────────────────┤
│- id: string                                                              │
│- title: string                                                           │
│- description: string                                                     │
│- course: Course                                                         │
│- teacher: Teacher                                                       │
│- dueDate: timestamp                                                      │
│- maxPoints: number                                                      │
│- submissions: Submission[]                                              │
│- rubric: Rubric                                                         │
│- createdAt: timestamp                                                    │
├──────────────────────────────────────────────────────────────────────────┤
│+ submitAssignment(student, files): Submission                           │
│+ gradeSubmission(submission, grade, feedback): void                     │
│+ getSubmissionStats(): object                                            │
│+ sendReminder(): void                                                    │
└──────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                    Submission                                  │
├────────────────────────────────────────────────────────────────┤
│- id: string                                                    │
│- assignment: Assignment                                       │
│- student: Student                                             │
│- files: File[]                                                │
│- submittedAt: timestamp                                        │
│- grade: number                                                │
│- feedback: string                                             │
│- rubricScores: object                                         │
│- status: enum (DRAFT, SUBMITTED, GRADED)                     │
├────────────────────────────────────────────────────────────────┤
│+ updateSubmission(files): void                               │
│+ addFeedback(feedback, score): void                          │
│+ publishGrade(): void                                         │
└────────────────────────────────────────────────────────────────┘
```

### 3. DIAGRAMME DE SÉQUENCE - Authentification

```
Utilisateur          Frontend              Backend            Firebase
    │                  │                     │                    │
    │─── Clique Login ──>                     │                    │
    │                  │─────── POST /auth/login ────────>        │
    │                  │                     │                    │
    │                  │                     │─── Verify Email ──>│
    │                  │                     │<── UID Token ──────│
    │                  │                     │                    │
    │                  │                     │─── Create Session──>
    │                  │                     │<── Session OK ─────│
    │                  │<─ JWT Token + User ─│                    │
    │                  │                     │                    │
    │<── Redirect Dashboard ──                │                    │
    │                  │                     │                    │
    │─── Access Protected ─>                 │                    │
    │                  │─ Header: JWT ─>     │                    │
    │                  │                     │─ Verify JWT ─>     │
    │                  │                     │<─ Valid ─────      │
    │                  │<─ Dashboard Data ───│                    │
    │                  │                     │                    │
```

### 4. DIAGRAMME DE SÉQUENCE - Soumission de Tâche

```
Étudiant             Frontend              Backend            Firebase
    │                  │                     │                    │
    │─ Consulte Tâche  >                     │                    │
    │                  │──── GET /api/assignments/{id} ─────>     │
    │                  │                     │─── Query Firestore>
    │                  │                     │<── Assignment Data ─
    │                  │<── Tâche Details ───│                    │
    │                  │                     │                    │
    │─ Prépare fichiers>                     │                    │
    │                  │                     │                    │
    │─ Clique Soumettre>                     │                    │
    │                  │──── POST /api/upload ─────────────>      │
    │                  │          (file)      │                    │
    │                  │                     │─── Upload Storage ->
    │                  │                     │<── File URL ────────
    │                  │<── Upload Confirm ──│                    │
    │                  │                     │                    │
    │                  │── POST /api/assignments/{id}/submit ─>    │
    │                  │     (fileUrl, comments)                   │
    │                  │                     │                    │
    │                  │                     │─── Create Submission
    │                  │                     │─── Update Assignment
    │                  │                     │─── Create Notification
    │                  │                     │<── Success ─────────
    │                  │<── Confirmation ────│                    │
    │                  │                     │                    │
    │<─ "Soumis avec succès" ─               │                    │
    │                  │                     │                    │

    Notification Flow:
    Backend ────────────────────────> Teacher Frontend
    (New submission notification)
```

### 5. DIAGRAMME D'ÉTAT - Assignment

```
                    ┌──────────────┐
                    │   CREATED    │
                    └──────┬───────┘
                           │
                           │ publish()
                           │
                    ┌──────▼────────┐
                    │   PUBLISHED   │
                    └──────┬────────┘
                           │
              ┌────────────┼────────────┐
              │                         │
         submit()                  dueDate reached
              │                         │
    ┌─────────▼──────────┐    ┌────────▼────────┐
    │  UNDER_REVIEW      │    │   OVERDUE       │
    └─────────┬──────────┘    └────────┬────────┘
              │                        │
              │ grade()                │
              │                  autoGradeOrNotify()
              │                        │
    ┌─────────▼──────────┐    ┌────────▼────────┐
    │    GRADED          │    │  OVERDUE_REVIEWED
    │  (Feedback sent)   │    │  (Late submission)
    └────────────────────┘    └─────────────────┘
```

### 6. DIAGRAMME D'ARCHITECTURE - Communication en Temps Réel

```
┌──────────────────────────────────────────────────────────────────┐
│                    CLIENT (React)                                │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Component: ChatBox, NotificationBell                     │   │
│  │ State: messages, notifications                          │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────┬──────────────────────────────────────────┘
                      │
                      │ WebSocket / Firebase Realtime
                      │
┌─────────────────────▼──────────────────────────────────────────┐
│              Firebase Realtime Database                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ /messages/{conversationId}                              │  │
│  │   ├── messages: {id: message}                          │  │
│  │   ├── participants: [uid1, uid2, ...]                 │  │
│  │                                                          │  │
│  │ /notifications/{userId}                                │  │
│  │   ├── notifications: {id: notification}               │  │
│  │   ├── unreadCount: number                             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Listeners (Real-time):                                        │
│  - onChildAdded (new message)                                  │
│  - onChildChanged (message read status)                        │
│  - onValue (notifications update)                              │
└──────────────────────────────────────────────────────────────┘

Real-time Event Flow:
┌─────────────┐                        ┌─────────────┐
│  Student A  │─── Sends message ────> │ Firestore   │
└─────────────┘                        └────┬────────┘
                                             │
                                    ┌────────┴─────────┐
                                    │                  │
                              ┌─────▼────┐     ┌──────▼────┐
                              │ Student B │     │ Teacher   │
                              │  Receives │     │  Receives │
                              │ Notif     │     │  Notif    │
                              └──────────┘     └───────────┘
```

---

## 🗄️ MODÈLE DE DONNÉES

### Entités principales

#### User
```
User {
  id: UUID
  email: string (unique)
  firstName: string
  lastName: string
  role: ENUM['teacher', 'student', 'parent', 'admin']
  school: ObjectId (School)
  phone: string
  avatar: string (URL)
  bio: string
  isActive: boolean
  createdAt: DateTime
  updatedAt: DateTime
  lastLogin: DateTime
  passwordHash: string (bcrypt)
  emailVerified: boolean
  twoFactorEnabled: boolean
  preferences: {
    notifications: boolean
    language: string
    timezone: string
  }
}
```

#### Course
```
Course {
  id: UUID
  title: string
  description: string
  code: string (unique)
  teacher: ObjectId (User)
  school: ObjectId (School)
  department: string
  students: ObjectId[] (User)
  modules: Module[]
  assignments: ObjectId[] (Assignment)
  discussions: ObjectId[] (Discussion)
  isPublished: boolean
  isArchived: boolean
  capacity: number
  duration: {
    startDate: DateTime
    endDate: DateTime
  }
  settings: {
    allowStudentComments: boolean
    allowGroupWork: boolean
    gradeScale: string
  }
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### Module
```
Module {
  id: UUID
  course: ObjectId (Course)
  title: string
  description: string
  order: number
  resources: Resource[]
  createdAt: DateTime
}
```

#### Resource
```
Resource {
  id: UUID
  module: ObjectId (Module)
  title: string
  type: ENUM['VIDEO', 'DOCUMENT', 'LINK', 'TEXT']
  url: string
  fileSize: number
  mimeType: string
  duration: number (pour vidéos)
  metadata: {
    width: number
    height: number
    bitrate: number
  }
  isRequired: boolean
  viewedBy: ObjectId[] (User)
  createdAt: DateTime
}
```

#### Assignment
```
Assignment {
  id: UUID
  course: ObjectId (Course)
  teacher: ObjectId (User)
  title: string
  description: string
  instructions: string
  dueDate: DateTime
  maxPoints: number
  submissions: Submission[]
  rubric: Rubric
  attachments: string[] (URLs)
  isPublished: boolean
  submissionType: ENUM['file', 'text', 'online', 'media']
  allowLateSubmission: boolean
  lateSubmissionPenalty: number
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### Submission
```
Submission {
  id: UUID
  assignment: ObjectId (Assignment)
  student: ObjectId (User)
  files: {
    name: string
    url: string
    size: number
    uploadedAt: DateTime
  }[]
  textContent: string
  submittedAt: DateTime
  grade: number
  feedback: string
  rubricScores: {
    criterionId: string
    score: number
    comments: string
  }[]
  status: ENUM['draft', 'submitted', 'graded', 'returned']
  reviewedBy: ObjectId (User)
  reviewedAt: DateTime
}
```

#### Message
```
Message {
  id: UUID
  conversation: ObjectId (Conversation)
  sender: ObjectId (User)
  content: string
  type: ENUM['text', 'file', 'image']
  attachments: string[] (URLs)
  readBy: ObjectId[] (User)
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### Notification
```
Notification {
  id: UUID
  user: ObjectId (User)
  type: ENUM['assignment', 'grade', 'message', 'alert', 'system']
  title: string
  message: string
  icon: string
  actionUrl: string
  read: boolean
  readAt: DateTime
  createdAt: DateTime
}
```

#### School
```
School {
  id: UUID
  name: string
  address: string
  city: string
  country: string
  phone: string
  email: string
  director: ObjectId (User)
  departments: string[]
  studentsCount: number
  teachersCount: number
  createdAt: DateTime
  updatedAt: DateTime
}
```

---

## 🔄 FLUX DE PROCESSUS

### 1. Flux d'Authentification
```
START
  │
  ├─> User clique "Connexion"
  │     │
  │     ├─> Affiche formulaire login
  │     │
  │     └─> User entre credentials
  │           │
  │           └─> Frontend envoie POST /auth/login
  │                 │
  │                 ├─> Validate email/password
  │                 │
  │                 ├─> Firebase.auth.signInWithEmailAndPassword()
  │                 │
  │                 ├─> SUCCESS?
  │                 │     YES│              NO│
  │                 │       │                  └─> Affiche erreur
  │                 │       │                      │
  │                 │       └─> Récupère user role └─> Wait réessai
  │                 │             │
  │                 │             ├─> Générer JWT
  │                 │             │
  │                 │             └─> Create session
  │                 │                   │
  │                 │                   └─> Redirect /role-select
  │                 │                         │
  │                 └─────────────────────────┘
  │
  └─> END
```

### 2. Flux de Création de Cours
```
Teacher Dashboard
  │
  ├─> Clique "+ Nouveau Cours"
  │     │
  │     └─> Modal: formulaire création
  │           │
  │           ├─> Remplir titre, description
  │           │
  │           ├─> Sélectionner catégorie
  │           │
  │           ├─> Clique "Créer"
  │           │
  │           └─> Backend: POST /api/courses
  │                 │
  │                 ├─> Validate data
  │                 │
  │                 ├─> Create document Firestore
  │                 │
  │                 ├─> Add teacher as owner
  │                 │
  │                 ├─> Send notification
  │                 │
  │                 └─> Return course ID
  │
  └─> Redirect cours detail
```

### 3. Flux de Soumission de Tâche
```
Student Dashboard
  │
  ├─> Consulte tâche
  │     │
  │     └─> Backend: GET /api/assignments/{id}
  │           │
  │           └─> Affiche détails & deadline
  │
  ├─> Prepare files/text
  │
  ├─> Clique "Soumettre"
  │     │
  │     └─> Modal: upload files
  │           │
  │           ├─> User sélectionne fichiers
  │           │
  │           └─> Frontend: POST /api/upload
  │                 │
  │                 ├─> Upload to Firebase Storage
  │                 │
  │                 ├─> Get download URLs
  │                 │
  │                 └─> Backend: POST /api/assignments/{id}/submit
  │                       │
  │                       ├─> Create submission document
  │                       │
  │                       ├─> Update assignment stats
  │                       │
  │                       ├─> Create notification pour teacher
  │                       │
  │                       └─> Success response
  │
  └─> Show confirmation
```

### 4. Flux d'Évaluation
```
Teacher Dashboard
  │
  ├─> Consulte "Travaux à évaluer"
  │     │
  │     └─> Liste des submissions
  │
  ├─> Clique sur une submission
  │     │
  │     └─> Affiche détails & files
  │
  ├─> Ajoute note & feedback
  │     │
  │     ├─> Grade: 0-20
  │     │
  │     ├─> Rubric scoring (optionnel)
  │     │
  │     ├─> Text feedback
  │     │
  │     └─> Video feedback (optionnel)
  │
  ├─> Clique "Publier évaluation"
  │     │
  │     └─> Backend: PUT /api/assignments/{id}/submit/{subId}
  │           │
  │           ├─> Update submission grade/feedback
  │           │
  │           ├─> Create notification pour student
  │           │
  │           ├─> Update course analytics
  │           │
  │           └─> Success response
  │
  └─> Show confirmation
```

---

## 🎯 INTERACTIONS UTILISATEUR

### 1. User Journey - Enseignant

```
1. SETUP
   ├─ Connexion
   ├─ Création de cours
   ├─ Import élèves
   └─ Configuration du cours

2. TEACHING
   ├─ Téléchargement de ressources
   ├─ Création de tâches
   ├─ Publication des contenus
   └─ Modération des discussions

3. ASSESSMENT
   ├─ Consultation des travaux
   ├─ Évaluation et notation
   ├─ Feedback aux élèves
   └─ Génération de rapports

4. COMMUNICATION
   ├─ Envoi de messages
   ├─ Notifications aux élèves
   ├─ Feedback personnalisé
   └─ Coordination avec parents
```

### 2. User Journey - Étudiant

```
1. ENROLLMENT
   ├─ Connexion
   ├─ Sélection des cours
   └─ Introduction au cours

2. LEARNING
   ├─ Consultation des modules
   ├─ Lecture des ressources
   ├─ Téléchargement de documents
   └─ Participation aux discussions

3. ASSESSMENT
   ├─ Consultation des tâches
   ├─ Préparation du travail
   ├─ Soumission du travail
   ├─ Révision et resoumission
   └─ Consultation des notes

4. COMMUNICATION
   ├─ Messages avec enseignant
   ├─ Participation au forum
   ├─ Notification des résultats
   └─ Consultation des feedback
```

### 3. User Journey - Parent

```
1. CONNECTION
   ├─ Création de compte
   ├─ Liaison avec enfant
   └─ Première connexion

2. MONITORING
   ├─ Vue d'ensemble de la progression
   ├─ Consultation des notes
   ├─ Visualisation des absences
   └─ Suivi des tâches

3. ENGAGEMENT
   ├─ Lecture des alertes
   ├─ Communication avec enseignants
   ├─ Accès aux rapports
   └─ Participation aux réunions virtuelles
```

---

## 🎨 DESIGN PATTERNS

### 1. MVC (Model-View-Controller)
```
User Input → Controller → Model → View
   (UI)       (Logic)    (Data)  (Render)

Exemple:
User clique "Ajouter cours"
  → CourseController.addCourse()
  → CourseModel.create(data)
  → Database save
  → View re-render
```

### 2. Service Locator Pattern
```javascript
// service-locator.js
class ServiceLocator {
  constructor() {
    this.services = {};
  }

  register(name, service) {
    this.services[name] = service;
  }

  get(name) {
    return this.services[name];
  }
}

// Usage
const locator = new ServiceLocator();
locator.register('auth', authService);
locator.register('course', courseService);

// In component
const authService = locator.get('auth');
```

### 3. Observer Pattern
```javascript
// Notifications système
class NotificationManager extends EventEmitter {
  notify(type, data) {
    this.emit(type, data);
  }
}

// Listeners
notificationManager.on('newAssignment', (assignment) => {
  updateStudentDashboard();
});

notificationManager.on('gradePublished', (grade) => {
  notifyStudent();
});
```

### 4. Factory Pattern
```javascript
class ResourceFactory {
  static create(type, data) {
    switch(type) {
      case 'VIDEO':
        return new VideoResource(data);
      case 'DOCUMENT':
        return new DocumentResource(data);
      case 'LINK':
        return new LinkResource(data);
      default:
        throw new Error('Unknown resource type');
    }
  }
}
```

### 5. Strategy Pattern
```javascript
// Différentes stratégies de grading
class GradingStrategy {
  grade(submission) { }
}

class RubricGrading extends GradingStrategy {
  grade(submission) { /* Notation par rubric */ }
}

class SimpleGrading extends GradingStrategy {
  grade(submission) { /* Simple note */ }
}

// Usage
const strategy = new RubricGrading();
const grade = strategy.grade(submission);
```

---

## 📐 PRINCIPES DE CONCEPTION

### 1. SOLID Principles

#### Single Responsibility Principle
```javascript
// ❌ Bad: Une classe fait trop
class CourseManager {
  createCourse() { }
  sendEmail() { }
  generateReport() { }
}

// ✅ Good: Chaque classe a une responsabilité
class CourseManager { createCourse() { } }
class EmailService { sendEmail() { } }
class ReportGenerator { generateReport() { } }
```

#### Open/Closed Principle
```javascript
// ✅ Open for extension, closed for modification
class PaymentProcessor {
  process(payment, strategy) {
    return strategy.process(payment);
  }
}

// Nouvelles stratégies sans modifier la classe
class CreditCardStrategy { process() { } }
class PayPalStrategy { process() { } }
```

#### Liskov Substitution Principle
```javascript
// ✅ Les sous-classes peuvent remplacer la classe parent
class Notification { send() { } }
class EmailNotification extends Notification { send() { } }
class SMSNotification extends Notification { send() { } }

// Usage - peut utiliser n'importe quelle sous-classe
function sendNotification(notification) {
  notification.send();
}
```

### 2. DRY (Don't Repeat Yourself)
```javascript
// ❌ Code répété
function validateCourseTitle(title) { /* logic */ }
function validateAssignmentTitle(title) { /* same logic */ }

// ✅ Code réutilisable
function validateTitle(title, minLength = 3, maxLength = 100) {
  return title.length >= minLength && title.length <= maxLength;
}
```

### 3. KISS (Keep It Simple, Stupid)
```javascript
// ❌ Trop complexe
const avgGrade = students.reduce((acc, s) => 
  acc + (s.grades.reduce((a, g) => a + g, 0) / s.grades.length), 0
) / students.length;

// ✅ Simple et lisible
function calculateAverageGrade(students) {
  const totalGrade = students.reduce((sum, student) => {
    const studentAvg = calculateStudentAverage(student);
    return sum + studentAvg;
  }, 0);
  return totalGrade / students.length;
}
```

### 4. Component-Based Architecture
```
Ghost Tech
├── Core Components (réutilisables)
│   ├── Button
│   ├── Card
│   ├── Modal
│   └── Table
│
├── Feature Components (spécifiques)
│   ├── CourseCard
│   ├── AssignmentDetail
│   ├── StudentProgressChart
│   └── GradingInterface
│
└── Page Components (conteneurs)
    ├── TeacherDashboardPage
    ├── StudentDashboardPage
    └── AdminPage
```

---

## 📈 Diagramme de Dépendances

```
┌─────────────────────────────────────────────────────┐
│                Frontend (React)                    │
│  ┌─────────────────────────────────────────────┐   │
│  │  Pages & Components                         │   │
│  │  ├─ useAuth, useCourse, useNotification    │   │
│  │  └─ API Services                            │   │
│  └────────────────────┬────────────────────────┘   │
└──────────────────────┬─────────────────────────────┘
                       │ HTTP REST
                       │
┌──────────────────────▼─────────────────────────────┐
│              Backend (Node.js)                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  Express Routes                             │   │
│  │  ├─ Controllers                             │   │
│  │  │   ├─ Services                            │   │
│  │  │   │   ├─ Firebase Service                │   │
│  │  │   │   ├─ Email Service                   │   │
│  │  │   │   └─ Storage Service                 │   │
│  │  │   │                                       │   │
│  │  │   └─ Models (Firestore)                  │   │
│  │  │                                           │   │
│  │  └─ Middleware                              │   │
│  │      ├─ Auth                                │   │
│  │      ├─ Validation                          │   │
│  │      └─ ErrorHandler                        │   │
│  └────────────────────┬────────────────────────┘   │
└──────────────────────┬─────────────────────────────┘
                       │
      ┌────────────────┼────────────────┐
      │                │                │
┌─────▼─────┐   ┌─────▼──────┐  ┌─────▼────┐
│ Firebase   │   │ SendGrid   │  │ AWS S3   │
│ (Auth,DB)  │   │ (Email)    │  │ (Files)  │
└────────────┘   └────────────┘  └──────────┘
```

---

**Document préparé le** : 04/02/2026
**Version** : 1.0
**Architecture Pattern** : Microservices-Ready REST API

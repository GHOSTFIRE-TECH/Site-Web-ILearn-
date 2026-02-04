# 📖 GUIDE D'UTILISATION
## Plateforme d'Apprentissage Digital - Ghost Tech

---

## TABLE DES MATIÈRES
1. [Démarrage rapide](#démarrage-rapide)
2. [Guide Enseignants](#guide-enseignants)
3. [Guide Élèves](#guide-élèves)
4. [Guide Parents](#guide-parents)
5. [Guide Administrateur](#guide-administrateur)
6. [FAQ](#faq)
7. [Dépannage](#dépannage)

---

## 🚀 DÉMARRAGE RAPIDE

### Installation

#### Sur Windows
1. Téléchargez le projet
2. Double-cliquez sur `start.bat`
3. Ouvrez votre navigateur à `http://localhost:3000`

#### Sur Mac/Linux
```bash
chmod +x start.sh
./start.sh
```

#### Installation manuelle
```bash
# 1. Installer les dépendances
npm install
cd server && npm install && cd ..

# 2. Terminal 1 - Démarrer le serveur backend
npm run server:dev

# 3. Terminal 2 - Démarrer l'application
npm start
```

### Accès
- **Frontend** : http://localhost:3000
- **Backend** : http://localhost:5000
- **Health Check** : http://localhost:5000/api/health

---

## 👨‍🏫 GUIDE ENSEIGNANTS

### 1. Connexion et Accueil

#### Première connexion
1. Cliquez sur **"Connexion"** en haut à droite
2. Choisissez votre méthode de connexion :
   - Google
   - Microsoft
   - Email/Mot de passe
3. Sélectionnez le rôle **"Enseignant"**
4. Complétez votre profil

#### Tableau de bord enseignant
```
┌─────────────────────────────────────┐
│         TABLEAU DE BORD              │
├─────────────────────────────────────┤
│ Statistiques :                      │
│ • Nombre de cours : 5               │
│ • Total élèves : 125                │
│ • Tâches en attente : 12            │
├─────────────────────────────────────┤
│ Actions rapides :                   │
│ • Créer un nouveau cours            │
│ • Ajouter une tâche                 │
│ • Consulter messages                │
└─────────────────────────────────────┘
```

### 2. Gestion des Cours

#### Créer un cours

1. Cliquez sur **"+ Nouveau Cours"**
2. Remplissez les informations :
   - **Nom du cours** : ex. "Mathématiques Niveau 3"
   - **Description** : Présentation du cours
   - **Code du cours** : Unique pour partage
   - **Catégorie** : Sélectionnez le domaine
   - **Période** : Début et fin du cours
   - **Capacité** : Nombre max d'élèves
3. Cliquez **"Créer"**

#### Organiser le contenu

1. Allez dans votre cours
2. Cliquez sur **"Modules"**
3. Créez des chapitres/modules :
   - Module 1 : Fondamentaux
   - Module 2 : Pratiques avancées
   - etc.

#### Ajouter des ressources

1. Dans un module, cliquez **"+ Ajouter ressource"**
2. Choisissez le type :
   - **Vidéo** : URL YouTube ou fichier local
   - **Document** : PDF, Word, PowerPoint
   - **Lien** : Ressource externe
   - **Texte** : Contenu enrichi

3. Configurez :
   - Titre et description
   - Visibilité (public/privé)
   - Obligatoire ou optionnel
4. Cliquez **"Publier"**

### 3. Créer et Évaluer des Tâches

#### Créer une tâche

1. Allez dans le cours
2. Cliquez **"Tâches"** → **"+ Nouvelle tâche"**
3. Remplissez les détails :
   - **Titre** : "Devoir 1 : Calculs de base"
   - **Description** : Énoncé complet
   - **Échéance** : Date et heure limites
   - **Points possibles** : Ex. 20 points
   - **Type** : Individuel ou groupe
   - **Fichiers requis** : Formats acceptés
4. Cliquez **"Créer et assigner"**

#### Évaluer les travaux

1. Allez dans **"Tâches en attente"**
2. Cliquez sur une tâche
3. Sélectionnez un élève
4. Consultez son travail
5. Ajoutez une note :
   - Points obtenus
   - Feedback textuel
   - Feedback vidéo (optionnel)
6. Cliquez **"Soumettre l'évaluation"**
7. L'élève reçoit une notification

### 4. Communication

#### Envoyer un message
1. Cliquez sur **"Messages"**
2. Sélectionnez **"Nouveau message"**
3. Choisissez le destinataire (élève ou groupe)
4. Tapez votre message
5. Cliquez **"Envoyer"**

#### Créer un salon de discussion
1. Dans un cours
2. Cliquez **"Discussion"**
3. Créez un sujet : "Questions sur le Chapitre 2"
4. Les élèves peuvent répondre
5. Vous modérez les discussions

#### Notifications
- Les notifications apparaissent en **haut à droite** 🔔
- Cliquez pour voir les détails
- Configurez vos préférences dans **"Paramètres"**

### 5. Ressources Avancées

#### Gérer la Bibliothèque Multimédia
1. Cliquez sur **"Bibliothèque"**
2. **Upload** des fichiers
3. **Organisez** en dossiers
4. **Partagez** avec des cours spécifiques

#### Télécharger des vidéos
1. Ouvrez une vidéo
2. Cliquez sur **"⬇️ Télécharger"**
3. Choisissez la destination :
   - **Google Drive**
   - **Dropbox**
   - **OneDrive**
   - **AWS S3**
   - **Local**
4. Confirmez

#### Générer des Rapports
1. Allez dans **"Rapports"**
2. Sélectionnez le type :
   - Performance de classe
   - Évaluations par élève
   - Assiduité
   - Utilisation du cours
3. Choisissez la période
4. Cliquez **"Générer"** → **"Télécharger PDF"**

---

## 👨‍🎓 GUIDE ÉLÈVES

### 1. Connexion

#### Première connexion
1. Cliquez sur **"Connexion"**
2. Sélectionnez votre méthode
3. Choisissez le rôle **"Élève"** ou **"Élève (école)"**
4. Complétez votre profil étudiant

### 2. Navigation du Tableau de Bord

```
TABLEAU DE BORD ÉLÈVE
├── Mes Cours (5 inscrits)
├── Tâches à faire (3)
├── Dates limites (échéances)
├── Notes récentes
├── Messages (1 nouveau)
└── Ressources recommandées
```

### 3. Consulter les Cours

#### Accéder à un cours
1. Allez dans **"Mes Cours"**
2. Cliquez sur un cours
3. Consultez les **Modules** et **Ressources**

#### Lire une ressource
- **Vidéo** : Cliquez pour lancer le lecteur
  - Pause, volume, sous-titres
  - Vitesse de lecture
  - Mode plein écran
  - Télécharge la vidéo si autorisé
  
- **Document** : Ouverts dans une visionneuse
  - Zoom, rotation
  - Téléchargement
  - Impression
  
- **Lien** : Ouvre dans un nouvel onglet

### 4. Soumettre des Travaux

#### Consulter les tâches
1. Allez dans **"Tâches"**
2. Classées par statut :
   - En attente
   - En cours
   - Soumises
   - Évaluées

#### Soumettre un travail
1. Ouvrez une tâche
2. Lisez les consignes
3. Consultez la date limite
4. Téléchargez les ressources associées
5. Préparez votre travail
6. Cliquez **"Soumettre"**
7. Sélectionnez le(s) fichier(s)
8. Ajoutez des commentaires (optionnel)
9. Confirmez la soumission

#### Réviser un travail
- Avant l'échéance : Cliquez **"Reprendre"**
- Supprimez les fichiers précédents
- Téléchargez les nouveaux
- Recliquez **"Soumettre"**

### 5. Voir Vos Évaluations

#### Consulter les notes
1. Allez dans **"Mes Évaluations"**
2. Sélectionnez un cours
3. Visualisez :
   - Les notes par tâche
   - Le détail du barème
   - Le feedback du professeur
   - Les commentaires

#### Comprendre les résultats
```
Tâche : Devoir 1
Statut : Évalué ✓
Notes : 16/20 (80%)
Feedback : "Très bon travail, attention aux calculs d'arrondis"
```

### 6. Communication

#### Consulter les messages
1. Cliquez sur **"Messages"**
2. Conversations avec vos enseignants
3. Répondez directement

#### Participer aux discussions
1. Allez dans un cours
2. Cliquez sur **"Discussion"**
3. Lisez les sujets
4. Répondez aux questions
5. Votez pour les réponses utiles

### 7. Télécharger des Ressources

#### Télécharger une vidéo
1. Ouvrez la vidéo
2. Cliquez sur **"⬇️"**
3. Choisissez la qualité
4. Confirmez
5. Sauvegardez sur votre appareil

#### Télécharger un document
1. Ouvrez le document
2. Cliquez sur **"⬇️ Télécharger"**
3. Le fichier se sauvegarde

---

## 👨‍👩‍👧 GUIDE PARENTS

### 1. Connexion Parent

#### Créer un compte parent
1. **"Connexion"** → **"Créer compte"**
2. Sélectionnez **"Je suis parent"**
3. Remplissez les informations
4. Associez votre enfant :
   - Email ou code étudiant
   - Confirmez l'association

### 2. Tableau de Bord Parent

```
TABLEAU DE BORD PARENT
├── Enfants associés (2)
├── Résumé académique
├── Notes récentes
├── Alertes importantes
├── Calendrier scolaire
└── Communications enseignants
```

### 3. Suivi de l'Enfant

#### Voir la progression
1. Cliquez sur le nom de l'enfant
2. Consultez :
   - Les cours inscrits
   - Les notes actuelles
   - Les tâches en cours
   - L'assiduité

#### Voir les notes
1. **"Notes"** → Sélectionnez l'enfant
2. Consultez par :
   - Matière
   - Période
   - Cours
3. Voyez le détail des évaluations

#### Consulter les alertes
- Notes en baisse : ⚠️
- Travail manquant : 📋
- Absence : 📅
- Communications urgentes : 📢

### 4. Communication

#### Contacter un enseignant
1. Allez dans **"Contacts"**
2. Sélectionnez l'enseignant
3. Cliquez **"Envoyer message"**
4. Tapez votre message
5. Envoyez

#### Recevoir les notifications
1. Allez dans **"Paramètres"**
2. **"Notifications"**
3. Choisissez ce que vous voulez recevoir :
   - Notes publiées
   - Tâches manquées
   - Messages des enseignants
   - Alertes académiques
4. Définissez les horaires

### 5. Rapports et Documents

#### Télécharger un bulletin
1. **"Documents"**
2. Sélectionnez la période
3. Cliquez **"Télécharger bulletin PDF"**

#### Voir les graphiques de progression
1. **"Analyses"**
2. Sélectionnez la matière
3. Visualisez la courbe de progression
4. Comparez avec les moyennes

---

## ⚙️ GUIDE ADMINISTRATEUR

### 1. Panneau de Contrôle

```
ADMINISTRATION
├── Utilisateurs
│   ├── Ajouter/modifier/supprimer
│   ├── Gérer les rôles
│   └── Réinitialiser mots de passe
├── Écoles/Établissements
│   ├── Créer nouvelles écoles
│   ├── Gérer les départements
│   └── Assigner utilisateurs
├── Configuration
│   ├── Paramètres système
│   ├── Intégrations cloud
│   └── Sauvegardes
├── Rapports
│   ├── Utilisation du système
│   ├── Performance
│   └── Problèmes de sécurité
└── Support
    ├── Logs système
    ├── Tickets d'erreur
    └── Base de connaissances
```

### 2. Gestion des Utilisateurs

#### Ajouter un utilisateur
1. **"Utilisateurs"** → **"+ Nouveau"**
2. Remplissez :
   - Nom et prénom
   - Email
   - Rôle (Enseignant/Élève/Parent/Admin)
   - École/Département
3. Cliquez **"Créer"**
4. Un email d'invitation est envoyé

#### Importer en masse
1. **"Utilisateurs"** → **"Importer"**
2. Téléchargez le modèle CSV
3. Remplissez les données
4. Uploadez le fichier
5. Validez les entrées
6. Confirmez l'import

#### Gérer les permissions
1. Sélectionnez un utilisateur
2. **"Permissions"**
3. Accordez ou révoquez les droits
4. Chaque rôle a des permissions spécifiques

### 3. Gestion des Écoles/Établissements

#### Créer une école
1. **"Écoles"** → **"+ Nouvelle école"**
2. Remplissez :
   - Nom officiel
   - Adresse
   - Code d'établissement
   - Contact responsable
3. Sauvegardez

#### Organiser les départements
1. Ouvrez une école
2. **"Départements"**
3. Créez les structures :
   - Primaire
   - Secondaire
   - Autres
4. Assignez les utilisateurs

### 4. Configuration Système

#### Intégrations cloud
1. **"Configuration"** → **"Intégrations"**
2. Configurez les services :
   - **Google Drive** : Clé API, authentification
   - **Dropbox** : Token d'accès
   - **Microsoft OneDrive** : Credentials
   - **AWS S3** : Clés d'accès

#### Paramètres de sécurité
1. **"Sécurité"**
2. Configurez :
   - Durée de session
   - Politique de mot de passe
   - Authentification à 2 facteurs
   - Pare-feu
   - Limite de tentatives de connexion

### 5. Rapports et Monitoring

#### Voir les statistiques
1. **"Tableau de bord"** → Vue d'ensemble
   - Utilisateurs actifs
   - Courses populaires
   - Activité quotidienne

#### Générer des rapports
1. **"Rapports"**
2. Sélectionnez le type :
   - Utilisation par rôle
   - Performance académique globale
   - Problèmes techniques
   - Audits de sécurité
3. Définissez la période
4. Cliquez **"Générer"** → **"Exporter"**

#### Consulter les logs
1. **"Logs"**
2. Filtrez par :
   - Type d'événement
   - Utilisateur
   - Date/heure
   - Niveau de sévérité
3. Analysez les événements suspects

---

## ❓ FAQ

### Installation et Accès
**Q: Combien de temps prend l'installation?**
A: 5-10 minutes avec les scripts. Pour manuel : 15-20 minutes.

**Q: Puis-je accéder de mon téléphone?**
A: Oui, la plateforme est complètement responsive. Elle fonctionne sur tous appareils.

**Q: Dois-je être connecté à internet?**
A: Oui, la plateforme est entièrement cloud. Une connexion stable est requise.

### Comptes et Sécurité
**Q: Puis-je avoir plusieurs rôles?**
A: Oui, une personne peut être enseignant et parent simultanément. Utilisez le sélecteur de rôles.

**Q: Comment réinitialiser mon mot de passe?**
A: Cliquez sur **"Mot de passe oublié?"** sur la page de connexion. Un lien de réinitialisation sera envoyé.

**Q: Mes données sont-elles sécurisées?**
A: Oui, nous utilisons le chiffrement SSL/TLS et les données sont chiffrées au repos. Conforme RGPD.

### Cours et Ressources
**Q: Combien d'élèves peuvent suivre un cours?**
A: Pas de limite technique, mais nous recommandons max 150 par classe pour une interaction optimale.

**Q: Quels formats de vidéo sont supportés?**
A: MP4, WebM, OGG, YouTube, Dailymotion, et autres services vidéo populaires.

**Q: Puis-je partager un cours avec un collègue?**
A: Oui, utilisez l'option **"Partager"** dans les paramètres du cours.

### Tâches et Évaluations
**Q: Les élèves peuvent-ils voir leurs évaluations?**
A: Oui, immédiatement après la publication par l'enseignant.

**Q: Peut-on assigner des tâches à des groupes?**
A: Oui, créez des groupes et assignez une tâche au groupe entier.

**Q: Comment les absences sont-elles enregistrées?**
A: Via le système de suivi du cours et les rapports administrateur.

### Support Technique
**Q: Où signaler un bug?**
A: **"Aide"** → **"Signaler un problème"** ou contactez support@ghosttech.com

**Q: Quel est le temps de réponse du support?**
A: Pour les problèmes critiques : 1h. Pour les autres : 24h.

---

## 🔧 DÉPANNAGE

### Problèmes Courants

#### "Page ne charge pas"
**Solution:**
1. Actualisez la page (Ctrl+F5 ou Cmd+Shift+R)
2. Videz le cache du navigateur
3. Essayez un autre navigateur
4. Vérifiez votre connexion internet
5. Vérifiez le statut du serveur : http://localhost:5000/api/health

#### "Impossible de se connecter"
**Solution:**
1. Vérifiez votre email et mot de passe
2. Vérifiez que votre compte est approuvé
3. Essayez **"Mot de passe oublié"**
4. Effacez les cookies du navigateur
5. Essayez une autre méthode d'authentification

#### "Vidéo qui met en mémoire tampon"
**Solution:**
1. Vérifiez votre connexion internet (idéalement > 5 Mbps)
2. Baissez la qualité de la vidéo
3. Fermez les autres applications
4. Videz le cache du navigateur
5. Essayez un autre navigateur

#### "Impossible de télécharger une tâche"
**Solution:**
1. Vérifiez la taille du fichier (max 500 MB)
2. Vérifiez le format de fichier accepté
3. Vérifiez que l'échéance n'est pas passée
4. Actualisez la page
5. Essayez un autre navigateur

#### "Les notifications ne s'affichent pas"
**Solution:**
1. Allez dans **"Paramètres"** → **"Notifications"**
2. Vérifiez que les notifications sont activées
3. Vérifiez les paramètres de votre navigateur
4. Autorisez les notifications pour le site
5. Redémarrez le navigateur

### Contacter le Support

**Email** : support@ghosttech.com
**Chat en direct** : Cliquez sur **"Aide"** en bas à droite
**Téléphone** : +33 1 XX XX XX XX (heures de bureau)
**Documentation** : https://docs.ghosttech.com

---

**Version du guide** : 1.0
**Dernière mise à jour** : 04/02/2026
**Support** : support@ghosttech.com

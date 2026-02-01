import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  AlertTitle,
} from '@mui/material';
import {
  Family as FamilyIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon,
  Edit as EditIcon,
  Chat as ChatIcon,
  NotificationsActive as NotificationsActiveIcon,
} from '@mui/icons-material';
import NotificationBell from './NotificationBell';

const ParentDashboard = ({ user }) => {
  const [children] = useState([
    {
      id: 1,
      name: 'Thomas Dupont',
      level: '3ème',
      school: 'Collège Central',
      generalAverage: 78,
      subjects: [
        { name: 'Français', grade: 82 },
        { name: 'Mathématiques', grade: 75 },
        { name: 'Histoire', grade: 88 },
        { name: 'Sciences', grade: 72 },
      ],
      alerts: ['Note basse en Physique-Chimie'],
      nextParentMeeting: '2026-02-10',
    },
    {
      id: 2,
      name: 'Sophie Dupont',
      level: '4ème',
      school: 'Collège Central',
      generalAverage: 85,
      subjects: [
        { name: 'Français', grade: 88 },
        { name: 'Mathématiques', grade: 82 },
        { name: 'Anglais', grade: 90 },
        { name: 'Sciences', grade: 80 },
      ],
      alerts: [],
      nextParentMeeting: '2026-02-15',
    },
  ]);

  const [communications] = useState([
    { id: 1, from: 'Mme Dubois (Français)', subject: 'Excellent travail!', date: '2026-01-18' },
    { id: 2, from: 'M. Bernard (Maths)', subject: 'À améliorer en géométrie', date: '2026-01-17' },
    { id: 3, from: 'Direction', subject: 'Rappel inscriptions 2026-2027', date: '2026-01-16' },
  ]);

  const [events] = useState([
    { id: 1, title: 'Journée Portes Ouvertes', date: '2026-02-05', location: 'Collège Central' },
    { id: 2, title: 'Réunion Parents-Professeurs', date: '2026-02-10', location: 'Salle des fêtes' },
    { id: 3, title: 'Excursion Musée d\'Orsay', date: '2026-02-18', location: 'Paris' },
  ]);

  return (
    <Box>
      {/* En-tête */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            👨‍👩‍👧‍👦 Espace Parent
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Bienvenue {user?.email ? user.email.split('@')[0] : ''}! Suivez la scolarité de vos enfants
          </Typography>
        </Box>
        <NotificationBell />
      </Box>

      {/* Alertes importantes */}
      {children.some(c => c.alerts.length > 0) && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <AlertTitle>⚠️ Éléments à Attention</AlertTitle>
          <Typography variant="body2">
            Vous avez des alertes pour certains enfants. Consultez leurs profils pour plus de détails.
          </Typography>
        </Alert>
      )}

      {/* Profils des Enfants */}
      {children.map((child, idx) => (
        <Paper key={child.id} sx={{ p: 4, mb: 4 }}>
          {/* En-tête enfant */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {child.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {child.level} • {child.school}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
                Moyenne: {child.generalAverage}/100
              </Typography>
              <LinearProgress variant="determinate" value={child.generalAverage} sx={{ width: 200 }} />
            </Box>
          </Box>

          {/* Alertes par enfant */}
          {child.alerts.length > 0 && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {child.alerts.map((alert, i) => (
                <Typography key={i} variant="body2">
                  ⚠️ {alert}
                </Typography>
              ))}
            </Alert>
          )}

          <Grid container spacing={3}>
            {/* Matières et Grades */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                📊 Notes par Matière
              </Typography>
              <Box sx={{ display: 'grid', gap: 2 }}>
                {child.subjects.map((subject, i) => (
                  <Box key={i}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{subject.name}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: subject.grade >= 80 ? 'success.main' : 'warning.main' }}>
                        {subject.grade}/100
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={subject.grade}
                      sx={{
                        height: 6,
                        backgroundColor: subject.grade >= 80 ? '#e8f5e9' : '#fff3e0',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Informations importantes */}
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  📅 Informations Importantes
                </Typography>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Prochaine Réunion Parents-Professeurs
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(child.nextParentMeeting).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Typography>
                  </CardContent>
                </Card>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" color="primary" size="small" fullWidth startIcon={<ChatIcon />}>
                    Contacter les Profs
                  </Button>
                  <Button variant="outlined" color="primary" size="small" fullWidth startIcon={<EditIcon />}>
                    Justificatif
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}

      {/* Communications de l'École */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <ChatIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Communications Récentes
          </Typography>
        </Box>

        <List>
          {communications.map((comm) => (
            <ListItem key={comm.id} sx={{ borderBottom: 1, borderColor: 'divider', '&:last-child': { borderBottom: 'none' } }}>
              <ListItemIcon>
                <NotificationsActiveIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={comm.subject}
                secondary={`${comm.from} • ${new Date(comm.date).toLocaleDateString('fr-FR')}`}
              />
              <Button variant="text" size="small">
                Lire
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Calendrier Scolaire */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <AssignmentIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            📅 Calendrier Scolaire
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {events.map((event) => (
            <Grid item xs={12} md={6} key={event.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    📅 {new Date(event.date).toLocaleDateString('fr-FR')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📍 {event.location}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Ajouter au Calendrier
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Actions Rapides */}
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          🚀 Actions Rapides
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="outlined" fullWidth color="primary">
              Justifier une Absence
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="outlined" fullWidth color="primary">
              Voir Emploi du Temps
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="outlined" fullWidth color="primary">
              Télécharger Bulletins
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant="outlined" fullWidth color="primary">
              Contacter la Direction
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ParentDashboard;

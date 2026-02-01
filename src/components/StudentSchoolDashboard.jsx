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
  Tab,
  Tabs,
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  EmojiEvents as EmojiEventsIcon,
  PlayCircle as PlayCircleIcon,
} from '@mui/icons-material';
import NotificationBell from './NotificationBell';
import MediaLibrary from './MediaLibrary';

const StudentSchoolDashboard = ({ user }) => {
  const [tabValue, setTabValue] = useState(0);

  const [subjects] = useState([
    {
      id: 1,
      name: 'Français',
      teacher: 'Mme Dubois',
      average: 82,
      nextClass: '2026-01-20',
      color: '#FF6B6B',
    },
    {
      id: 2,
      name: 'Mathématiques',
      teacher: 'M. Bernard',
      average: 75,
      nextClass: '2026-01-21',
      color: '#4ECDC4',
    },
    {
      id: 3,
      name: 'Histoire-Géographie',
      teacher: 'Mme Martin',
      average: 88,
      nextClass: '2026-01-22',
      color: '#FFE66D',
    },
    {
      id: 4,
      name: 'Sciences',
      teacher: 'M. Leclerc',
      average: 79,
      nextClass: '2026-01-23',
      color: '#95E1D3',
    },
  ]);

  const [exercises] = useState([
    { id: 1, title: 'Exercices de Conjugaison', subject: 'Français', difficulty: '⭐⭐', completed: false },
    { id: 2, title: 'Équations du 2nd degré', subject: 'Mathématiques', difficulty: '⭐⭐⭐', completed: true },
    { id: 3, title: 'Quiz Révolution Française', subject: 'Histoire', difficulty: '⭐⭐', completed: false },
    { id: 4, title: 'Expérience Chimie', subject: 'Sciences', difficulty: '⭐⭐⭐', completed: false },
  ]);

  const overallAverage = Math.round(subjects.reduce((sum, s) => sum + s.average, 0) / subjects.length);

  return (
    <Box>
      {/* En-tête */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            🎓 Espace Élève
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Bienvenue {user?.email ? user.email.split('@')[0] : ''}! Suivi de ta scolarité
          </Typography>
        </Box>
        <NotificationBell />
      </Box>

      {/* Statistiques rapides */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f0f7ff' }}>
            <EmojiEventsIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
              {overallAverage}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Moyenne Générale
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f0fff4' }}>
            <SchoolIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main', mb: 1 }}>
              {subjects.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Matières
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#fff0f5' }}>
            <PlayCircleIcon sx={{ fontSize: 40, color: '#E91E63', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#E91E63', mb: 1 }}>
              {exercises.filter(e => e.completed).length}/{exercises.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Exercices Complétés
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#fffbf0' }}>
            <AssignmentIcon sx={{ fontSize: 40, color: '#FF9800', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF9800', mb: 1 }}>
              3
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Devoirs à Faire
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Mes Matières */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <SchoolIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Mes Matières
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {subjects.map((subject) => (
            <Grid item xs={12} sm={6} md={3} key={subject.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderTop: `4px solid ${subject.color}`,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {subject.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {subject.teacher}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                      Note Moyenne
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={subject.average}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: subject.color,
                        },
                      }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1, color: subject.color }}>
                      {subject.average}/100
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions>
                  <Button size="small" color="primary" fullWidth>
                    Détails
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Exercices Interactifs */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <PlayCircleIcon sx={{ fontSize: 32, color: '#E91E63' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Exercices Interactifs
          </Typography>
        </Box>

        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="À Faire" />
          <Tab label="Complétés" />
          <Tab label="Tous" />
        </Tabs>

        <Box sx={{ display: 'grid', gap: 2 }}>
          {exercises.map((exercise) => (
            <Card key={exercise.id} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {exercise.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Chip label={exercise.subject} size="small" variant="outlined" />
                    <Chip label={exercise.difficulty} size="small" />
                  </Box>
                </Box>
                {exercise.completed ? (
                  <Chip label="✓ Complété" color="success" variant="filled" />
                ) : (
                  <Button variant="contained" color="primary" size="small">
                    Commencer
                  </Button>
                )}
              </Box>
            </Card>
          ))}
        </Box>
      </Paper>

      {/* Ressources */}
      <MediaLibrary />
    </Box>
  );
};

export default StudentSchoolDashboard;

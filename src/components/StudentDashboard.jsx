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
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  Chat as ChatIcon,
  Bookmark as BookmarkIcon,
} from '@mui/icons-material';
import NotificationBell from './NotificationBell';
import MediaLibrary from './MediaLibrary';

const StudentDashboard = ({ user }) => {
  const [enrolledCourses] = useState([
    {
      id: 1,
      title: 'React Avancé',
      professor: 'Dr. Jean Dupont',
      progress: 75,
      nextClass: '2026-01-20 10:00',
      grade: 85,
    },
    {
      id: 2,
      title: 'JavaScript ES6+',
      professor: 'Marie Laurent',
      progress: 60,
      nextClass: '2026-01-21 14:00',
      grade: 92,
    },
    {
      id: 3,
      title: 'Web Design',
      professor: 'Pierre Martin',
      progress: 88,
      nextClass: '2026-01-22 09:00',
      grade: 78,
    },
  ]);

  const [assignments] = useState([
    {
      id: 1,
      title: 'Créer une Todo App avec React',
      course: 'React Avancé',
      dueDate: '2026-01-25',
      status: 'pending',
      submissions: 0,
    },
    {
      id: 2,
      title: 'Exercices Promises et Async/Await',
      course: 'JavaScript ES6+',
      dueDate: '2026-01-23',
      status: 'submitted',
      submissions: 1,
    },
  ]);

  const stats = [
    { label: 'Moyenne Générale', value: '85' },
    { label: 'Cours Suivis', value: enrolledCourses.length },
    { label: 'Devoirs Restants', value: assignments.filter(a => a.status === 'pending').length },
  ];

  const getStatusColor = (status) => {
    return status === 'pending' ? 'warning' : 'success';
  };

  return (
    <Box>
      {/* En-tête */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            👨‍🎓 Espace Étudiant
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Bienvenue {user?.email ? user.email.split('@')[0] : ''}! Suivez votre progression
          </Typography>
        </Box>
        <NotificationBell />
      </Box>

      {/* Statistiques */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Mes Cours */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <SchoolIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Mes Cours
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {enrolledCourses.map((course) => (
            <Grid item xs={12} md={4} key={course.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Professeur: {course.professor}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Progression
                    </Typography>
                    <LinearProgress variant="determinate" value={course.progress} />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                      {course.progress}%
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Votre Note
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', color: course.grade >= 80 ? 'success.main' : 'warning.main' }}
                      >
                        {course.grade}%
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    📅 Prochain cours: {new Date(course.nextClass).toLocaleDateString('fr-FR')}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button size="small" color="primary">
                    Accéder
                  </Button>
                  <Button size="small" color="secondary">
                    Ressources
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Devoirs */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <AssignmentIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Mes Devoirs
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gap: 2 }}>
          {assignments.map((assignment) => (
            <Card key={assignment.id} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {assignment.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {assignment.course}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Chip
                      label={assignment.status === 'pending' ? 'À rendre' : 'Remis'}
                      color={getStatusColor(assignment.status)}
                      size="small"
                      variant="outlined"
                    />
                    <Typography variant="caption" color="text.secondary">
                      À rendre: {new Date(assignment.dueDate).toLocaleDateString('fr-FR')}
                    </Typography>
                  </Box>
                </Box>
                {assignment.status === 'pending' && (
                  <Button variant="contained" color="primary" size="small">
                    Remettre
                  </Button>
                )}
                {assignment.status === 'submitted' && (
                  <Chip label="Remis" color="success" variant="filled" size="small" />
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

export default StudentDashboard;

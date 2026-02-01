import React, { lazy, Suspense, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import NotificationBell from './NotificationBell';
import MediaLibrary from './MediaLibrary';

const LoadingSpinner = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
    <CircularProgress size={40} />
  </Box>
);

const TeacherDashboard = ({ user }) => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'React Avancé',
      students: 25,
      assignments: 5,
      averageGrade: 78,
      progress: 65,
    },
    {
      id: 2,
      title: 'JavaScript ES6+',
      students: 30,
      assignments: 3,
      averageGrade: 82,
      progress: 45,
    },
    {
      id: 3,
      title: 'Web Design',
      students: 18,
      assignments: 7,
      averageGrade: 85,
      progress: 80,
    },
  ]);

  const stats = [
    { label: 'Total Élèves', value: courses.reduce((sum, c) => sum + c.students, 0) },
    { label: 'Devoirs à Corriger', value: 12 },
    { label: 'Moyennes Classe', value: '81.7' },
  ];

  return (
    <Box>
      {/* En-tête avec notifications */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            👨‍🏫 Espace Professeur
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Bienvenue {user?.email ? user.email.split('@')[0] : ''}! Gérez vos cours et élèves
          </Typography>
        </Box>
        <NotificationBell />
      </Box>

      {/* Statistiques rapides */}
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SchoolIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Mes Cours
            </Typography>
          </Box>
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Créer un Cours
          </Button>
        </Box>

        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} md={4} key={course.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {course.title}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Progression du cours
                    </Typography>
                    <LinearProgress variant="determinate" value={course.progress} />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                      {course.progress}%
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Élèves
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {course.students}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Moyenne
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                        {course.averageGrade}%
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    {course.assignments} devoirs assignés
                  </Typography>
                </CardContent>

                <CardActions sx={{ pt: 0 }}>
                  <Button size="small" color="primary" startIcon={<EditIcon />}>
                    Éditer
                  </Button>
                  <Button size="small" color="error" startIcon={<DeleteIcon />}>
                    Supprimer
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Devoirs à Corriger */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <AssignmentIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Devoirs à Corriger
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gap: 2 }}>
          {[1, 2, 3].map((i) => (
            <Card key={i} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Devoir {i}: React Hooks
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    À rendre par 8 élèves • Cours: React Avancé
                  </Typography>
                </Box>
                <Button variant="outlined" color="primary">
                  Corriger
                </Button>
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

export default TeacherDashboard;

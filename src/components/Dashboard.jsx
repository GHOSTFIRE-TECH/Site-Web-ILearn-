import React, { lazy, Suspense } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';
import NotificationBell from './NotificationBell';
import MediaLibrary from './MediaLibrary';

// Lazy load des composants lourds
const CourseList = lazy(() => import('./CourseList'));
const AssignmentBoard = lazy(() => import('./AssignmentBoard'));
const ResultsPanel = lazy(() => import('./ResultsPanel'));
const ChatBox = lazy(() => import('./ChatBox'));

// Composant de chargement
const LoadingSpinner = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
    <CircularProgress size={40} />
  </Box>
);

const Dashboard = ({ user }) => {
  return (
    <Box>
      {/* En-tête avec notifications */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            👻 Bienvenue sur Ghost Tech {user?.email ? `, ${user.email.split('@')[0]}!` : ''}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Plateforme d'apprentissage interactive - Développez vos compétences
          </Typography>
        </Box>
        <NotificationBell />
      </Box>

      <Grid container spacing={3}>
        {/* Section Cours */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <SchoolIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Cours Recommandés
              </Typography>
            </Box>
            <Suspense fallback={<LoadingSpinner />}>
              <CourseList />
            </Suspense>
          </Paper>
        </Grid>

        {/* Section Devoirs */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AssignmentIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Devoirs à Rendre
              </Typography>
            </Box>
            <Suspense fallback={<LoadingSpinner />}>
              <AssignmentBoard user={user} />
            </Suspense>
          </Paper>
        </Grid>

        {/* Section Résultats */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TrendingUpIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Résultats Scolaires
              </Typography>
            </Box>
            <Suspense fallback={<LoadingSpinner />}>
              <ResultsPanel />
            </Suspense>
          </Paper>
        </Grid>

        {/* Section Chat */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <ChatIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Chat Collaboratif
              </Typography>
            </Box>
            <Suspense fallback={<LoadingSpinner />}>
              <ChatBox user={user} />
            </Suspense>
          </Paper>
        </Grid>
      </Grid>

      {/* Section Ressources - Livres, Vidéos et Images */}
      <Box sx={{ mt: 6 }}>
        <MediaLibrary />
      </Box>
    </Box>
  );
};

export default Dashboard;
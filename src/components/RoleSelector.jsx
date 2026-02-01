import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  School as SchoolIcon,
  Person as PersonIcon,
  Groups as GroupsIcon,
  Family as FamilyIcon,
} from '@mui/icons-material';

const RoleSelector = ({ onRoleSelect }) => {
  const roles = [
    {
      id: 'teacher',
      title: '👨‍🏫 Professeur',
      description: 'Gérez vos cours, suivez vos élèves, créez des devoirs et évaluations.',
      icon: <SchoolIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      color: 'primary',
      features: [
        '📚 Créer et gérer les cours',
        '👥 Suivre les élèves',
        '📝 Assigner des devoirs',
        '⭐ Noter et évaluer',
        '📊 Voir les statistiques',
      ],
    },
    {
      id: 'student',
      title: '👨‍🎓 Étudiant',
      description: 'Accédez à vos cours, ressources, et suivi académique complet.',
      icon: <PersonIcon sx={{ fontSize: 60, color: '#4CAF50' }} />,
      color: 'success',
      features: [
        '📚 Accès aux cours',
        '📹 Vidéos et ressources',
        '📝 Devoirs à rendre',
        '⭐ Voir vos notes',
        '📈 Suivi de progression',
      ],
    },
    {
      id: 'student_school',
      title: '🎓 Élève',
      description: 'Plateforme adaptée pour les élèves du secondaire avec suivi personnalisé.',
      icon: <GroupsIcon sx={{ fontSize: 60, color: '#FF9800' }} />,
      color: 'warning',
      features: [
        '📚 Accès aux matières',
        '📹 Tutoriels vidéo',
        '🎮 Exercices interactifs',
        '📊 Carnet de notes',
        '🔔 Notifications',
      ],
    },
    {
      id: 'parent',
      title: '👨‍👩‍👧‍👦 Parent',
      description: 'Suivez la scolarité de vos enfants et communiquez avec l\'école.',
      icon: <FamilyIcon sx={{ fontSize: 60, color: '#2196F3' }} />,
      color: 'info',
      features: [
        '👶 Suivi des enfants',
        '📊 Notes et résultats',
        '💬 Communications',
        '📅 Calendrier scolaire',
        '⚠️ Alertes importants',
      ],
    },
  ];

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        {/* En-tête */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 2,
            }}
          >
            👻 Bienvenue sur Ghost Tech
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Sélectionnez votre type de compte pour accéder à votre espace personnalisé
          </Typography>
        </Box>

        {/* Cartes des rôles */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {roles.map((role) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={role.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                    {role.icon}
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      mb: 2,
                    }}
                  >
                    {role.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textAlign: 'center',
                      mb: 3,
                      minHeight: 60,
                    }}
                  >
                    {role.description}
                  </Typography>

                  {/* Fonctionnalités */}
                  <Box sx={{ mb: 2 }}>
                    {role.features.map((feature, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        sx={{
                          mb: 1,
                          display: 'flex',
                          alignItems: 'center',
                          color: 'text.secondary',
                        }}
                      >
                        ✓ {feature}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>

                <CardActions sx={{ pt: 0, justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color={role.color}
                    size="large"
                    fullWidth
                    onClick={() => onRoleSelect(role.id)}
                    sx={{
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                    }}
                  >
                    Continuer comme {role.title.split(' ')[1]}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Section informations */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            bgcolor: 'primary.light',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            ℹ️ Vous pouvez changer votre rôle à tout moment
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Accédez aux paramètres de votre compte pour basculer entre différents rôles
            ou créer plusieurs comptes avec différents rôles.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default RoleSelector;

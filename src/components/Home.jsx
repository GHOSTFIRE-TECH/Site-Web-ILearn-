import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import {
  School as SchoolIcon,
} from '@mui/icons-material';
import MediaLibrary from './MediaLibrary';

const Home = ({ onNavigate }) => {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Paper
          elevation={0}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            p: 6,
            borderRadius: 3,
            mb: 8,
            textAlign: 'center',
          }}
        >
          <Box sx={{ mb: 3 }}>
            <SchoolIcon sx={{ fontSize: 80, color: 'secondary.main' }} />
          </Box>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            👻 Bienvenue sur Ghost Tech Learning Platform
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, fontWeight: 300 }}>
            La plateforme d'apprentissage moderne pour développeurs et étudiants en informatique
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => onNavigate('login')}
              sx={{ px: 4, py: 1.5 }}
            >
              Se Connecter
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => onNavigate('register')}
              sx={{ px: 4, py: 1.5 }}
            >
              S'Inscrire
            </Button>
          </Box>
        </Paper>

        {/* Ressources Section */}
        <MediaLibrary />

        {/* Info Section */}
        <Paper
          elevation={1}
          sx={{
            p: 4,
            mb: 6,
            bgcolor: 'white',
            borderLeft: 5,
            borderColor: 'primary.main',
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            📚 À Propos de Ghost Tech
          </Typography>
          <Typography variant="body1" paragraph>
            Ghost Tech est une plateforme d'apprentissage révolutionnaire conçue pour les développeurs,
            étudiants en informatique et professionnels cherchant à améliorer leurs compétences. Notre
            mission est de rendre l'éducation technique accessible, engageante et personnalisée.
          </Typography>
          <Typography variant="body1" paragraph>
            Avec une interface intuitive, une communauté engagée et des ressources de qualité, nous vous
            accompagnons dans votre parcours d'apprentissage. De la programmation web à la data science,
            trouvez les cours et les mentors qui vous inspireront.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Lancé en 2024 • Plus de 1000 utilisateurs • 500+ heures de contenu</strong>
          </Typography>
        </Paper>

        {/* CTA Section */}
        <Paper
          elevation={0}
          sx={{
            bgcolor: 'secondary.main',
            color: 'white',
            p: 6,
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Prêt à Commencer votre Apprentissage ?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Créez votre compte gratuitement et accédez à tous nos cours et ressources immédiatement.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => onNavigate('register')}
            sx={{ px: 4, py: 1.5 }}
          >
            Créer un Compte Maintenant
          </Button>
        </Paper>

        {/* Footer */}
        <Box sx={{ mt: 8, pt: 4, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 Ghost Tech Learning Platform. Tous droits réservés.
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            Plateforme sécurisée • Authentification Firebase • Support 24/7
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

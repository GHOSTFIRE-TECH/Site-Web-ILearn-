import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  IconButton,
  InputAdornment,
  Container,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  School as SchoolIcon,
  PersonAdd as PersonAddIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';

const Register = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [success, setSuccess] = useState(false);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    return (strength / 5) * 100;
  };

  const getPasswordStrengthLabel = (strength) => {
    if (strength < 40) return { label: 'Faible', color: 'error' };
    if (strength < 70) return { label: 'Moyen', color: 'warning' };
    return { label: 'Fort', color: 'success' };
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue,
    });
    
    // Calculer la force du mot de passe
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    setError('');
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('L\'email est requis');
      return false;
    }
    if (!formData.password) {
      setError('Le mot de passe est requis');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }
    if (!formData.acceptTerms) {
      setError('Vous devez accepter les conditions d\'utilisation');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Créer l'utilisateur avec email et mot de passe
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Mettre à jour le profil avec le prénom et nom
      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      // Sauvegarder les informations supplémentaires dans Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        displayName: `${formData.firstName} ${formData.lastName}`,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        accountStatus: 'active',
        profileComplete: true,
      });

      setSuccess(true);
      toast.success('Inscription réussie ! Bienvenue sur Ghost Tech');
      
      // Rediriger après 2 secondes
      setTimeout(() => {
        onRegister({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: `${formData.firstName} ${formData.lastName}`,
        });
      }, 2000);
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      let errorMessage = 'Erreur d\'inscription';
      
      switch(error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Cet email est déjà utilisé';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email invalide';
          break;
        case 'auth/weak-password':
          errorMessage = 'Le mot de passe est trop faible (minimum 6 caractères)';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Les inscriptions sont actuellement désactivées';
          break;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mt: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <SchoolIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            👻 Rejoindre Ghost Tech
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Créez votre compte pour accéder à tous les cours
          </Typography>
        </Box>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            ✅ Inscription réussie ! Redirection en cours...
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Prénom"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={loading || success}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonAddIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Nom"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={loading || success}
              required
            />
          </Box>

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            disabled={loading || success}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
            helperText="Nous vous enverrons un email de confirmation"
          />

          <Box sx={{ mt: 2, mb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Force du mot de passe
              </Typography>
              {formData.password && (
                <Typography 
                  variant="caption"
                  sx={{ color: `${getPasswordStrengthLabel(passwordStrength).color}.main` }}
                >
                  {getPasswordStrengthLabel(passwordStrength).label}
                </Typography>
              )}
            </Box>
            {formData.password && (
              <LinearProgress 
                variant="determinate" 
                value={passwordStrength}
                sx={{ 
                  height: 6, 
                  borderRadius: 3,
                  backgroundColor: 'action.disabled',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: passwordStrength < 40 ? '#d32f2f' : passwordStrength < 70 ? '#f57c00' : '#388e3c'
                  }
                }}
              />
            )}
          </Box>

          <TextField
            fullWidth
            label="Mot de passe"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            disabled={loading || success}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disabled={loading}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {formData.password && (
            <List sx={{ py: 1, px: 0 }}>
              <ListItem dense disableGutters>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {formData.password.length >= 8 ? (
                    <CheckIcon sx={{ color: 'success.main', fontSize: 20 }} />
                  ) : (
                    <CloseIcon sx={{ color: 'action.disabled', fontSize: 20 }} />
                  )}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="caption">
                      Minimum 8 caractères
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem dense disableGutters>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {/[A-Z]/.test(formData.password) ? (
                    <CheckIcon sx={{ color: 'success.main', fontSize: 20 }} />
                  ) : (
                    <CloseIcon sx={{ color: 'action.disabled', fontSize: 20 }} />
                  )}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="caption">
                      Au moins une lettre majuscule
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem dense disableGutters>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {/[0-9]/.test(formData.password) ? (
                    <CheckIcon sx={{ color: 'success.main', fontSize: 20 }} />
                  ) : (
                    <CloseIcon sx={{ color: 'action.disabled', fontSize: 20 }} />
                  )}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="caption">
                      Au moins un chiffre
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          )}

          <TextField
            fullWidth
            label="Confirmer le mot de passe"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
            disabled={loading || success}
            error={formData.confirmPassword !== '' && formData.password !== formData.confirmPassword}
            helperText={formData.confirmPassword !== '' && formData.password !== formData.confirmPassword ? 'Les mots de passe ne correspondent pas' : ''}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                color="primary"
                disabled={loading || success}
              />
            }
            label={
              <Typography variant="body2">
                J'accepte les{' '}
                <Box component="span" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                  conditions d'utilisation
                </Box>
                {' '}et la{' '}
                <Box component="span" sx={{ color: 'primary.main', cursor: 'pointer' }}>
                  politique de confidentialité
                </Box>
              </Typography>
            }
            sx={{ mt: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading || !formData.acceptTerms || success}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {loading ? 'Inscription en cours...' : 'Créer mon compte'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Vous avez déjà un compte ?{' '}
              <Button
                color="primary"
                onClick={onSwitchToLogin}
                sx={{ textTransform: 'none' }}
                disabled={loading}
              >
                Se connecter
              </Button>
            </Typography>
          </Box>
        </form>

        <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary">
            🔒 Vos données sont sécurisées avec Firebase Authentication
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
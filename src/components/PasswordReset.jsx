import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Lock as LockIcon,
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';
import { toast } from 'react-toastify';

const PasswordReset = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSendReset = async () => {
    if (!email.trim()) {
      setError('Veuillez entrer votre email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      toast.success('Email de réinitialisation envoyé !');

      // Fermer après 3 secondes
      setTimeout(() => {
        setEmail('');
        setSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Erreur:', error);
      let errorMessage = 'Erreur lors de l\'envoi de l\'email';

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Aucun compte trouvé avec cet email';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email invalide';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Trop de tentatives. Réessayez plus tard.';
          break;
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setEmail('');
      setError('');
      setSuccess(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LockIcon color="primary" />
        Réinitialiser votre mot de passe
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {success ? (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Email envoyé avec succès!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Vérifiez votre email pour réinitialiser votre mot de passe.
              Un lien de réinitialisation vous a été envoyé.
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Entrez l'adresse email associée à votre compte Ghost Tech.
              Nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ my: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Adresse email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              disabled={loading}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 1 }}>
                    <EmailIcon color="action" />
                  </Box>
                ),
              }}
              placeholder="votre@email.com"
            />

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
              💡 Astuce: Vérifiez votre dossier spam si vous ne recevez pas l'email.
            </Typography>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} disabled={loading}>
          {success ? 'Fermer' : 'Annuler'}
        </Button>
        {!success && (
          <Button
            onClick={handleSendReset}
            variant="contained"
            color="primary"
            disabled={loading || !email.trim()}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Envoi...
              </>
            ) : (
              'Envoyer le lien'
            )}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PasswordReset;

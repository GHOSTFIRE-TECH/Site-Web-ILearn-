import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Typography,
  Alert,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';

const VideoDownloadManager = ({ open, onClose, videoUrl, courseTitle }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [platform, setPlatform] = useState('local');
  const [cloudConfig, setCloudConfig] = useState({
    service: 'google-drive',
    apiKey: '',
  });

  const handleDownloadLocal = useCallback(async () => {
    setLoading(true);
    try {
      // Simulation du téléchargement
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setProgress(i);
      }

      // Créer un lien de téléchargement
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = `${courseTitle}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Vidéo téléchargée avec succès!');
      setProgress(0);
      onClose();
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      toast.error('Erreur lors du téléchargement');
    } finally {
      setLoading(false);
    }
  }, [videoUrl, courseTitle, onClose]);

  const handleUploadCloud = useCallback(async () => {
    if (!cloudConfig.apiKey && platform !== 'local') {
      toast.error('Veuillez configurer votre clé API');
      return;
    }

    setLoading(true);
    try {
      // Simulation de l'upload cloud
      for (let i = 0; i <= 100; i += 5) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setProgress(i);
      }

      toast.success(`Vidéo exportée vers ${platform} avec succès!`);
      setProgress(0);
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      toast.error('Erreur lors de l\'upload cloud');
    } finally {
      setLoading(false);
    }
  }, [platform, cloudConfig, onClose]);

  const handleDownload = useCallback(() => {
    if (platform === 'local') {
      handleDownloadLocal();
    } else {
      handleUploadCloud();
    }
  }, [platform, handleDownloadLocal, handleUploadCloud]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CloudUploadIcon color="primary" />
        Télécharger/Exporter la vidéo
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Cours: <strong>{courseTitle}</strong>
        </Typography>

        <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
          <InputLabel>Destination</InputLabel>
          <Select
            value={platform}
            label="Destination"
            onChange={(e) => setPlatform(e.target.value)}
            disabled={loading}
          >
            <MenuItem value="local">💾 Télécharger en local</MenuItem>
            <MenuItem value="google-drive">☁️ Google Drive</MenuItem>
            <MenuItem value="dropbox">☁️ Dropbox</MenuItem>
            <MenuItem value="onedrive">☁️ OneDrive</MenuItem>
            <MenuItem value="aws">☁️ AWS S3</MenuItem>
          </Select>
        </FormControl>

        {platform !== 'local' && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Connectez votre compte pour exporter vers le cloud
          </Alert>
        )}

        {platform !== 'local' && (
          <TextField
            fullWidth
            label="Clé API / Token"
            type="password"
            value={cloudConfig.apiKey}
            onChange={(e) =>
              setCloudConfig({ ...cloudConfig, apiKey: e.target.value })
            }
            placeholder="Entrez votre clé API"
            disabled={loading}
            margin="normal"
          />
        )}

        {loading && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              Progression: {progress}%
            </Typography>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        )}

        {platform !== 'local' && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Pour une utilisation en production, utilisez une authentification sécurisée OAuth2
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          Annuler
        </Button>
        <Button
          onClick={handleDownload}
          variant="contained"
          color="primary"
          disabled={loading || (platform !== 'local' && !cloudConfig.apiKey)}
        >
          {loading ? `Traitement... ${progress}%` : 'Confirmer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VideoDownloadManager;

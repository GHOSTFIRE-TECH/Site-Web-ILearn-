const express = require('express');
const router = express.Router();

/**
 * POST /api/auth/oauth-url
 * Obtenir l'URL d'authentification OAuth2
 */
router.post('/oauth-url', (req, res) => {
  try {
    const { service } = req.body;

    if (!service) {
      return res.status(400).json({ message: 'Service manquant' });
    }

    const oauthUrls = {
      'google-drive': `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/drive.file`,
      'dropbox': `https://www.dropbox.com/oauth2/authorize?client_id=${process.env.DROPBOX_CLIENT_ID}&redirect_uri=${process.env.DROPBOX_REDIRECT_URI}&response_type=code`,
      'onedrive': `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.ONEDRIVE_CLIENT_ID}&redirect_uri=${process.env.ONEDRIVE_REDIRECT_URI}&response_type=code&scope=Files.ReadWrite`,
      'aws': `https://console.aws.amazon.com/`,
    };

    const authUrl = oauthUrls[service];
    if (!authUrl) {
      return res.status(400).json({ message: 'Service non supporté' });
    }

    res.json({ authUrl });
  } catch (error) {
    console.error('Erreur auth:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

/**
 * POST /api/auth/callback
 * Traiter le callback OAuth2
 */
router.post('/callback', (req, res) => {
  try {
    const { code, service } = req.body;

    if (!code || !service) {
      return res.status(400).json({ message: 'Code ou service manquant' });
    }

    // Simuler l'échange du code pour un token
    const token = Buffer.from(`${service}:${code}:${Date.now()}`).toString('base64');
    const expiresIn = 3600;

    res.json({ token, expiresIn });
  } catch (error) {
    console.error('Erreur callback:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;

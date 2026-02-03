const express = require('express');
const router = express.Router();

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  req.token = token;
  next();
};

/**
 * POST /api/upload/:platform
 * Uploader une vidéo vers une plateforme cloud
 */
router.post('/:platform', authenticateToken, (req, res) => {
  try {
    const { platform } = req.params;
    const { videoUrl, courseTitle } = req.body;

    if (!videoUrl || !courseTitle) {
      return res.status(400).json({ message: 'Paramètres manquants' });
    }

    // Simuler l'upload
    const uploadId = `upload_${Date.now()}`;
    
    res.json({
      success: true,
      uploadId,
      platform,
      videoUrl,
      courseTitle,
      status: 'completed',
      message: `Vidéo uploadée avec succès vers ${platform}`,
    });
  } catch (error) {
    console.error('Erreur upload:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

/**
 * GET /api/uploads/history
 * Obtenir l'historique des uploads
 */
router.get('/history', authenticateToken, (req, res) => {
  try {
    res.json({
      uploads: [
        {
          id: 'upload_1',
          platform: 'google-drive',
          title: 'Vidéo 1',
          date: new Date().toISOString(),
          status: 'completed',
        },
      ],
    });
  } catch (error) {
    console.error('Erreur history:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

/**
 * POST /api/uploads/:uploadId/cancel
 * Annuler un upload
 */
router.post('/:uploadId/cancel', authenticateToken, (req, res) => {
  try {
    const { uploadId } = req.params;

    res.json({
      success: true,
      uploadId,
      status: 'cancelled',
      message: 'Upload annulé',
    });
  } catch (error) {
    console.error('Erreur cancel:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;

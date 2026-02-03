const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

class UploadService {
  /**
   * Uploader une vidéo vers le cloud
   */
  static async uploadVideo(platform, videoUrl, courseTitle, authToken) {
    if (!platform || !videoUrl || !authToken) {
      throw new Error('Paramètres manquants');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/upload/${platform}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          videoUrl,
          courseTitle: courseTitle || 'Sans titre',
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          throw new Error('401: Session expirée');
        }
        throw new Error(errorData.message || `Erreur ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur UploadService.uploadVideo:', error);
      throw new Error(`Erreur lors de l'upload: ${error.message}`);
    }
  }

  /**
   * Obtenir l'historique des uploads
   */
  static async getUploadHistory(authToken) {
    if (!authToken) {
      throw new Error('Token manquant');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/uploads/history`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Erreur UploadService.getUploadHistory:', error);
      throw new Error(`Impossible de récupérer l'historique: ${error.message}`);
    }
  }

  /**
   * Annuler un upload
   */
  static async cancelUpload(uploadId, authToken) {
    if (!uploadId || !authToken) {
      throw new Error('Paramètres manquants');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/uploads/${uploadId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Erreur UploadService.cancelUpload:', error);
      throw new Error(`Impossible d'annuler l'upload: ${error.message}`);
    }
  }

  /**
   * Valider une URL
   */
  static isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}

export default UploadService;

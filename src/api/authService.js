const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

class AuthService {
  /**
   * Obtenir l'URL d'authentification OAuth2
   */
  static async getOAuthUrl(service) {
    if (!service) {
      throw new Error('Service non spécifié');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/oauth-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur ${response.status}`);
      }

      const data = await response.json();
      if (!data.authUrl) {
        throw new Error('URL d\'authentification manquante');
      }

      return data;
    } catch (error) {
      console.error('Erreur AuthService.getOAuthUrl:', error);
      throw new Error(`Impossible de récupérer l'URL d'authentification: ${error.message}`);
    }
  }

  /**
   * Stocker le token de manière sécurisée
   */
  static storeToken(service, token, expiresIn) {
    if (!service || !token) {
      throw new Error('Service et token requis');
    }

    try {
      const expiresAt = Date.now() + (expiresIn || 3600) * 1000;
      sessionStorage.setItem(`${service}_token`, token);
      sessionStorage.setItem(`${service}_expires`, expiresAt.toString());
    } catch (error) {
      console.error('Erreur AuthService.storeToken:', error);
      throw new Error('Impossible de stocker le token');
    }
  }

  /**
   * Récupérer le token valide
   */
  static getValidToken(service) {
    if (!service) return null;

    try {
      const token = sessionStorage.getItem(`${service}_token`);
      const expiresAt = parseInt(sessionStorage.getItem(`${service}_expires`), 10);

      if (!token || !expiresAt || Date.now() > expiresAt) {
        this.clearToken(service);
        return null;
      }

      return token;
    } catch (error) {
      console.error('Erreur AuthService.getValidToken:', error);
      return null;
    }
  }

  /**
   * Effacer le token
   */
  static clearToken(service) {
    if (!service) return;

    try {
      sessionStorage.removeItem(`${service}_token`);
      sessionStorage.removeItem(`${service}_expires`);
    } catch (error) {
      console.error('Erreur AuthService.clearToken:', error);
    }
  }

  /**
   * Vérifier si le token est expiré
   */
  static isTokenExpired(service) {
    if (!service) return true;

    try {
      const expiresAt = parseInt(sessionStorage.getItem(`${service}_expires`), 10);
      return !expiresAt || Date.now() > expiresAt;
    } catch (error) {
      console.error('Erreur AuthService.isTokenExpired:', error);
      return true;
    }
  }

  /**
   * Obtenir le temps restant avant expiration
   */
  static getTimeUntilExpiry(service) {
    if (!service) return 0;

    try {
      const expiresAt = parseInt(sessionStorage.getItem(`${service}_expires`), 10);
      if (!expiresAt) return 0;

      const timeLeft = expiresAt - Date.now();
      return Math.max(0, timeLeft);
    } catch (error) {
      console.error('Erreur AuthService.getTimeUntilExpiry:', error);
      return 0;
    }
  }
}

export default AuthService;

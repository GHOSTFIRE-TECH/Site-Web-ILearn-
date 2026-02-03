/**
 * Configuration OAuth2 pour chaque service
 * IMPORTANT: Ces secrets DOIVENT être stockés en variables d'environnement serveur uniquement
 */

const OAUTH_CONFIG = {
  'google-drive': {
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scope: 'https://www.googleapis.com/auth/drive.file',
  },
  'dropbox': {
    clientId: process.env.DROPBOX_OAUTH_CLIENT_ID,
    clientSecret: process.env.DROPBOX_OAUTH_CLIENT_SECRET,
    redirectUri: process.env.DROPBOX_OAUTH_REDIRECT_URI,
    authUrl: 'https://www.dropbox.com/oauth2/authorize',
    tokenUrl: 'https://api.dropboxapi.com/oauth2/token',
    scope: 'files.content.write',
  },
  'onedrive': {
    clientId: process.env.ONEDRIVE_OAUTH_CLIENT_ID,
    clientSecret: process.env.ONEDRIVE_OAUTH_CLIENT_SECRET,
    redirectUri: process.env.ONEDRIVE_OAUTH_REDIRECT_URI,
    authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    scope: 'Files.ReadWrite',
  },
};

/**
 * Générer URL d'authentification OAuth2
 * @param {string} service - Service cloud (google-drive, dropbox, onedrive, aws)
 * @returns {string} URL d'authentification
 */
export const getOAuthUrl = (service) => {
  const config = OAUTH_CONFIG[service];
  if (!config) throw new Error('Service non supporté');

  const state = Math.random().toString(36).substring(7);
  // Stocker le state en session pour vérification
  
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    scope: config.scope,
    state,
    access_type: 'offline',
  });

  return `${config.authUrl}?${params.toString()}`;
};

/**
 * Échanger le code d'authentification pour un token
 * À appeler UNIQUEMENT côté serveur
 */
export const exchangeCodeForToken = async (service, code) => {
  const config = OAUTH_CONFIG[service];
  if (!config) throw new Error('Service non supporté');

  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code,
      redirect_uri: config.redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de l\'échange du code');
  }

  return response.json();
};

import React from 'react';
import { Box, Button, Typography, Alert, Container } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

/**
 * Composant Error Boundary pour capturer les erreurs React
 * Empêche la crash totale de l'application
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Mettre à jour l'état pour afficher le fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Enregistrer l'erreur pour debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Sauvegarder les infos de l'erreur
    this.setState({
      error,
      errorInfo,
    });

    // Vous pouvez aussi envoyer l'erreur à un service de logging
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
              textAlign: 'center',
            }}
          >
            <ErrorIcon
              sx={{
                fontSize: 80,
                color: 'error.main',
                mb: 2,
              }}
            />
            <Typography variant="h4" gutterBottom>
              Oups! Une erreur s'est produite
            </Typography>
            <Alert severity="error" sx={{ my: 2, width: '100%' }}>
              {this.state.error?.message || 'Une erreur inattendue s\'est produite'}
            </Alert>
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: '#f5f5f5',
                  borderRadius: 1,
                  textAlign: 'left',
                  maxHeight: '200px',
                  overflow: 'auto',
                  width: '100%',
                }}
              >
                <Typography variant="body2" component="pre" sx={{ fontSize: '0.75rem' }}>
                  {this.state.errorInfo.componentStack}
                </Typography>
              </Box>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleReset}
              sx={{ mt: 3 }}
            >
              Réessayer
            </Button>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

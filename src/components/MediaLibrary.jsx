import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Download as DownloadIcon,
  OpenInNew as OpenInNewIcon,
  School as SchoolIcon,
  OndemandVideo as VideoIcon,
} from '@mui/icons-material';

const MediaLibrary = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);

  // Livres disponibles
  const books = [
    {
      id: 1,
      title: 'JavaScript Avancé',
      description: 'Maîtrisez les concepts avancés de JavaScript ES6+',
      image: '/images/Javascript-book.jpg',
      url: '/images/Javascript-book.jpg',
    },
    {
      id: 2,
      title: 'Python Pour Débutants',
      description: 'Apprenez les bases de la programmation Python',
      image: '/images/python-book.jpg',
      url: '/images/python-book.jpg',
    },
    {
      id: 3,
      title: 'React Moderne',
      description: 'Guide complet de React avec les Hooks',
      image: '/images/react-book.jpg',
      url: '/images/react-book.jpg',
    },
    {
      id: 4,
      title: 'Mathématiques pour Programmeurs',
      description: 'Concepts mathématiques essentiels',
      image: '/images/maths-book.jpg',
      url: '/images/maths-book.jpg',
    },
    {
      id: 5,
      title: 'Physique Appliquée',
      description: 'Principes physiques en informatique',
      image: '/images/physics-book.jpg',
      url: '/images/physics-book.jpg',
    },
  ];

  // Vidéos (à ajouter selon vos vidéos)
  const videos = [
    {
      id: 1,
      title: 'Introduction à React',
      description: 'Apprenez les bases de React en 30 minutes',
      thumbnail: '/images/ghost-logo.png',
      duration: '30:45',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      id: 2,
      title: 'Hooks React Avancés',
      description: 'Utilisez les Hooks pour optimiser vos composants',
      thumbnail: '/images/ghost-logo.png',
      duration: '45:20',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      id: 3,
      title: 'JavaScript Modern',
      description: 'Les features ES6+ que tout développeur doit connaître',
      thumbnail: '/images/ghost-logo.png',
      duration: '50:15',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
  ];

  // Images (ressources visuelles)
  const images = [
    {
      id: 1,
      title: 'Architecture React',
      description: 'Diagramme de l\'architecture recommandée',
      url: '/images/ghost-logo.png',
    },
    {
      id: 2,
      title: 'Cycle de vie JavaScript',
      description: 'Explication visuelle du cycle de vie',
      url: '/images/ghost-logo.png',
    },
    {
      id: 3,
      title: 'Bonnes pratiques',
      description: 'Résumé des bonnes pratiques en développement',
      url: '/images/ghost-logo.png',
    },
  ];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenPreview = (media) => {
    setSelectedMedia(media);
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
    setSelectedMedia(null);
  };

  const handleDownload = (mediaUrl, title) => {
    const link = document.createElement('a');
    link.href = mediaUrl;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderBooks = () => (
    <Grid container spacing={3}>
      {books.map((book) => (
        <Grid item xs={12} sm={6} md={4} key={book.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 4,
              },
            }}
          >
            <CardMedia
              component="img"
              height="240"
              image={book.image}
              alt={book.title}
              sx={{ objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => handleOpenPreview(book)}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" sx={{ fontWeight: 'bold' }}>
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {book.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ pt: 0 }}>
              <Button
                size="small"
                color="primary"
                startIcon={<OpenInNewIcon />}
                onClick={() => handleOpenPreview(book)}
              >
                Aperçu
              </Button>
              <Button
                size="small"
                color="primary"
                startIcon={<DownloadIcon />}
                onClick={() => handleDownload(book.url, book.title)}
              >
                Télécharger
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderVideos = () => (
    <Grid container spacing={3}>
      {videos.map((video) => (
        <Grid item xs={12} sm={6} md={4} key={video.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 4,
              },
            }}
          >
            <CardMedia
              component="img"
              height="240"
              image={video.thumbnail}
              alt={video.title}
              sx={{
                objectFit: 'cover',
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={() => handleOpenPreview(video)}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '50%',
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 12,
                ml: 2,
              }}
            >
              <VideoIcon sx={{ fontSize: 30, color: 'white' }} />
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" sx={{ fontWeight: 'bold' }}>
                {video.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {video.description}
              </Typography>
              <Typography variant="caption" color="primary">
                ⏱️ {video.duration}
              </Typography>
            </CardContent>
            <CardActions sx={{ pt: 0 }}>
              <Button
                size="small"
                color="primary"
                startIcon={<OpenInNewIcon />}
                onClick={() => handleOpenPreview(video)}
              >
                Regarder
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderImages = () => (
    <Grid container spacing={3}>
      {images.map((image) => (
        <Grid item xs={12} sm={6} md={4} key={image.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 4,
              },
            }}
          >
            <CardMedia
              component="img"
              height="240"
              image={image.url}
              alt={image.title}
              sx={{ objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => handleOpenPreview(image)}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" sx={{ fontWeight: 'bold' }}>
                {image.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {image.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ pt: 0 }}>
              <Button
                size="small"
                color="primary"
                startIcon={<OpenInNewIcon />}
                onClick={() => handleOpenPreview(image)}
              >
                Voir
              </Button>
              <Button
                size="small"
                color="primary"
                startIcon={<DownloadIcon />}
                onClick={() => handleDownload(image.url, image.title)}
              >
                Télécharger
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ py: 6, bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        {/* En-tête */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <SchoolIcon sx={{ fontSize: 40 }} />
            Bibliothèque de Ressources
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
            Accédez à tous les livres, vidéos et images créés pour votre apprentissage.
            Téléchargez-les gratuitement et apprenez à votre rythme.
          </Typography>
        </Box>

        {/* Onglets */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="resource tabs"
          >
            <Tab
              label="📚 Livres"
              sx={{ textTransform: 'none', fontSize: '1rem' }}
            />
            <Tab
              label="🎬 Vidéos"
              sx={{ textTransform: 'none', fontSize: '1rem' }}
            />
            <Tab
              label="🖼️ Images"
              sx={{ textTransform: 'none', fontSize: '1rem' }}
            />
          </Tabs>
        </Box>

        {/* Contenu des onglets */}
        <Box sx={{ mb: 6 }}>
          {selectedTab === 0 && renderBooks()}
          {selectedTab === 1 && renderVideos()}
          {selectedTab === 2 && renderImages()}
        </Box>
      </Container>

      {/* Dialog d'aperçu */}
      <Dialog
        open={openPreview}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
      >
        {selectedMedia && (
          <>
            <DialogTitle>{selectedMedia.title}</DialogTitle>
            <DialogContent>
              {selectedMedia.url && selectedMedia.url.includes('embed') ? (
                // Vidéo YouTube
                <Box
                  component="iframe"
                  src={selectedMedia.url}
                  width="100%"
                  height="400"
                  frameBorder="0"
                  allowFullScreen
                  sx={{ my: 2 }}
                />
              ) : (
                // Image
                <Box
                  component="img"
                  src={selectedMedia.image || selectedMedia.url}
                  alt={selectedMedia.title}
                  sx={{
                    width: '100%',
                    maxHeight: '500px',
                    objectFit: 'contain',
                    my: 2,
                  }}
                />
              )}
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {selectedMedia.description}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePreview}>Fermer</Button>
              {selectedMedia.url && !selectedMedia.url.includes('embed') && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DownloadIcon />}
                  onClick={() => {
                    handleDownload(
                      selectedMedia.image || selectedMedia.url,
                      selectedMedia.title
                    );
                    handleClosePreview();
                  }}
                >
                  Télécharger
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default MediaLibrary;

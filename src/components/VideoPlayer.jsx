import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Download as DownloadIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
} from '@mui/icons-material';
import ReactPlayer from 'react-player';
import { toast } from 'react-toastify';

// Composant VideoPlayer optimisé avec lazy loading et error handling
const VideoPlayer = React.memo(({ url, courseTitle, onDownload }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleReady = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  const handleError = useCallback((error) => {
    console.error('Erreur vidéo:', error);
    setError('Impossible de charger la vidéo. Vérifiez votre connexion.');
    setIsLoading(false);
    toast.error('Erreur lors du chargement de la vidéo');
  }, []);

  const handleBuffer = useCallback(() => {
    setIsLoading(true);
  }, []);

  const handleBufferEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleDownload = useCallback(() => {
    if (onDownload) {
      onDownload(url, courseTitle);
      toast.info('Téléchargement de la vidéo en cours...');
    }
  }, [url, courseTitle, onDownload]);

  const playerConfig = useMemo(() => ({
    youtube: {
      playerVars: {
        controls: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
      },
    },
  }), []);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ 
        position: 'relative', 
        paddingBottom: '56.25%', 
        height: 0, 
        overflow: 'hidden',
        backgroundColor: '#000',
        borderRadius: 1,
      }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {isLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          )}

          <ReactPlayer
            url={url}
            width="100%"
            height="100%"
            controls
            playing={isPlaying}
            onReady={handleReady}
            onError={handleError}
            onBuffer={handleBuffer}
            onBufferEnd={handleBufferEnd}
            config={playerConfig}
            progressInterval={1000}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            fallback={<CircularProgress />}
          />
        </Box>
      </Box>

      {/* Contrôles additionnels */}
      <Box sx={{ display: 'flex', gap: 1, mt: 1, justifyContent: 'flex-end' }}>
        <Tooltip title={isPlaying ? 'Pause' : 'Lecture'}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Télécharger la vidéo">
          <IconButton
            size="small"
            color="primary"
            onClick={handleDownload}
          >
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;

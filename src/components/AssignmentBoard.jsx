import React, { useState, useCallback, useMemo } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Chip,
  Paper,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  CheckCircle,
  Warning,
  Error,
  CheckCircleOutline as CheckCircleOutlineIcon,
  PlayArrow as PlayArrowIcon,
  School as SchoolIcon,
  Speed as SpeedIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { AdvancedPerformanceTracker } from '../utils/advancedPerformanceTracker';

// Données des assignments
const assignments = [
  {
    id: 1,
    title: 'Projet React - Todo List Avancée',
    course: 'React Avancé',
    dueDate: '2024-01-25',
    status: 'à rendre',
    priority: 'high',
    type: 'assignment',
  },
  {
    id: 2,
    title: 'Analyse de données avec Pandas',
    course: 'Python Data Science',
    dueDate: '2024-01-28',
    status: 'en cours',
    priority: 'medium',
    type: 'assignment',
  },
  {
    id: 3,
    title: 'Exercices d\'algèbre linéaire',
    course: 'Mathématiques Avancées',
    dueDate: '2024-01-30',
    status: 'à commencer',
    priority: 'low',
    type: 'assignment',
  },
  {
    id: 4,
    title: 'Rapport physique quantique',
    course: 'Physique Quantique',
    dueDate: '2024-02-05',
    status: 'rendu',
    priority: 'none',
    type: 'assignment',
  },
  {
    id: 5,
    title: 'Projet JavaScript ES6+',
    course: 'JavaScript Moderne',
    dueDate: '2024-02-10',
    status: 'en cours',
    priority: 'medium',
    type: 'assignment',
  },
];

// Données des vidéos
const videoLibrary = [
  {
    id: 101,
    title: 'Data Engineering Essentials Hands-on SQL Python and Spark',
    instructor: 'Udemy',
    source: 'Udemy',
    duration: '22h 45m',
    modules: 8,
    category: 'Data Engineering',
    description: 'Apprenez les essentiels de l\'ingénierie de données avec SQL, Python et Apache Spark.',
    thumbnail: '🎓',
    watched: 0,
    total: 8,
  },
  {
    id: 102,
    title: 'Ethical Hacking for Absolute Beginners!',
    instructor: 'Udemy',
    source: 'Udemy',
    duration: '18h 30m',
    modules: 12,
    category: 'Cybersecurity',
    description: 'Cours complet de hacking éthique pour débutants avec certificat professionnel.',
    thumbnail: '🔒',
    watched: 3,
    total: 12,
  },
  {
    id: 103,
    title: 'Advanced React Patterns & Hooks',
    instructor: 'YouTube',
    source: 'YouTube',
    duration: '15h 20m',
    modules: 6,
    category: 'Frontend',
    description: 'Maîtrisez les patterns React avancés et les custom hooks.',
    thumbnail: '⚛️',
    watched: 2,
    total: 6,
  },
  {
    id: 104,
    title: 'Complete Web Development Bootcamp 2024',
    instructor: 'YouTube',
    source: 'YouTube',
    duration: '28h 15m',
    modules: 15,
    category: 'Full Stack',
    description: 'Bootcamp complet pour devenir développeur full stack moderne.',
    thumbnail: '🌐',
    watched: 5,
    total: 15,
  },
  {
    id: 105,
    title: 'Machine Learning with TensorFlow',
    instructor: 'Udemy',
    source: 'Udemy',
    duration: '25h 00m',
    modules: 10,
    category: 'AI/ML',
    description: 'Développez des modèles de machine learning avec TensorFlow.',
    thumbnail: '🤖',
    watched: 0,
    total: 10,
  },
  {
    id: 106,
    title: 'Cloud Architecture with AWS',
    instructor: 'YouTube',
    source: 'YouTube',
    duration: '20h 45m',
    modules: 9,
    category: 'Cloud',
    description: 'Devenez expert en architecture cloud avec AWS.',
    thumbnail: '☁️',
    watched: 1,
    total: 9,
  },
];

const getStatusIcon = (status) => {
  switch(status) {
    case 'rendu':
      return <CheckCircle color="success" />;
    case 'en cours':
      return <Warning color="warning" />;
    case 'à commencer':
      return <Error color="error" />;
    default:
      return <AssignmentIcon />;
  }
};

const getPriorityChip = (priority) => {
  switch(priority) {
    case 'high':
      return <Chip label="Haute" size="small" color="error" />;
    case 'medium':
      return <Chip label="Moyenne" size="small" color="warning" />;
    case 'low':
      return <Chip label="Basse" size="small" color="info" />;
    default:
      return null;
  }
};

const AssignmentBoard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showMetrics, setShowMetrics] = useState(false);
  const [metricsDialog, setMetricsDialog] = useState(false);
  const performanceTracker = useMemo(() => new AdvancedPerformanceTracker(100), []);
  const [executionTime, setExecutionTime] = useState({ ms: 0, ns: 0, us: 0, ps: 0 });
  
  // Initialiser videoProgress correctement sans setState
  const [videoProgress, setVideoProgress] = useState(() => 
    videoLibrary.reduce((acc, video) => ({
      ...acc,
      [video.id]: video.modules ? 0 : 0, // Commencer à 0
    }), {})
  );

  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  const handleVideoClick = useCallback((video) => {
    setSelectedVideo(video);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  const markModuleWatched = useCallback((videoId) => {
    performanceTracker.measureSync('mark_module_watched', () => {
      const v = videoLibrary.find(x => x.id === videoId);
      if (v && videoProgress[videoId] < v.total) {
        setVideoProgress(prev => ({ ...prev, [videoId]: Math.min(prev[videoId] + 1, v.total) }));
      }
      setExecutionTime(performanceTracker.getLast());
    });
  }, [videoProgress, performanceTracker]);

  const markVideoCompleted = useCallback((videoId) => {
    performanceTracker.measureSync('mark_video_completed', () => {
      const v = videoLibrary.find(x => x.id === videoId);
      if (v) setVideoProgress(prev => ({ ...prev, [videoId]: v.total }));
      setExecutionTime(performanceTracker.getLast());
    });
  }, [performanceTracker]);

  const resetVideoProgress = useCallback((videoId) => {
    performanceTracker.measureSync('reset_video_progress', () => {
      setVideoProgress(prev => ({ ...prev, [videoId]: 0 }));
      setExecutionTime(performanceTracker.getLast());
    });
  }, [performanceTracker]);

  // Cache les vidéos pour accès O(1) au lieu de O(n)
  const videoMap = useMemo(() => {
    const map = new Map();
    videoLibrary.forEach(v => map.set(v.id, v));
    return map;
  }, []);

  const getProgressPercentage = useCallback((videoId) => {
    const video = videoMap.get(videoId);
    if (!video) return 0;
    return Math.round((videoProgress[videoId] / video.total) * 100);
  }, [videoMap, videoProgress]);

  const getProgressLabel = useCallback((videoId) => {
    const video = videoMap.get(videoId);
    if (!video) return '';
    return `${videoProgress[videoId]}/${video.total}`;
  }, [videoMap, videoProgress]);

  const DATE_FORMAT_OPTIONS = useMemo(() => ({
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }), []);

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', DATE_FORMAT_OPTIONS);
  }, [DATE_FORMAT_OPTIONS]);

  const filteredVideos = useMemo(() => {
    if (tabValue === 0) return videoLibrary;
    if (tabValue === 1) return videoLibrary.filter(v => videoProgress[v.id] === 0);
    if (tabValue === 2) return videoLibrary.filter(v => videoProgress[v.id] > 0 && videoProgress[v.id] < v.total);
    if (tabValue === 3) return videoLibrary.filter(v => videoProgress[v.id] === v.total);
    return videoLibrary;
  }, [tabValue, videoProgress]);

  const renderAssignments = () => (
    <List>
      {assignments.map((assignment) => (
        <Paper key={assignment.id} sx={{ mb: 2, p: 0 }}>
          <ListItem>
            <ListItemIcon>
              {getStatusIcon(assignment.status)}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                  {assignment.title}
                </Typography>
              }
              secondary={
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Cours: {assignment.course}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ScheduleIcon fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="body2">
                        Échéance: {formatDate(assignment.dueDate)}
                      </Typography>
                    </Box>
                    {getPriorityChip(assignment.priority)}
                  </Box>
                </Box>
              }
            />
            <Chip 
              label={assignment.status}
              color={assignment.status === 'rendu' ? 'success' : 'primary'}
              size="small"
            />
          </ListItem>
        </Paper>
      ))}
    </List>
  );

  const renderVideos = () => (
    <Box>
      {filteredVideos.length === 0 && (
        <Alert severity="info">
          Aucune vidéo trouvée dans cette catégorie.
        </Alert>
      )}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '2fr' }, gap: 3 }}>
        {filteredVideos.map((video) => {
          const percentage = getProgressPercentage(video.id);
          const isCompleted = videoProgress[video.id] === video.total;
          
          return (
            <Card 
              key={video.id}
              sx={{
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
                cursor: 'pointer',
              }}
              onClick={() => handleVideoClick(video)}
            >
              <CardMedia
                sx={{
                  height: 180,
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 60,
                  position: 'relative',
                }}
              >
                {video.thumbnail}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    px: 1,
                    borderRadius: 1,
                    fontSize: '0.875rem',
                  }}
                >
                  {video.duration}
                </Box>
              </CardMedia>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {video.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip 
                    size="small" 
                    label={video.category}
                    color="primary"
                    variant="outlined"
                  />
                  <Chip 
                    size="small" 
                    label={video.source}
                    icon={<SchoolIcon />}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {video.description}
                </Typography>
                
                {/* Progress Bar */}
                <Box sx={{ mb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                      Progression
                    </Typography>
                    <Typography variant="caption">
                      {getProgressLabel(video.id)} modules
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={percentage}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        backgroundColor: isCompleted ? '#4caf50' : 'primary.main',
                      },
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {percentage}% terminé
                  </Typography>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'space-between' }}>
                  <Tooltip title={isCompleted ? 'Réinitialiser' : 'Marquer le suivant comme vu'}>
                    <Button
                      size="small"
                      variant={isCompleted ? 'outlined' : 'contained'}
                      color={isCompleted ? 'success' : 'primary'}
                      startIcon={isCompleted ? <CheckCircleOutlineIcon /> : <PlayArrowIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        isCompleted ? resetVideoProgress(video.id) : markModuleWatched(video.id);
                      }}
                    >
                      {isCompleted ? 'Réinit' : 'Vu'}
                    </Button>
                  </Tooltip>
                  <Tooltip title="Marquer comme complété">
                    <IconButton
                      size="small"
                      color={percentage === 100 ? 'success' : 'default'}
                      onClick={(e) => {
                        e.stopPropagation();
                        markVideoCompleted(video.id);
                      }}
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* Video Details Dialog */}
      {selectedVideo && (
        <Dialog open={!!selectedVideo} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
            {selectedVideo.thumbnail} {selectedVideo.title}
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                📊 Progression
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={getProgressPercentage(selectedVideo.id)}
                sx={{ mb: 1, height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2">
                {getProgressLabel(selectedVideo.id)} modules vus sur {selectedVideo.total}
              </Typography>
            </Box>

            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
              📝 Détails
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2"><strong>Instructeur:</strong> {selectedVideo.instructor}</Typography>
              <Typography variant="body2"><strong>Source:</strong> {selectedVideo.source}</Typography>
              <Typography variant="body2"><strong>Durée:</strong> {selectedVideo.duration}</Typography>
              <Typography variant="body2"><strong>Catégorie:</strong> {selectedVideo.category}</Typography>
              <Typography variant="body2"><strong>Modules:</strong> {selectedVideo.total}</Typography>
            </Box>

            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
              📖 Description
            </Typography>
            <Typography variant="body2">{selectedVideo.description}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} variant="outlined">
              Fermer
            </Button>
            <Button 
              onClick={() => {
                markVideoCompleted(selectedVideo.id);
                handleCloseDialog();
              }}
              variant="contained"
              color="success"
            >
              Marquer Complété
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );

  return (
    <Box>
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3, borderBottom: 2, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex' }}>
          <Tab label="📋 Assignments" />
          <Tab label="🎥 Toutes les Vidéos" />
          <Tab label="🆕 À Commencer" />
          <Tab label="🔄 En Cours" />
          <Tab label="✅ Complétées" />
        </Box>
        <Tooltip title={`Métrique: ${executionTime.ms}ms (${executionTime.ns}ns)`}>
          <IconButton 
            onClick={() => setShowMetrics(!showMetrics)}
            size="small"
            sx={{ mr: 2 }}
          >
            <SpeedIcon />
          </IconButton>
        </Tooltip>
      </Tabs>

      {showMetrics && (
        <Paper sx={{ p: 2, mb: 3, bgcolor: '#f5f5f5', display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label={`⏱️ ${executionTime.ms}ms`} color="primary" />
          <Chip label={`🔬 ${executionTime.ns}ns`} color="primary" />
          <Chip label={`µ ${executionTime.us}µs`} color="primary" />
          <Chip label={`p ${executionTime.ps}ps`} color="primary" />
          {performanceTracker.getAllStats().length > 0 && (
            <Tooltip title="Voir rapport détaillé">
              <IconButton
                size="small"
                onClick={() => setMetricsDialog(true)}
              >
                <InfoIcon />
              </IconButton>
            </Tooltip>
          )}
        </Paper>
      )}

      {tabValue === 0 && renderAssignments()}
      {tabValue > 0 && renderVideos()}

      {/* Dialogue de métriques détaillées */}
      <Dialog open={metricsDialog} onClose={() => setMetricsDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>
          📊 Métriques de Performance
        </DialogTitle>
        <DialogContent dividers sx={{ maxHeight: '400px', overflowY: 'auto' }}>
          {performanceTracker.getAllStats().map((stat, idx) => (
            <Box key={idx} sx={{ mb: 2, pb: 2, borderBottom: idx < performanceTracker.getAllStats().length - 1 ? 1 : 0, borderColor: 'divider' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                ⏱️ {stat.label}
              </Typography>
              <Box sx={{ ml: 2, mt: 1, fontFamily: 'monospace', fontSize: '0.85rem' }}>
                <Typography variant="body2">Appels: <strong>{stat.count}</strong></Typography>
                <Typography variant="body2">Moyenne: <strong>{stat.average}ms</strong> ({stat.averageNs}ns)</Typography>
                <Typography variant="body2">Min: <strong>{stat.min}ms</strong> ({stat.minNs}ns)</Typography>
                <Typography variant="body2">Max: <strong>{stat.max}ms</strong> ({stat.maxNs}ns)</Typography>
                <Typography variant="body2">Total: <strong>{stat.total}ms</strong></Typography>
              </Box>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMetricsDialog(false)} variant="contained">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AssignmentBoard;
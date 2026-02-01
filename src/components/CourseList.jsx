import React, { useState, useCallback, useMemo, memo } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Grid,
  Chip,
  LinearProgress,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  PlayCircleOutline,
  ExpandMore,
  ExpandLess,
  Book,
  AccessTime,
} from '@mui/icons-material';
import VideoPlayer from './VideoPlayer';
import VideoDownloadManager from './VideoDownloadManager';

const courses = [
  {
    id: 1,
    title: 'React Avancé - Les Hooks',
    description: 'Maîtrisez les Hooks React (useState, useEffect, useContext) pour créer des applications modernes',
    image: '/images/react-book.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=dpw9EHDh2bM',
    duration: '2h30',
    progress: 75,
    tags: ['React', 'JavaScript', 'Frontend'],
  },
  {
    id: 2,
    title: 'Python pour la Data Science',
    description: 'Apprenez à manipuler des données avec Pandas, NumPy et Scikit-learn',
    image: '/images/python-book.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI',
    duration: '3h15',
    progress: 40,
    tags: ['Python', 'Data Science', 'ML'],
  },
  {
    id: 3,
    title: 'Mathématiques Avancées',
    description: 'Algèbre linéaire et calcul différentiel pour le machine learning',
    image: '/images/maths-book.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=ZK3O402wf1c',
    duration: '4h',
    progress: 20,
    tags: ['Maths', 'Algèbre', 'Calcul'],
  },
  {
    id: 4,
    title: 'Physique Quantique',
    description: 'Introduction aux concepts fondamentaux de la physique quantique',
    image: '/images/physics-book.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=W2Xb2GFK2yc',
    duration: '3h45',
    progress: 90,
    tags: ['Physique', 'Science', 'Quantique'],
  },
  {
    id: 5,
    title: 'JavaScript Moderne ES6+',
    description: 'Les nouvelles fonctionnalités de JavaScript : ES6, ES7 et au-delà',
    image: '/images/javascript-book.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=NCwa_xi0Uuc',
    duration: '2h',
    progress: 60,
    tags: ['JavaScript', 'ES6', 'Web'],
  },
];

const CourseList = () => {
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleExpand = useCallback((courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  }, [expandedCourse]);

  const handlePlayVideo = useCallback((url) => {
    setPlayingVideo(playingVideo === url ? null : url);
  }, [playingVideo]);

  const handleOpenDownloadDialog = useCallback((course) => {
    setSelectedCourse(course);
    setDownloadOpen(true);
  }, []);

  const handleCloseDownloadDialog = useCallback(() => {
    setDownloadOpen(false);
    setSelectedCourse(null);
  }, []);

  const memoizedCourses = useMemo(() => courses, []);

  return (
    <>
      <Grid container spacing={3}>
        {memoizedCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isExpanded={expandedCourse === course.id}
            onExpand={() => handleExpand(course.id)}
            isPlayingVideo={playingVideo === course.youtubeUrl}
            onPlayVideo={() => handlePlayVideo(course.youtubeUrl)}
            onDownload={() => handleOpenDownloadDialog(course)}
          />
        ))}
      </Grid>

      <VideoDownloadManager
        open={downloadOpen}
        onClose={handleCloseDownloadDialog}
        videoUrl={selectedCourse?.youtubeUrl}
        courseTitle={selectedCourse?.title}
      />
    </>
  );
};

// Composant CourseCard mémorisé pour éviter les re-rendus inutiles
const CourseCard = memo(({
  course,
  isExpanded,
  onExpand,
  isPlayingVideo,
  onPlayVideo,
  onDownload,
}) => {
  return (
    <Grid item xs={12} key={course.id}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <CardMedia
                component="img"
                height="140"
                image={course.image}
                alt={course.title}
                sx={{ borderRadius: 1, loading: 'lazy' }}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {course.description}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    {course.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTime fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="body2">{course.duration}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Book fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="body2">
                        Progression: {course.progress}%
                      </Typography>
                    </Box>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={course.progress}
                    sx={{ mt: 1, mb: 2 }}
                  />
                </Box>

                <Box>
                  <IconButton onClick={onExpand}>
                    {isExpanded ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>
              </Box>

              <Collapse in={isExpanded}>
                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    startIcon={<PlayCircleOutline />}
                    onClick={onPlayVideo}
                    size="small"
                  >
                    {isPlayingVideo ? 'Masquer la vidéo' : 'Voir la vidéo du cours'}
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={onDownload}
                    size="small"
                  >
                    📥 Télécharger
                  </Button>
                </Box>

                {isPlayingVideo && (
                  <Box sx={{ mt: 2 }}>
                    <VideoPlayer
                      url={course.youtubeUrl}
                      courseTitle={course.title}
                      onDownload={onDownload}
                    />
                  </Box>
                )}
              </Collapse>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.course.id === nextProps.course.id &&
    prevProps.isExpanded === nextProps.isExpanded &&
    prevProps.isPlayingVideo === nextProps.isPlayingVideo
  );
});

CourseCard.displayName = 'CourseCard';

export default CourseList;
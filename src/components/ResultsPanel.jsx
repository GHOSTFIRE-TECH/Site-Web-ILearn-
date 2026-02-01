import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Remove,
} from '@mui/icons-material';

const results = [
  { course: 'React Avancé', grade: 18.5, maxGrade: 20, rank: 1, trend: 'up' },
  { course: 'Python Data Science', grade: 16, maxGrade: 20, rank: 3, trend: 'stable' },
  { course: 'Mathématiques Avancées', grade: 14.5, maxGrade: 20, rank: 5, trend: 'down' },
  { course: 'Physique Quantique', grade: 19, maxGrade: 20, rank: 2, trend: 'up' },
  { course: 'JavaScript Moderne', grade: 17.5, maxGrade: 20, rank: 4, trend: 'up' },
];

const getTrendIcon = (trend) => {
  switch(trend) {
    case 'up':
      return <TrendingUp color="success" />;
    case 'down':
      return <TrendingDown color="error" />;
    default:
      return <Remove color="disabled" />;
  }
};

const getGradeColor = (grade, maxGrade) => {
  const percentage = (grade / maxGrade) * 100;
  if (percentage >= 80) return 'success.main';
  if (percentage >= 60) return 'warning.main';
  return 'error.main';
};

const ResultsPanel = () => {
  const calculateAverage = () => {
    const total = results.reduce((sum, result) => sum + result.grade, 0);
    return (total / results.length).toFixed(2);
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          Moyenne générale: <strong>{calculateAverage()}/20</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Classement global: 2ème sur 45 étudiants
        </Typography>
      </Box>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Cours</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Note</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Progression</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Classement</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Tendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result, index) => (
              <TableRow key={index} hover>
                <TableCell>
                  <Typography variant="subtitle2">
                    {result.course}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: getGradeColor(result.grade, result.maxGrade),
                      fontWeight: 'bold'
                    }}
                  >
                    {result.grade}/{result.maxGrade}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: '100%' }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(result.grade / result.maxGrade) * 100}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                    <Typography variant="body2">
                      {Math.round((result.grade / result.maxGrade) * 100)}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    label={`${result.rank}ème`}
                    color={result.rank <= 3 ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  {getTrendIcon(result.trend)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary">
          <TrendingUp fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
          Performance en amélioration
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Prochaine évaluation: 30 Janvier 2024
        </Typography>
      </Box>
    </Box>
  );
};

export default ResultsPanel;
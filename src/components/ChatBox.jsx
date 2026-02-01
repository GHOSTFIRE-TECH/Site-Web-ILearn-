import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Paper,
  IconButton,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Send as SendIcon,
  Person as PersonIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import { db } from '../firebase/config';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  limit,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { AdvancedPerformanceTracker } from '../utils/advancedPerformanceTracker';

const ChatBox = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [executionTime, setExecutionTime] = useState({ ms: 0, ns: 0, us: 0, ps: 0 });
  const [showMetrics, setShowMetrics] = useState(false);
  const [metricsDialog, setMetricsDialog] = useState(false);
  const performanceTracker = useMemo(() => new AdvancedPerformanceTracker(50), []);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'asc'), // Inverser pour éviter .reverse()
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []); // Plus de dépendances inutiles !

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = useCallback(async (e) => {
    e.preventDefault();
    
    // Vérifier si l'utilisateur est connecté
    if (!user) {
      toast.warning('📝 Connectez-vous pour envoyer des messages');
      return;
    }
    
    if (!newMessage.trim()) return;
    await performanceTracker.measureAsync('send_message', async () => {
      const userName = user.displayName || user.email?.split('@')[0] || 'Utilisateur';
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        userId: user.uid,
        userEmail: user.email,
        userName: userName,
        timestamp: serverTimestamp(),
        sentAt: new Date().toISOString(),
      });
      const t = performanceTracker.getLast();
      setExecutionTime(t);
      setNewMessage('');
      toast.success(`📤 ${t.ms}ms`);
    }).catch(() => toast.error('Erreur envoi'));
  }, [user, newMessage, performanceTracker]);

  const formatTime = useCallback((timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  }, []);
  
  const userCount = useMemo(() => {
    return new Set(messages.map(msg => msg.userEmail)).size;
  }, [messages]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '400px' }}>
      {/* En-tête du chat */}
      <Paper sx={{ p: 2, mb: 2, bgcolor: 'primary.main', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              💬 Chat Collaboratif
            </Typography>
            <Typography variant="body2">
              {userCount} {userCount > 1 ? 'utilisateurs' : 'utilisateur'} actifs - {messages.length} messages
            </Typography>
          </Box>
          <Tooltip title="Afficher les métriques de performance">
            <IconButton 
              onClick={() => setShowMetrics(!showMetrics)}
              sx={{ color: 'white' }}
              size="small"
            >
              <SpeedIcon />
            </IconButton>
          </Tooltip>
        </Box>
        
        {showMetrics && (
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(255,255,255,0.3)', display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              size="small"
              label={`${executionTime.ms}ms`}
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
            />
            <Chip 
              size="small"
              label={`${executionTime.ns}ns`}
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
            />
            <Chip 
              size="small"
              label={`${executionTime.us}µs`}
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
            />
            <Chip 
              size="small"
              label={`${executionTime.ps}ps`}
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
            />
          </Box>
        )}
      </Paper>

      {/* Zone des messages */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, p: 1 }}>
        <List>
          {messages.map((message) => (
            <ListItem 
              key={message.id}
              sx={{
                flexDirection: message.userEmail === user?.email ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: message.userEmail === user?.email 
                      ? 'secondary.main' 
                      : 'primary.main',
                  }}
                >
                  {message.userName?.charAt(0).toUpperCase() || message.userEmail?.charAt(0).toUpperCase() || <PersonIcon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box
                    sx={{
                      bgcolor: message.userEmail === user?.email
                        ? 'secondary.light'
                        : 'grey.100',
                      p: 1.5,
                      borderRadius: 2,
                      maxWidth: '70%',
                    }}
                  >
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {message.userName || message.userEmail?.split('@')[0] || 'Utilisateur'}
                    </Typography>
                    <Typography variant="body1">
                      {message.text}
                    </Typography>
                    <Typography variant="caption" display="block" textAlign="right" sx={{ mt: 0.5 }}>
                      {formatTime(message.timestamp)}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      {/* Formulaire d'envoi */}
      <Paper 
        component="form" 
        onSubmit={handleSendMessage}
        sx={{ p: 1, display: 'flex', gap: 1 }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder={
            user 
              ? "Tapez votre message ici..." 
              : "Connectez-vous pour participer au chat"
          }
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={!user}
        />
        <IconButton 
          type="submit" 
          color="primary" 
          disabled={!newMessage.trim() || !user}
        >
          <SendIcon />
        </IconButton>
      </Paper>

      {/* Dialogue de métriques détaillées */}
      {metricsDialog && (
        <Dialog open={metricsDialog} onClose={() => setMetricsDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 'bold', bgcolor: 'primary.main', color: 'white' }}>
            📊 Métriques
          </DialogTitle>
          <DialogContent dividers sx={{ maxHeight: '300px', overflowY: 'auto' }}>
            {performanceTracker.getAllStats().map((stat, idx) => (
              <Box key={idx} sx={{ mb: 1, pb: 1, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {stat.label}
                </Typography>
                <Typography variant="caption">
                  {stat.count}x | {stat.avg}ms ({stat.avgNs}ns)
                </Typography>
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Box
              component="button"
              onClick={() => setMetricsDialog(false)}
              sx={{
                px: 2,
                py: 1,
                bgcolor: 'primary.main',
                color: 'white',
                border: 'none',
                borderRadius: 1,
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Fermer
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ChatBox;
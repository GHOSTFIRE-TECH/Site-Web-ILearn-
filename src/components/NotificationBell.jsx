import React, { useState } from 'react';
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  ListItemIcon,
  Button,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Assignment as AssignmentIcon,
  School as SchoolIcon,
  Announcement as AnnouncementIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const notifications = [
  {
    id: 1,
    title: 'Nouveau devoir disponible',
    message: 'Le projet React est maintenant disponible',
    time: 'Il y a 2 heures',
    type: 'assignment',
    read: false,
  },
  {
    id: 2,
    title: 'Cours mis à jour',
    message: 'Le cours de Python a été enrichi avec de nouveaux exercices',
    time: 'Il y a 1 jour',
    type: 'course',
    read: false,
  },
  {
    id: 3,
    title: 'Annonce importante',
    message: 'Maintenance prévue ce week-end',
    time: 'Il y a 2 jours',
    type: 'announcement',
    read: true,
  },
  {
    id: 4,
    title: 'Devoir rendu',
    message: 'Votre projet JavaScript a été corrigé',
    time: 'Il y a 3 jours',
    type: 'grade',
    read: true,
  },
];

const getNotificationIcon = (type) => {
  switch(type) {
    case 'assignment':
      return <AssignmentIcon color="primary" />;
    case 'course':
      return <SchoolIcon color="secondary" />;
    case 'announcement':
      return <AnnouncementIcon color="warning" />;
    case 'grade':
      return <CheckCircleIcon color="success" />;
    default:
      return <NotificationsIcon />;
  }
};

const NotificationBell = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter(n => !n.read).length
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notification) => {
    toast.info(`Notification: ${notification.message}`);
    handleClose();
  };

  const markAllAsRead = () => {
    toast.success('Toutes les notifications ont été marquées comme lues');
    setUnreadCount(0);
    handleClose();
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 360, maxHeight: 400 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Vous avez {unreadCount} nouvelles notifications
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
          {notifications.map((notification) => (
            <MenuItem 
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              sx={{ 
                py: 1.5,
                bgcolor: notification.read ? 'transparent' : 'action.hover'
              }}
            >
              <ListItemIcon>
                {getNotificationIcon(notification.type)}
              </ListItemIcon>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2">
                  {notification.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {notification.message}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.time}
                </Typography>
              </Box>
              {!notification.read && (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                  }}
                />
              )}
            </MenuItem>
          ))}
        </Box>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button 
            fullWidth 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Tout marquer comme lu
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default NotificationBell;
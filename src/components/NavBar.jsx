import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  School as SchoolIcon,
  Dashboard as DashboardIcon,
  AccountCircle,
  ExitToApp,
  Home as HomeIcon,
} from '@mui/icons-material';

const NavBar = ({ currentPage, onNavigate, isLoggedIn, onLogout, user, userRole, onRoleChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    onLogout();
  };

  const handleChangeRoleClick = () => {
    handleClose();
    if (onRoleChange) onRoleChange();
  };

  const handleHomeClick = () => {
    onNavigate('home');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <Tooltip title="Retour à l'accueil">
          <IconButton 
            onClick={handleHomeClick}
            sx={{ mr: 1, color: 'white' }}
          >
            <HomeIcon />
          </IconButton>
        </Tooltip>
        <SchoolIcon sx={{ mr: 2, fontSize: 32, color: 'secondary.main' }} />
        <Typography 
          variant="h6" 
          sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer' }}
          onClick={handleHomeClick}
        >
          Ghost Tech Learning Platform
        </Typography>

        {/* Bouton Dashboard accessible pour tous */}
        <Button
          color="inherit"
          startIcon={<DashboardIcon />}
          onClick={() => onNavigate('dashboard')}
          sx={{ mr: 2 }}
        >
          Tableau de bord
        </Button>

        {isLoggedIn ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Compte utilisateur">
                <IconButton
                  onClick={handleMenu}
                  color="inherit"
                  size="large"
                >
                  <Avatar
                    sx={{ width: 40, height: 40, bgcolor: 'secondary.main' }}
                    alt={user?.email}
                  >
                    {user?.email?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2">Connecté en tant que: {user?.email}</Typography>
                    {userRole && (
                      <Typography variant="caption" color="text.secondary">Rôle: {userRole}</Typography>
                    )}
                  </Box>
                </MenuItem>
                <MenuItem onClick={handleChangeRoleClick}>
                  <DashboardIcon sx={{ mr: 1 }} />
                  Changer de rôle
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                  <ExitToApp sx={{ mr: 1 }} />
                  Déconnexion
                </MenuItem>
              </Menu>
            </Box>
          </>
        ) : (
          <Box>
            <Button
              color="inherit"
              startIcon={<AccountCircle />}
              onClick={() => onNavigate('login')}
              sx={{ mr: 2 }}
            >
              Connexion
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => onNavigate('register')}
            >
              Inscription
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
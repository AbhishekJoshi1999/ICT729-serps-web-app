// src/components/admin/AdminHeader.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const AdminHeader = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">Admin Dashboard</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>{user?.email}</Typography>
          <Avatar>{user?.email?.[0]?.toUpperCase()}</Avatar>
          <IconButton color="inherit" onClick={logout}>
            <Typography variant="button">Logout</Typography>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;

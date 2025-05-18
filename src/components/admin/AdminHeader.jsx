// src/components/admin/AdminHeader.jsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Tooltip
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const getPageTitle = (pathname) => {
  if (pathname.includes('/admin/dashboard')) return 'Dashboard';
  if (pathname.includes('/admin/users')) return 'User Management';
  if (pathname.includes('/admin/courses')) return 'Courses';
  if (pathname.includes('/admin/units')) return 'Units';
  if (pathname.includes('/admin/classes')) return 'Classes';
  if (pathname.includes('/admin/settings')) return 'Settings';
  if (pathname.includes('/admin/configuration')) return 'Configuration';
  return 'Admin Dashboard';
};

const getInitials = (input = '') => {
  if (!input) return '';
  if (input.includes('@')) {
    const username = input.split('@')[0];
    const parts = username.split(/[._-]/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return username.slice(0, 2).toUpperCase();
  }
  const parts = input.trim().split(' ');
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
};

const AdminHeader = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const title = getPageTitle(location.pathname);
  const initials = getInitials(user?.fullName || user?.email || '');
  const displayName = user?.fullName || user?.email;

  return (
    <AppBar position="static" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">{title}</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>Hi, {initials}</Typography>
          <Tooltip title={displayName}>
            <Avatar>{initials}</Avatar>
          </Tooltip>
          <IconButton color="inherit" onClick={logout}>
            <Typography variant="button">Logout</Typography>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;

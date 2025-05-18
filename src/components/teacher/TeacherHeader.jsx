import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Tooltip,
  InputBase,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const getPageTitle = (pathname) => {
  if (pathname.includes('/teacher/dashboard')) return 'Dashboard';
  if (pathname.includes('/teacher/assignments/create')) return 'Create Assignment';
  if (pathname.includes('/teacher/assignments/track')) return 'Assignment Tracker';
  if (pathname.includes('/teacher/assignments/grade')) return 'Grade Assignment';
  if (pathname.includes('/teacher/upload/resources')) return 'Resources';
  if (pathname.includes('/teacher/upload/attendance')) return 'Attendance';
  if (pathname.includes('/teacher/report')) return 'Report';
  if (pathname.includes('/teacher/settings')) return 'Settings';
  if (pathname.includes('/teacher/notifications')) return 'Notifications';
  return 'Teacher Dashboard';
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
  const first = parts[0]?.[0] || '';
  const last = parts[1]?.[0] || '';
  return (first + last).toUpperCase();
};

const TeacherHeader = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const pageTitle = getPageTitle(location.pathname);
  const initials = getInitials(user?.fullName || user?.email || '');
  const displayName = user?.fullName || user?.email;

  return (
    <AppBar position="static" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Left: Title */}
        <Typography variant="h6" sx={{ flex: 1, minWidth: 150 }}>
          {pageTitle}
        </Typography>

        {/* Middle: Search bar */}
        <Paper
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 300,
            px: 1,
            borderRadius: 2,
            mr: 2,
            bgcolor: 'white',
            height: 35
          }}
          elevation={0}
        >
          <SearchIcon sx={{ color: 'gray' }} />
          <InputBase
            placeholder="Search by Name or ID"
            sx={{ ml: 1, flex: 1 }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Paper>

        {/* Right: Greeting + Avatar + Logout */}
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

export default TeacherHeader;

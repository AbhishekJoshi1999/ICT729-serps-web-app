import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Tooltip,
  InputBase,
  Paper,
  Badge
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const getPageTitle = (pathname) => {
  if (pathname.includes('/student/dashboard')) return 'Dashboard';
  if (pathname.includes('/student/attendance')) return 'Attendance';
  if (pathname.includes('/student/grades')) return 'Grades';
  if (pathname.includes('/student/resources')) return 'Resources';
  if (pathname.includes('/student/settings')) return 'Settings';
  if (pathname.includes('/student/notifications')) return 'Notifications';
  return 'Student Dashboard';
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
  return (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
};

const StudentHeader = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');

  const pageTitle = getPageTitle(location.pathname);
  const initials = getInitials(user?.fullName || user?.email || '');
  const displayName = user?.fullName || user?.email;

  return (
    <AppBar position="static" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Page Title */}
        <Typography variant="h6" sx={{ mr: 2 }}>
          {pageTitle}
        </Typography>

        {/* Search Bar */}
        <Paper
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 300,
            borderRadius: 2,
            px: 1,
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <IconButton type="submit" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Paper>

        {/* Right Section */}
        <Box display="flex" alignItems="center" gap={2}>
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

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

export default StudentHeader;

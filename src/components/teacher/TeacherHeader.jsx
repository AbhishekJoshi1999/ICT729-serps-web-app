// src/components/teacher/TeacherHeader.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, TextField, Avatar } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const TeacherHeader = ({ searchText, onSearchChange }) => {
  const { user, logout } = useAuth();

  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Typography variant="h6">Teacher Dashboard</Typography>

        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <TextField
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            variant="outlined"
            size="small"
            placeholder="Search by Name or ID"
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          />
          <Typography variant="body1">Hi, TC</Typography>
          <Avatar>{user?.email?.[0]?.toUpperCase()}</Avatar>
          <IconButton color="inherit" onClick={logout}>
            <Typography variant="button">Logout</Typography>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TeacherHeader;

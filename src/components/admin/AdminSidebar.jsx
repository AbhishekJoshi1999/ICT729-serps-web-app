// src/components/admin/AdminSidebar.jsx
import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, Toolbar, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const links = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'User Management', path: '/admin/users' },
    { label: 'Course Management', path: '/admin/courses' },
    { label: 'Configuration', path: '/admin/configuration' },
    { label: 'Settings', path: '/admin/settings' }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 220,
          boxSizing: 'border-box',
          borderRight: '1px solid #ddd'
        },
      }}
    >
      <Toolbar>
        <Box sx={{ textAlign: 'center', width: '100%' }}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            SERPS
          </Typography>
        </Box>
      </Toolbar>
      <List>
        {links.map((link) => (
          <ListItemButton key={link.path} onClick={() => navigate(link.path)}>
            <ListItemText primary={link.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;

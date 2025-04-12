// src/components/business/Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, Toolbar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const links = [
    { label: 'User Management', path: '/business/users' },
    { label: 'Settings', path: '/business/settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 200,
          boxSizing: 'border-box',
          px: 0,
          backgroundColor: '#f4f4f4', // Background color for sidebar
          borderRight: '2px solid #ccc', // Divider line
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

export default Sidebar;

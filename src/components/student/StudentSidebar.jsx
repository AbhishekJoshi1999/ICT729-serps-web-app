import React, { useState } from 'react';
import {
  Drawer, List, ListItemButton, ListItemText,
  Collapse, Toolbar, Box, Typography
} from '@mui/material';
import {
  Dashboard, EventNote, Grade, Folder,
  Settings, Notifications, ExpandLess, ExpandMore
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const StudentSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openGrades, setOpenGrades] = useState(
    location.pathname.startsWith('/student/grades')
  );
  const [openResources, setOpenResources] = useState(
    location.pathname.startsWith('/student/resources')
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
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
        {/* Dashboard */}
        <ListItemButton onClick={() => navigate('/student/dashboard')}>
          <Dashboard sx={{ mr: 2 }} />
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* Attendance */}
        <ListItemButton onClick={() => navigate('/student/attendance')}>
          <EventNote sx={{ mr: 2 }} />
          <ListItemText primary="Attendance" />
        </ListItemButton>

        {/* Grades - Expandable (optional if subcategories needed) */}
        <ListItemButton onClick={() => navigate('/student/grades')}>
          <Grade sx={{ mr: 2 }} />
          <ListItemText primary="Grades" />
         
        </ListItemButton>
       

        {/* Resources - Expandable (optional if subcategories needed) */}
        <ListItemButton onClick={() => navigate('/student/resources')}>
          <Folder sx={{ mr: 2 }} />
          <ListItemText primary="Resources" />
         
        </ListItemButton>
        
        {/* Settings */}
        <ListItemButton onClick={() => navigate('/student/settings')}>
          <Settings sx={{ mr: 2 }} />
          <ListItemText primary="Settings" />
        </ListItemButton>

        {/* Notifications */}
        <ListItemButton onClick={() => navigate('/student/notifications')}>
          <Notifications sx={{ mr: 2 }} />
          <ListItemText primary="Notifications" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default StudentSidebar;

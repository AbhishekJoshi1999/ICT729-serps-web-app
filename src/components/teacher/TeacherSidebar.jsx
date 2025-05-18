import React, { useState } from 'react';
import {
  Drawer, List, ListItemButton, ListItemText,
  Collapse, Toolbar, Box, Typography
} from '@mui/material';
import {
  Dashboard, Assignment, UploadFile, BarChart,
  Settings, Notifications, ExpandLess, ExpandMore
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const TeacherSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openAssignment, setOpenAssignment] = useState(
    location.pathname.startsWith('/teacher/assignments')
  );
  const [openUpload, setOpenUpload] = useState(
    location.pathname.startsWith('/teacher/upload')
  );

  const handleAssignmentToggle = () => {
    setOpenAssignment(!openAssignment);
  };

  const handleUploadToggle = () => {
    setOpenUpload(!openUpload);
  };

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
        <ListItemButton onClick={() => navigate('/teacher/dashboard')}>
          <Dashboard sx={{ mr: 2 }} />
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* Assignment Section */}
        <ListItemButton onClick={handleAssignmentToggle}>
          <Assignment sx={{ mr: 2 }} />
          <ListItemText primary="Assignment" />
          {openAssignment ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openAssignment} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/teacher/assignments/create')}>
              <ListItemText primary="Create Assignment" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/teacher/assignments/track')}>
              <ListItemText primary="Assignment Tracker" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/teacher/assignments/grade')}>
              <ListItemText primary="Grade Assignment" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Upload Section */}
        <ListItemButton onClick={handleUploadToggle}>
          <UploadFile sx={{ mr: 2 }} />
          <ListItemText primary="Upload" />
          {openUpload ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openUpload} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/teacher/upload/resources')}>
              <ListItemText primary="List Resources" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/teacher/upload/attendance')}>
              <ListItemText primary="Attendance" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Reports */}
        <ListItemButton onClick={() => navigate('/teacher/report')}>
          <BarChart sx={{ mr: 2 }} />
          <ListItemText primary="Report" />
        </ListItemButton>

        {/* Settings */}
        <ListItemButton onClick={() => navigate('/teacher/settings')}>
          <Settings sx={{ mr: 2 }} />
          <ListItemText primary="Settings" />
        </ListItemButton>

        {/* Notifications */}
        <ListItemButton onClick={() => navigate('/teacher/notifications')}>
          <Notifications sx={{ mr: 2 }} />
          <ListItemText primary="Notifications" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default TeacherSidebar;

import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Toolbar,
  Box,
  Typography,
  ListItemIcon
} from '@mui/material';
import {
  Dashboard,
  Group,
  School,
  Class as ClassIcon,
  Settings,
  ExpandLess,
  ExpandMore,
  FolderSpecial,
  ViewModule,
  Tune
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openCourse, setOpenCourse] = useState(
    location.pathname.startsWith('/admin/courses') ||
    location.pathname.startsWith('/admin/units') ||
    location.pathname.startsWith('/admin/classes')
  );

  const handleCourseToggle = () => {
    setOpenCourse((prev) => !prev);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
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
        <ListItemButton onClick={() => navigate('/admin/dashboard')}>
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* User Management */}
        <ListItemButton onClick={() => navigate('/admin/users')}>
          <ListItemIcon><Group /></ListItemIcon>
          <ListItemText primary="User Management" />
        </ListItemButton>

        {/* Course Management (collapsible) */}
        <ListItemButton onClick={handleCourseToggle}>
          <ListItemIcon><School /></ListItemIcon>
          <ListItemText primary="Course Management" />
          {openCourse ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openCourse} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/admin/courses')}>
              <ListItemIcon><FolderSpecial /></ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/admin/units')}>
              <ListItemIcon><ViewModule /></ListItemIcon>
              <ListItemText primary="Units" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/admin/classes')}>
              <ListItemIcon><ClassIcon /></ListItemIcon>
              <ListItemText primary="Classes" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Configuration */}
        <ListItemButton onClick={() => navigate('/admin/configuration')}>
          <ListItemIcon><Tune /></ListItemIcon>
          <ListItemText primary="Configuration" />
        </ListItemButton>

        {/* Settings */}
        <ListItemButton onClick={() => navigate('/admin/settings')}>
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default AdminSidebar;

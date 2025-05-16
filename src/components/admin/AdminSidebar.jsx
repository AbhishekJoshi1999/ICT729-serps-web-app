import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Toolbar,
  Box,
  Typography
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openCourse, setOpenCourse] = useState(
    location.pathname.startsWith('/admin/courses') ||
    location.pathname.startsWith('/admin/units') ||
    location.pathname.startsWith('/admin/classes')
  );

  const handleCourseToggle = () => {
    setOpenCourse(true); // Always open submenu
    navigate('/admin/courses'); // Default route
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 220,
          boxSizing: 'border-box',
          borderRight: '1px solid #ddd',
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
        <ListItemButton onClick={() => navigate('/admin/dashboard')}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate('/admin/users')}>
          <ListItemText primary="User Management" />
        </ListItemButton>

        {/* Course Management */}
        <ListItemButton onClick={handleCourseToggle}>
          <ListItemText primary="Course Management" />
          {openCourse ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openCourse} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/admin/courses')}>
              <ListItemText primary="Course" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/admin/units')}>
              <ListItemText primary="Unit" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/admin/classes')}>
              <ListItemText primary="Class" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={() => navigate('/admin/configuration')}>
          <ListItemText primary="Configuration" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate('/admin/settings')}>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default AdminSidebar;

import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const TeacherSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/teacher/dashboard' },
        { text: 'Assignment', icon: <AssignmentIcon />, path: '/teacher/assignments' },
        { text: 'Upload', icon: <UploadFileIcon />, path: '/teacher/upload' },
        { text: 'Reports', icon: <BarChartIcon />, path: '/teacher/reports' },
        { text: 'Settings', icon: <SettingsIcon />, path: '/teacher/settings' },
        { text: 'Notifications', icon: <NotificationsIcon />, path: '/teacher/notifications' },
    ];

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
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => navigate(item.path)}
                        selected={location.pathname === item.path}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default TeacherSidebar;

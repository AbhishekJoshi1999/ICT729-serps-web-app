import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Grid,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const initialNotifications = [
  {
    id: 1,
    title: 'Assignment Submission',
    message: 'Jane Stack submitted assignment 1 of Capstone 1.',
    date: '1 day ago',
  },
  {
    id: 2,
    title: 'Assignment Reminder',
    message: '5 students have not submitted assignment 2 of Capstone 1. Remind them to submit.',
    date: '3 days ago',
  },
  {
    id: 3,
    title: 'Attendance Alert',
    message: '4 students have attendance below 60% in Capstone 1. Send a follow-up message.',
    date: '4 days ago',
  },
];

const TeacherNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box p={3}>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">Notifications</Typography>
          <Button
            onClick={handleMenuOpen}
            endIcon={<MoreVertIcon />}
            size="small"
            sx={{ textTransform: 'none' }}
          >
            Filter
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>All</MenuItem>
            <MenuItem onClick={handleMenuClose}>Assignment</MenuItem>
            <MenuItem onClick={handleMenuClose}>Attendance</MenuItem>
          </Menu>
        </Grid>
      </Paper>

      {notifications.map((note) => (
        <Paper key={note.id} sx={{ p: 2, mb: 2 }} elevation={1}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="subtitle2" fontWeight="bold">
                {note.title}
              </Typography>
              <Typography variant="body2">{note.message}</Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {note.date}
            </Typography>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default TeacherNotifications;

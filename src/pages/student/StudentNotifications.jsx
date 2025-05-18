// src/pages/student/StudentNotifications.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../utils/axios';
import { useAuth } from '../../contexts/AuthContext';

const StudentNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('7'); // Default filter: Last 7 days

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`/notifications/${user._id}`);
      setNotifications(res.data.data || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    const now = new Date();
    const notifDate = new Date(n.createdAt);
    const diffDays = Math.ceil((now - notifDate) / (1000 * 60 * 60 * 24));
    return filter === '7' ? diffDays <= 7 : diffDays <= 30;
  });

  useEffect(() => {
    if (user?._id) fetchNotifications();
  }, [user]);

  return (
    <Box p={3}>
     

      <Box component={Paper} elevation={1} sx={{ p: 2, mb: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">Notifications</Typography>
          <FormControl size="small">
            <InputLabel>Filter</InputLabel>
            <Select value={filter} onChange={(e) => setFilter(e.target.value)} label="Filter">
              <MenuItem value="7">Last 7 Days</MenuItem>
              <MenuItem value="30">Last Month</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Box>

      {filteredNotifications.map((n, index) => (
        <Paper key={index} sx={{ p: 2, mb: 1 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Box>
              <Typography fontWeight="bold">{n.title}</Typography>
              <Typography fontSize="small">{n.message}</Typography>
            </Box>
            <Box textAlign="right">
              <Typography fontSize="small" color="textSecondary">
                {new Date(n.createdAt).toLocaleDateString()}
              </Typography>
              <IconButton onClick={() => deleteNotification(n._id)} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        </Paper>
      ))}

      {filteredNotifications.length === 0 && (
        <Typography color="text.secondary" align="center" mt={4}>
          No notifications available.
        </Typography>
      )}
    </Box>
  );
};

export default StudentNotifications;

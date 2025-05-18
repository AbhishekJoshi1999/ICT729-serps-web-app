import React, { useState } from 'react';
import {
  Box, Typography, Paper, TextField, Grid, Button,
  InputAdornment, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const AdminSettings = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.fullName || 'Admin Name',
    email: user?.email || 'admin@example.com',
    contact: '1234567890',
    emergencyContact: '012345678',
    address: 'DEF 123 ST',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const toggleVisibility = (field) => () => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    alert('Password updated successfully.');
  };

  const handleCancel = () => {
    setFormData((prev) => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>Settings</Typography>

      {/* Profile Info */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>Profile Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Name" variant="outlined" value={formData.name} onChange={handleChange('name')} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Email" variant="outlined" value={formData.email} disabled />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Phone" variant="outlined" value={formData.contact} onChange={handleChange('contact')} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField fullWidth label="Address" variant="outlined" value={formData.address} onChange={handleChange('address')} />
          </Grid>
        </Grid>
      </Paper>

      {/* Change Password Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Change Password</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Current Password"
              type={showPassword.current ? 'text' : 'password'}
              fullWidth
              value={formData.currentPassword}
              onChange={handleChange('currentPassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleVisibility('current')} edge="end">
                      {showPassword.current ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="New Password"
              type={showPassword.new ? 'text' : 'password'}
              fullWidth
              value={formData.newPassword}
              onChange={handleChange('newPassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleVisibility('new')} edge="end">
                      {showPassword.new ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Confirm New Password"
              type={showPassword.confirm ? 'text' : 'password'}
              fullWidth
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleVisibility('confirm')} edge="end">
                      {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>

        <Box mt={3} display="flex" gap={2}>
          <Button variant="contained" color="success" onClick={handleSave}>Save Changes</Button>
          <Button variant="contained" color="error" onClick={handleCancel}>Cancel</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminSettings;

// src/pages/business/Settings.jsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Grid, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Settings = () => {
  const initialProfile = {
    name: 'XYZ ABC',
    email: 'xyz@abc.com',
    phone: '1234567890',
    address: 'DEF 123 ST',
  };

  const initialPasswords = {
    current: '',
    new: '',
    confirm: '',
  };

  const [profile, setProfile] = useState(initialProfile);
  const [passwords, setPasswords] = useState(initialPasswords);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [error, setError] = useState('');

  const handleClickShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSaveChanges = () => {
    // Password validation
    if (!passwords.new || !passwords.confirm) {
      setError('Please fill in both new password fields.');
      return;
    }

    if (passwords.new !== passwords.confirm) {
      setError('New password and confirm password must match.');
      return;
    }

    // Save profile and password changes (either locally or to the backend)
    console.log('Profile Saved:', profile);
    console.log('Password Changes:', passwords);

    // Clear the password fields after saving
    setPasswords(initialPasswords);
    setError('');
  };

  const handleCancelChanges = () => {
    // Reset the profile and password fields to their initial states
    setProfile(initialProfile);
    setPasswords(initialPasswords);
    setError('');
  };

  return (
    <Box sx={{ ml: 0, p: 2 }}>
      <Typography variant="h5" mb={3}>
        Settings
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>
          Profile Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Contact Number"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Address"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Change Password
        </Typography>

        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Current Password"
              type={showPassword.current ? 'text' : 'password'}
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleClickShowPassword('current')}>
                      {showPassword.current ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="New Password"
              type={showPassword.new ? 'text' : 'password'}
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleClickShowPassword('new')}>
                      {showPassword.new ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Confirm New Password"
              type={showPassword.confirm ? 'text' : 'password'}
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleClickShowPassword('confirm')}>
                      {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Box mt={2}>
          <Button variant="contained" color="success" sx={{ mr: 2 }} onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <Button variant="outlined" color="error" onClick={handleCancelChanges}>
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;

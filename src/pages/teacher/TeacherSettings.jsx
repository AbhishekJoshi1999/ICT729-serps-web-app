import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const TeacherSettings = () => {
  const { user } = useAuth(); 

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleClickShowPassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSaveChanges = () => {
    if (!passwords.new || !passwords.confirm) {
      setError('Please fill in all password fields.');
      return;
    }

    if (passwords.new !== passwords.confirm) {
      setError('New password and confirmation do not match.');
      return;
    }

    console.log('💾 Saving profile (not persisted):', profile);
    console.log('🔐 Password change simulated:', passwords);

    setError('');
    setPasswords({ current: '', new: '', confirm: '' });
    alert('Changes saved locally. No backend integration yet.');
  };

  const handleCancelChanges = () => {
    setProfile({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
    });
    setPasswords({ current: '', new: '', confirm: '' });
    setError('');
  };

  return (
    <Box sx={{ ml: 0, p: 2 }}>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>Profile Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Name"
              fullWidth
              value={profile.name}
              disabled // prevent editing
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              fullWidth
              value={profile.email}
              disabled // prevent editing
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone"
              fullWidth
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Address"
              fullWidth
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Change Password</Typography>
        {error && <Typography color="error" mb={2}>{error}</Typography>}
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Current Password"
              type={showPassword.current ? 'text' : 'password'}
              fullWidth
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleClickShowPassword('current')}>
                      {showPassword.current ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="New Password"
              type={showPassword.new ? 'text' : 'password'}
              fullWidth
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleClickShowPassword('new')}>
                      {showPassword.new ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Confirm New Password"
              type={showPassword.confirm ? 'text' : 'password'}
              fullWidth
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleClickShowPassword('confirm')}>
                      {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>

        <Box mt={3}>
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

export default TeacherSettings;

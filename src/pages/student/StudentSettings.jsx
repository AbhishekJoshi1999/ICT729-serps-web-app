// src/pages/student/StudentSettings.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const StudentSettings = () => {
  const { user } = useAuth();

  const initialProfile = {
    name: user?.fullName || '',
    email: user?.email || '',
    phone: '0483218762',
    emergency: '0498779021',
    address: '12 King St, NSW'
  };

  const [profile, setProfile] = useState(initialProfile);
  const [preferences, setPreferences] = useState({
    attendance: true,
    grades: true,
    reminders: true
  });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [error, setError] = useState('');

  const handlePasswordToggle = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    if (passwords.new && passwords.new !== passwords.confirm) {
      setError('New password and confirm password must match.');
      return;
    }

    console.log('✅ Saving profile:', profile);
    console.log('✅ Notification preferences:', preferences);
    console.log('✅ Password change:', passwords);
    setError('');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <Box p={3}>
    

      {/* Profile Info */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>Profile Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" fullWidth value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" fullWidth value={profile.email} disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Contact Number" fullWidth value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Emergency Contact" fullWidth value={profile.emergency} onChange={(e) => setProfile({ ...profile, emergency: e.target.value })} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Address" fullWidth value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
          </Grid>
        </Grid>
      </Paper>

      {/* Notification Preferences */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>Notification Preferences</Typography>
        <Grid container direction="column" spacing={1}>
  <Grid item>
    <FormControlLabel
      control={
        <Checkbox
          checked={preferences.attendance}
          onChange={(e) =>
            setPreferences({ ...preferences, attendance: e.target.checked })
          }
        />
      }
      label="Receive Attendance Alerts"
    />
  </Grid>
  <Grid item>
    <FormControlLabel
      control={
        <Checkbox
          checked={preferences.grades}
          onChange={(e) =>
            setPreferences({ ...preferences, grades: e.target.checked })
          }
        />
      }
      label="Get Grade Updates"
    />
  </Grid>
  <Grid item>
    <FormControlLabel
      control={
        <Checkbox
          checked={preferences.reminders}
          onChange={(e) =>
            setPreferences({ ...preferences, reminders: e.target.checked })
          }
        />
      }
      label="Assignment Reminders"
    />
  </Grid>
</Grid>

      </Paper>

      {/* Change Password */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Change Password</Typography>
        {error && <Typography color="error" mb={2}>{error}</Typography>}
        <Grid container spacing={2}>
          {['current', 'new', 'confirm'].map((field) => (
            <Grid item xs={12} sm={4} key={field}>
              <TextField
                label={
                  field === 'current'
                    ? 'Current Password'
                    : field === 'new'
                    ? 'New Password'
                    : 'Confirm New Password'
                }
                fullWidth
                type={showPassword[field] ? 'text' : 'password'}
                value={passwords[field]}
                onChange={(e) => setPasswords({ ...passwords, [field]: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => handlePasswordToggle(field)}>
                        {showPassword[field] ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Box mt={3}>
          <Button variant="contained" color="success" sx={{ mr: 2 }} onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant="outlined" color="error" onClick={() => setPasswords({ current: '', new: '', confirm: '' })}>
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default StudentSettings;

// src/pages/auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (email) {
      // Simulate API request for sending a password reset link
      console.log('Sending password reset link to:', email);
      setMessage('Password reset link has been sent to your email.');
    } else {
      setMessage('Please enter your email.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" mb={2}>Forgot Password</Typography>
        <TextField
          fullWidth
          label="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        {message && <Typography color="primary" mt={2}>{message}</Typography>}
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;

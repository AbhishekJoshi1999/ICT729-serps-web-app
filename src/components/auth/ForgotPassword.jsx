// // src/pages/auth/ForgotPassword.jsx
// import React, { useState } from 'react';
// import { Box, TextField, Button, Typography, Paper } from '@mui/material';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = () => {
//     if (email) {
//       // Simulate API request for sending a password reset link
//       console.log('Sending password reset link to:', email);
//       setMessage('Password reset link has been sent to your email.');
//     } else {
//       setMessage('Please enter your email.');
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}>
//       <Paper sx={{ padding: 3 }}>
//         <Typography variant="h5" mb={2}>Forgot Password</Typography>
//         <TextField
//           fullWidth
//           label="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           margin="normal"
//         />
//         {message && <Typography color="primary" mt={2}>{message}</Typography>}
//         <Box mt={2}>
//           <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default ForgotPassword;

// src/pages/auth/ForgotPassword.jsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import axios from '../../utils/axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setMessage('');
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    try {
      setLoading(true);
      // Replace with your actual API endpoint if different
      const response = await axios.post('/forgot-password', { email });

      if (response.status === 200) {
        setMessage('✅ Password reset link sent to your email.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Server error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 8 }}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h5" mb={2}>
          Forgot Password
        </Typography>

        <TextField
          fullWidth
          label="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          type="email"
        />

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}

        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;

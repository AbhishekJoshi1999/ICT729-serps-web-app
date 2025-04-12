// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Box,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from '/src/utils/axios';

const roles = ['Business client', 'Admin', 'Teacher', 'Student'];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/signin', { email, password });
  
      if (response.data?.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);
  
        // Optional: Call login from AuthContext
        login({ email, role: role.toLowerCase(), token });
  
        switch (role.toLowerCase()) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'teacher':
            navigate('/teacher/dashboard');
            break;
          case 'student':
            navigate('/student/dashboard');
            break;
          case 'business client':
            navigate('/business/dashboard');
            break;
          default:
            navigate('/unauthorized');
        }
      } else {
        setError('Login failed: No token received');
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || 'Invalid response from server');
    }
  };
  
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 10,
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          SERPS Login
        </Typography>
        {error && (
          <Typography variant="body2" color="error" mb={2}>
            {error}
          </Typography>
        )}
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            select
            label="Select Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
          >
            {roles.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
          <Typography variant="body2" color="text.secondary" mt={1}>
            <a href="#" onClick={handleForgotPassword}>Forgot your password?</a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;

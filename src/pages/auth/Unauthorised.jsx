// // src/pages/auth/Unauthorized.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// // import './Unauthorized.css';

// const Unauthorized = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="unauthorized-container">
//       <h1>Unauthorized Access</h1>
//       <p>You don't have permission to view this page.</p>
//       <button onClick={() => navigate(-1)}>Go Back</button>
//       <button onClick={() => navigate('/login')}>Login</button>
//     </div>
//   );
// };

// export default Unauthorized;

// src/pages/auth/Unauthorized.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Box
      minHeight="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ p: 2 }}
    >
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
        <Typography variant="h4" gutterBottom>
          Unauthorized Access
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          You don't have permission to view this page.
        </Typography>
        <Box display="flex" gap={2} justifyContent="center">
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button variant="contained" onClick={() => navigate('/login')}>
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Unauthorized;

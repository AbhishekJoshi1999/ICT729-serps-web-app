// src/layouts/BusinessLayout.jsx
import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '/src/components/business/Sidebar';
import Header from '/src/components/business/Header';
import { Outlet } from 'react-router-dom';

const BusinessLayout = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1}>
        <Header />
        {/* Adding padding to the content area to reduce the gap */}
        <Box component="main" sx={{ padding: '20px' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default BusinessLayout;

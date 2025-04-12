// src/pages/business/Dashboard.jsx
import React from 'react';
import Sidebar from '../../components/business/sidebar';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import UserManagement from './UserManagement';
import Settings from './Settings';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route path="user-management" element={<UserManagement />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;

// src/layouts/AdminLayout.jsx
import React from 'react';
import { Box } from '@mui/material';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <Box display="flex">
      <AdminSidebar />
      <Box flexGrow={1}>
        <AdminHeader />
        <Box component="main" sx={{ padding: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;

// src/layouts/TeacherLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import TeacherHeader from '../components/teacher/TeacherHeader';
import TeacherSidebar from '../components/teacher/TeacherSidebar';

const TeacherLayout = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <TeacherSidebar />

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f9f9f9', minHeight: '100vh' }}>
        <TeacherHeader searchText={searchText} onSearchChange={setSearchText} />
        
        {/* Adjust for fixed AppBar spacing */}
        {/* <Toolbar /> */}

        {/* Page Content */}
        <Box sx={{ p: 3 }}>
          <Outlet context={{ searchText }} />
        </Box>
      </Box>
    </Box>
  );
};

export default TeacherLayout;

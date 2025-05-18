import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import StudentHeader from '../components/student/StudentHeader';
import StudentSidebar from '../components/student/StudentSidebar';

const StudentLayout = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f9f9f9', minHeight: '100vh' }}>
        <StudentHeader searchText={searchText} onSearchChange={setSearchText} />

        {/* Page Content */}
        <Box sx={{ p: 3 }}>
          <Outlet context={{ searchText }} />
        </Box>
      </Box>
    </Box>
  );
};

export default StudentLayout;

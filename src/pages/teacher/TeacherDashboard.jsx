import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField
} from '@mui/material';
import FiltersBar from '../../components/teacher/FiltersBar';


const TeacherDashboard = () => {
  const [filters, setFilters] = useState({
    year: '2025',
    semester: 'Semester I',
    unit: 'All Units',
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Box p={3}>

      {/* Filters
      <FiltersBar
        year={filters.year}
        semester={filters.semester}
        unit={filters.unit}
        onChange={handleFilterChange}
      /> */}

      {/* Stats Cards */}
      <Grid container spacing={2} mt={2}>
        {[
          { label: 'Total Students', value: 150 },
          { label: 'Course Completion', value: '75%' },
          { label: 'Engagement', value: '76%' }
        ].map((item, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2">{item.label}</Typography>
              <Typography variant="h4">{item.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Calendar + Attendance Tracker */}
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Calendar
            </Typography>
            <TextField type="date" fullWidth />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Attendance Tracker
            </Typography>
            <Box height={200} bgcolor="#eee" mt={2} />
          </Paper>
        </Grid>
      </Grid>

      {/* Bar Chart */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Attendance vs Engagement
        </Typography>
        <Box height={200} bgcolor="#ddd" mt={2} />
      </Paper>
    </Box>
  );
};

export default TeacherDashboard;

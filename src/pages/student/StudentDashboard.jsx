// src/pages/student/StudentDashboard.jsx
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale);

const StudentDashboard = () => {
  const gradesData = {
    labels: ['Assessment 1', 'Assessment 2', 'Assessment 3'],
    datasets: [
      {
        label: 'Grades (%)',
        data: [75, 90, 0],
        backgroundColor: '#1976d2',
      },
    ],
  };

  const gradesOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
  };

  return (
    <Box p={3}>
   

      {/* Dropdown Filters - Optional, Commented out */}
      {/* <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={3}><TextField select fullWidth label="Year" /></Grid>
        <Grid item xs={12} sm={3}><TextField select fullWidth label="Semester" /></Grid>
        <Grid item xs={12} sm={3}><TextField select fullWidth label="Course" /></Grid>
        <Grid item xs={12} sm={3}><TextField select fullWidth label="Unit" /></Grid>
      </Grid> */}

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Attendance</Typography>
            <Typography variant="h6" color="primary">75%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Grades</Typography>
            <Typography variant="h6" color="success.main">80%</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1">Risk Level</Typography>
            <Typography variant="h6" color="success.main">Low</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Grades Bar Chart */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>
          Grades Overview
        </Typography>
        <Bar data={gradesData} options={gradesOptions} />
      </Paper>

      {/* Recommendations */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Recommendations</Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          <ListItem>
            <ListItemText primary="Attend the next 3 sessions to improve attendance to 90%." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Submit Assignment 3 by Jan 10 to improve grades." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Complete the Module 2 quiz for full credit." />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default StudentDashboard;

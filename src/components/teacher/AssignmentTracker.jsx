import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const pieData = [
  { name: 'Submitted', value: 80 },
  { name: 'Pending', value: 20 },
];

const lineData = [
  { week: 'Week 1', submissions: 20 },
  { week: 'Week 2', submissions: 35 },
  { week: 'Week 3', submissions: 50 },
  { week: 'Week 4', submissions: 80 },
];

const COLORS = ['#0088FE', '#FF8042'];

const AssignmentTracker = () => {
  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Assignment Tracker
      </Typography>
      <Box display="flex" justifyContent="space-around" flexWrap="wrap">
        <ResponsiveContainer width="45%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="45%" height={300}>
          <LineChart data={lineData}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="submissions" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default AssignmentTracker;

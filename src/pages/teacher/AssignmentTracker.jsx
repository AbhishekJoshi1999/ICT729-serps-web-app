import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
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

// Mock data
const pieData = [
  { name: 'Submitted', value: 90 },
  { name: 'Not Submitted', value: 45 },
];
const COLORS = ['#00C49F', '#0088FE'];

const lineData = [
  { date: 'Dec', submissions: 60 },
  { date: 'Jan 7', submissions: 80 },
  { date: 'Jan 14', submissions: 90 },
  { date: 'Jan 21', submissions: 100 },
  { date: 'Jan 29', submissions: 85 },
];

const AssignmentTracker = () => {
  return (
    <Box p={3}>
    

      <Grid container spacing={3}>
        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={{ minWidth: 280, height: '100%' }} elevation={2}>
            <CardContent sx={{ position: 'relative' }}>
            

              <Box sx={{ height: 250, position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>

                {/* Center Number */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">135</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12} md={5}>
          <Card sx={{ minWidth: 320, height: '100%' }} elevation={2}>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lineData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend verticalAlign="top" height={30} />
                  <Line
                    type="monotone"
                    dataKey="submissions"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot
                    name="Submissions"
                  />
                </LineChart>

              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recently Submitted */}
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }} elevation={2}>
            <CardContent>
              <Typography variant="subtitle2" mb={1}>Recently Submitted</Typography>
              <Box mt={2}>
                <Typography variant="body1" fontWeight="bold">Cloud 101</Typography>
                <Typography variant="body2">Mary Gwen</Typography>
                <Typography variant="caption" color="textSecondary">Jan 29</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AssignmentTracker;

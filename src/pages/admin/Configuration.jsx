import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button
} from '@mui/material';

const riskLevels = [
  {
    title: 'High Risk',
    attendance: '< 50%',
    missedAssessment: 3
  },
  {
    title: 'Medium Risk',
    attendance: '<= 50%',
    missedAssessment: 'False'
  },
  {
    title: 'Low Risk',
    attendance: '>= 75%',
    lowMark: 50
  }
];

const Configuration = () => {
  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Configure Risk
      </Typography>

      <Grid container spacing={3}>
        {riskLevels.map((risk, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Paper elevation={3} sx={{ p: 2, minHeight: 150 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {risk.title}
              </Typography>

              <Typography variant="body2" gutterBottom>
                Attendance: {risk.attendance}
              </Typography>

              {risk.missedAssessment !== undefined && (
                <Typography variant="body2" gutterBottom>
                  Missed Assessment: {risk.missedAssessment}
                </Typography>
              )}

              {risk.lowMark !== undefined && (
                <Typography variant="body2" gutterBottom>
                  Low Mark: {risk.lowMark}
                </Typography>
              )}

              <Box mt={2}>
                <Button variant="text" color="primary">EDIT</Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Configuration;

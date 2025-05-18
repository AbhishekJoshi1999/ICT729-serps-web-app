import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, MenuItem, TextField,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, CircularProgress
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import axios from '../../utils/axios';

const StudentAttendance = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState('');
  const [loading, setLoading] = useState(true);

  const calculateAttendanceStats = (records) => {
    const total = records.length;
    const present = records.filter(r => r.status === 'present').length;
    const percentage = total === 0 ? 0 : Math.round((present / total) * 100);
    let riskLevel = 'Low';
    if (percentage < 60) riskLevel = 'High';
    else if (percentage < 75) riskLevel = 'Medium';
    return { percentage, riskLevel };
  };

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await axios.get('/unit/getAllUnit');
        const unitData = res.data?.data || [];
        setUnits(unitData);
        if (unitData.length > 0) {
          setSelectedUnit(unitData[0]._id);
        }
      } catch (err) {
        console.error('Error fetching units:', err);
      }
    };

    fetchUnits();
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/class/${user._id}/attendance`);
        setAttendance(res.data.data || []);
      } catch (err) {
        console.error('Error fetching attendance:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id && selectedUnit) fetchAttendance();
  }, [user, selectedUnit]);

  const { percentage, riskLevel } = calculateAttendanceStats(attendance);

  return (
    <Box p={3} textAlign="center">
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Attendance Details
      </Typography>

      {/* Unit Dropdown + Summary */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <TextField
          select
          label="Unit"
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
          sx={{
            width: 250,
            bgcolor: '#f0f4ff',
            '& .MuiInputLabel-root': { fontWeight: 'bold' },
            '& .MuiSelect-select': { fontWeight: 'bold', color: '#1976d2' }
          }}
        >
          {units.map((unit) => (
            <MenuItem key={unit._id} value={unit._id}>
              {unit.unitName}
            </MenuItem>
          ))}
        </TextField>

        <Box textAlign="right">
          <Typography color="orange" fontWeight="bold">
            Total Attendance: {percentage}%
          </Typography>
          <Typography
            fontWeight="bold"
            color={
              riskLevel === 'High'
                ? 'red'
                : riskLevel === 'Medium'
                ? 'orange'
                : 'green'
            }
          >
            Risk Level: {riskLevel}
          </Typography>
        </Box>
      </Paper>

      {/* Attendance Table */}
      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Week</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendance.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                  <TableCell>{`Week ${i + 1}`}</TableCell>
                  <TableCell
                    sx={{ color: row.status === 'present' ? 'green' : 'red' }}
                  >
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default StudentAttendance;

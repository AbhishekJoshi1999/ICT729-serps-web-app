import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, MenuItem, TextField,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, CircularProgress
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import axios from '../../utils/axios';

const StudentGrades = () => {
  const { user } = useAuth();
  const [grades, setGrades] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState('');
  const [loading, setLoading] = useState(true);

  const calculateTotal = (records) => {
    let total = 0;
    let totalWeight = 0;
    records.forEach(r => {
      total += (r.grade || 0) * (r.weight || 0) / 100;
      totalWeight += r.weight || 0;
    });
    const totalPercentage = totalWeight > 0 ? (total / totalWeight) * 100 : 0;
    return totalPercentage.toFixed(1);
  };

  // Fetch units on mount
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await axios.get('/unit/getAllUnit');
        const data = res.data?.data || [];
        setUnits(data);
        if (data.length > 0) setSelectedUnit(data[0]._id);
      } catch (err) {
        console.error('Error fetching units:', err);
      }
    };
    fetchUnits();
  }, []);

  // Fetch grades when student or unit changes
  useEffect(() => {
    const fetchGrades = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/assignments/student/${user._id}/grades`);
        setGrades(res.data.data || []);
      } catch (err) {
        console.error('Error loading grades:', err);
      } finally {
        setLoading(false);
      }
    };
    if (user?._id && selectedUnit) fetchGrades();
  }, [user, selectedUnit]);

  const totalGrade = calculateTotal(grades);
  const classAverage = 76; // Static mockup

  return (
    <Box p={3} textAlign="center">
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Grades Details
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        component={Paper}
        p={2}
      >
        <TextField
          select
          label="Unit"
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
          sx={{
            minWidth: 200,
            bgcolor: '#f0f4ff',
            '& .MuiInputLabel-root': { fontWeight: 'bold' },
            '& .MuiSelect-select': { fontWeight: 'bold', color: '#1976d2' },
          }}
        >
          {units.length === 0 ? (
            <MenuItem disabled>No units available</MenuItem>
          ) : (
            units.map((unit) => (
              <MenuItem key={unit._id} value={unit._id}>
                {unit.unitName}
              </MenuItem>
            ))
          )}
        </TextField>

        <Box textAlign="right">
          <Typography color="green" fontWeight="bold">
            Total Grade: {totalGrade}%
          </Typography>
          <Typography fontSize={12} color="textSecondary">
            Class Average: {classAverage}%
          </Typography>
        </Box>
      </Box>

      {loading ? (
        <Box textAlign="center" mt={4}><CircularProgress /></Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Assessments</strong></TableCell>
                <TableCell><strong>Marks (%)</strong></TableCell>
                <TableCell><strong>Weight (%)</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grades.map((g, i) => (
                <TableRow key={i}>
                  <TableCell>{g.title || `Assessment ${i + 1}`}</TableCell>
                  <TableCell>{g.grade ?? '-'}</TableCell>
                  <TableCell>{g.weight}%</TableCell>
                  <TableCell sx={{ color: g.grade != null ? 'green' : 'red' }}>
                    {g.grade != null ? 'Completed' : 'Not Attempted'}
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

export default StudentGrades;

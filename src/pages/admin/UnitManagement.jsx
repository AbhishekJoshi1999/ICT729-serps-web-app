// src/pages/admin/UnitManagement.jsx
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, Paper
} from '@mui/material';
import UnitFormModal from './UnitFormModal';
import axios from '../../utils/axios';

const UnitManagement = () => {
  const [units, setUnits] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const fetchUnits = async () => {
    try {
      const res = await axios.get('/unit/getAllUnits');
      setUnits(res.data.data);
    } catch (err) {
      console.error('Error fetching units:', err);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const handleEdit = (unit) => {
    setSelectedUnit(unit);
    setOpenModal(true);
  };

  const handleCreate = () => {
    setSelectedUnit(null);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/unit/${id}`);
      fetchUnits();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting unit');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>Unit Management</Typography>
      <Button variant="contained" onClick={handleCreate} sx={{ mb: 2 }}>
        CREATE UNIT
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Unit Name</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {units.map((unit, index) => (
              <TableRow key={unit._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{unit.name}</TableCell>
                <TableCell>{unit.course?.courseName || 'N/A'}</TableCell>
                <TableCell>{unit.year}</TableCell>
                <TableCell>{unit.semester}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => handleEdit(unit)}>Edit</Button>
                  <Button variant="contained" color="error" size="small" sx={{ ml: 1 }} onClick={() => handleDelete(unit._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <UnitFormModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        unit={selectedUnit}
        refresh={fetchUnits}
      />
    </Box>
  );
};

export default UnitManagement;

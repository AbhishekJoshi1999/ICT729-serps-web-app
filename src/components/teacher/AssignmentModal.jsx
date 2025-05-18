import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { createAssignment, updateAssignment } from '../../services/assignmentService';
import axios from '../../utils/axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  p: 4,
};

const AssignmentModal = ({ open, onClose, onAssignmentCreated, assignment, isEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    unitId: '',
    classId: '',
    startDay: '',
    deadline: '',
    maxMarks: '',
  });

  const [classes, setClasses] = useState([]);
  const [units, setUnits] = useState([]);

  // Pre-fill form in edit mode
  useEffect(() => {
    if (isEdit && assignment) {
      setFormData({
        title: assignment.title || '',
        description: assignment.description || '',
        unitId: assignment.unitId?._id || assignment.unitId || '',
        classId: assignment.classId?._id || assignment.classId || '',
        startDay: assignment.startDay?.slice(0, 10) || '',
        deadline: assignment.deadline?.slice(0, 10) || '',
        maxMarks: assignment.maxMarks || '',
      });
    } else {
      resetForm();
    }
  }, [assignment, isEdit]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      unitId: '',
      classId: '',
      startDay: '',
      deadline: '',
      maxMarks: '',
    });
  };

  // Fetch dropdowns
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [classRes, unitRes] = await Promise.all([
          axios.get('/class/getAllClass'),
          axios.get('/unit/getAllUnits'),
        ]);
        setClasses(classRes.data.data || []);
        setUnits(unitRes.data.data || []);
      } catch (err) {
        console.error('❌ Failed to load dropdown data:', err.response?.data || err.message);
      }
    };

    if (open) {
      fetchDropdownData();
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updateAssignment(assignment._id, formData);
      } else {
        await createAssignment(formData);
      }

      if (onAssignmentCreated) onAssignmentCreated();
      handleClose();
    } catch (err) {
      console.error('❌ Submit failed:', err.response?.data || err.message);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          {isEdit ? 'Edit Assignment' : 'Create New Assignment'}
        </Typography>

        <TextField
          label="Title"
          name="title"
          fullWidth
          margin="dense"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="dense"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          select
          label="Unit"
          name="unitId"
          fullWidth
          margin="dense"
          value={formData.unitId}
          onChange={handleChange}
        >
          {units.map((unit) => (
            <MenuItem key={unit._id} value={unit._id}>
              {unit.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Class"
          name="classId"
          fullWidth
          margin="dense"
          value={formData.classId}
          onChange={handleChange}
        >
          {classes.map((cls) => (
            <MenuItem key={cls._id} value={cls._id}>
              {cls.className}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Start Date"
          name="startDay"
          type="date"
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
          value={formData.startDay}
          onChange={handleChange}
        />
        <TextField
          label="Deadline"
          name="deadline"
          type="date"
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
          value={formData.deadline}
          onChange={handleChange}
        />
        <TextField
          label="Max Marks"
          name="maxMarks"
          type="number"
          fullWidth
          margin="dense"
          value={formData.maxMarks}
          onChange={handleChange}
        />

        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
          {isEdit ? 'Update' : 'Submit'}
        </Button>
      </Box>
    </Modal>
  );
};

export default AssignmentModal;

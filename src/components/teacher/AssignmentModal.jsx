import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { createAssignment } from '../../services/assignmentService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  p: 4,
};

const AssignmentModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    unitId: '',
    classId: '',
    startDay: '',
    deadline: '',
    maxMarks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await createAssignment(formData);
      onClose();
      // Optionally: trigger refresh from parent via prop callback
    } catch (err) {
      console.error('Create error:', err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Create New Assignment
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
          <MenuItem value="67de5e07aca91336882210a5">Data Structures</MenuItem>
          <MenuItem value="67de5e07aca91336882210a6">Machine Learning</MenuItem>
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
          <MenuItem value="67e69d4fa04bd75a9068d818">Class_Data_Structures</MenuItem>
          <MenuItem value="67e69d81a04bd75a9068d829">Class_Machine_Learning</MenuItem>
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
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AssignmentModal;

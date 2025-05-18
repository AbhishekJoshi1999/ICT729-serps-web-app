// src/components/teacher/GradeEditModal.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';

const GradeEditModal = ({
  open,
  onClose,
  student,
  grade,
  setGrade,
  onSave
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Grade</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Student Name"
          value={student?.studentName || ''}
          disabled
        />
        <TextField
          fullWidth
          margin="dense"
          label="Grade"
          type="number"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Graded By"
          value="TC"
          disabled
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSave}>Save</Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GradeEditModal;

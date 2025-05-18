// src/components/teacher/AssignmentPreviewModal.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography
} from '@mui/material';

const AssignmentPreviewModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Assignment Preview</DialogTitle>
      <DialogContent>
        {/* Replace with embedded PDF viewer or file viewer later */}
        <Box height="400px" bgcolor="#f0f0f0" display="flex" justifyContent="center" alignItems="center">
          <Typography variant="body2">[File preview will appear here]</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentPreviewModal;

import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Divider,
  Grid
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

const ViewAssignmentModal = ({ open, onClose, assignment }) => {
  if (!assignment) return null;

  const {
    title,
    description,
    unitId,
    classId,
    startDay,
    deadline,
    maxMarks
  } = assignment;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Assignment Details
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={1}>
          <Grid item xs={5}><strong>Title:</strong></Grid>
          <Grid item xs={7}>{title}</Grid>

          <Grid item xs={5}><strong>Description:</strong></Grid>
          <Grid item xs={7}>{description}</Grid>

          <Grid item xs={5}><strong>Unit:</strong></Grid>
          <Grid item xs={7}>{unitId?.name || unitId}</Grid>

          <Grid item xs={5}><strong>Class:</strong></Grid>
          <Grid item xs={7}>{classId?.className || classId}</Grid>

          <Grid item xs={5}><strong>Start Date:</strong></Grid>
          <Grid item xs={7}>{new Date(startDay).toLocaleDateString()}</Grid>

          <Grid item xs={5}><strong>Deadline:</strong></Grid>
          <Grid item xs={7}>{new Date(deadline).toLocaleDateString()}</Grid>

          <Grid item xs={5}><strong>Max Marks:</strong></Grid>
          <Grid item xs={7}>{maxMarks}</Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ViewAssignmentModal;

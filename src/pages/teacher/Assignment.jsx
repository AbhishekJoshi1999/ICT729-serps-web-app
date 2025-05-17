import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AssignmentList from '../../components/teacher/AssignmentList';
import AssignmentModal from '../../components/teacher/AssignmentModal';
import { fetchAssignments } from '../../services/assignmentService';

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const getAssignments = async () => {
      const data = await fetchAssignments();
      setAssignments(data);
    };
    getAssignments();
  }, []);

  return (
    <Box p={3} >
      <Typography variant="h5" gutterBottom>
        Assignments
      </Typography>
      <Button variant="contained" onClick={() => setOpenModal(true)}>
        Create Assignment
      </Button>
      <AssignmentList assignments={assignments} />
      <AssignmentModal open={openModal} onClose={() => setOpenModal(false)} />
    </Box>
  );
};

export default Assignment;

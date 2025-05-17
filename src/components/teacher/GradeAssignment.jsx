import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  TextField,
} from '@mui/material';

const submissions = [
  { id: 1, studentName: 'John Doe', fileUrl: '/submissions/john_doe.pdf' },
  { id: 2, studentName: 'Jane Smith', fileUrl: '/submissions/jane_smith.pdf' },
  // Add more submissions as needed
];

const GradeAssignment = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [grade, setGrade] = useState('');

  const handleOpen = (submission) => {
    setSelectedSubmission(submission);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedSubmission(null);
    setGrade('');
  };

  const handleSubmitGrade = () => {
    // Submit the grade to the backend
    console.log(`Graded ${selectedSubmission.studentName} with ${grade}`);
    handleClose();
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Grade Assignments
      </Typography>
      <List>
        {submissions.map((submission) => (
          <ListItem key={submission.id}>
            <ListItemText
              primary={submission.studentName}
              secondary={
                <a href={submission.fileUrl} target="_blank" rel="noopener noreferrer">
                  View Submission
                </a>
              }
            />
            <Button variant="outlined" onClick={() => handleOpen(submission)}>
              Grade
            </Button>
          </ListItem>
        ))}
      </List>
      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Grade {selectedSubmission?.studentName}
          </Typography>
          <TextField
            fullWidth
            label="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" onClick={handleSubmitGrade} sx={{ mt: 2 }}>
            Submit Grade
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default GradeAssignment;

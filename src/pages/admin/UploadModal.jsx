// src/pages/admin/UploadModal.jsx
import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box, Typography, Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from '../../utils/axios';

const UploadZone = styled(Paper)(({ theme, isDragging }) => ({
  border: `2px dashed ${isDragging ? theme.palette.primary.main : '#ccc'}`,
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: isDragging ? '#f0f8ff' : 'transparent',
}));

const UploadModal = ({ open, handleClose, refreshUsers }) => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    setFile(uploadedFile);
    setDragging(false);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a CSV file.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/users/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully!');
      refreshUsers();
      handleClose();
    } catch (err) {
      console.error('Error uploading file:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Upload failed.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add new list of students</DialogTitle>
      <DialogContent>
        <Box
          mt={2}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
        >
          <UploadZone isDragging={dragging}>
            <Typography>
              {file ? file.name : 'Drag & drop file here or click to select a file'}
            </Typography>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'none' }}
              id="upload-input"
            />
            <label htmlFor="upload-input">
              <Button variant="contained" sx={{ mt: 2 }} component="span">
                Browse
              </Button>
            </label>
          </UploadZone>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleUpload} variant="contained" disabled={!file}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadModal;

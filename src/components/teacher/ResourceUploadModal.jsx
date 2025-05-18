import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 2,
  p: 4,
  boxShadow: 24,
  textAlign: 'center',
};

const ResourceUploadModal = ({ open, onClose }) => {
  const [file, setFile] = useState(null);

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file first.');

    const formData = new FormData();
    formData.append('file', file);

    console.log('📤 Mock upload file:', file.name);

    // TODO: Replace with actual API POST call
    alert(`Mock upload: "${file.name}"`);
    setFile(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Close Button */}
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" mb={2}>
          Upload Resource
        </Typography>

        {/* Drop Zone */}
        <Box
          onDrop={handleFileDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById('fileInput').click()}
          sx={{
            border: '2px dashed #ccc',
            p: 4,
            borderRadius: 2,
            cursor: 'pointer',
          }}
        >
          <CloudUploadIcon fontSize="large" color="action" />
          <Typography mt={2}>
            {file ? file.name : 'Drag or select a file from your computer'}
          </Typography>
        </Box>

        {/* Hidden Input */}
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />

        {/* Upload Button */}
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleUpload}
          disabled={!file}
        >
          Upload
        </Button>
      </Box>
    </Modal>
  );
};

export default ResourceUploadModal;

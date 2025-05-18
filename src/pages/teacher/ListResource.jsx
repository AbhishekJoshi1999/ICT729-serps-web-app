import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton
} from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import DescriptionIcon from '@mui/icons-material/Description';
import ResourceUploadModal from '../../components/teacher/ResourceUploadModal';

// Add mock resource file URLs here (can be backend-generated later)
const mockResources = [
  { name: 'Intro to Cloud 101.pdf', type: 'pdf', url: '/mock/intro-cloud.pdf' },
  { name: 'Assessments Specifications.pdf', type: 'pdf', url: '/mock/specs.pdf' },
  { name: 'Assessments Template.zip', type: 'zip', url: '/mock/template.zip' },
  { name: 'Useful Links and Resources.txt', type: 'txt', url: '/mock/resources.txt' },
];

// Helper to return appropriate icon based on file extension
const getFileIcon = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();

  switch (ext) {
    case 'pdf':
      return <PictureAsPdfIcon color="error" />;
    case 'zip':
    case 'rar':
      return <FolderZipIcon color="primary" />;
    case 'txt':
    default:
      return <DescriptionIcon />;
  }
};

const ResourceList = () => {
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Available Study Resources
      </Typography>

      {/* Optional Filters */}
      {/*
      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item xs={12} sm={3}>
          <TextField select fullWidth label="Subject">
            <MenuItem value="Cloud 101">Cloud 101</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField select fullWidth label="Year">
            <MenuItem value="2025">2025</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField select fullWidth label="Semester">
            <MenuItem value="1">Semester 1</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField select fullWidth label="Unit">
            <MenuItem value="Cloud Unit A">Cloud Unit A</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      */}

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" onClick={() => setUploadOpen(true)}>
          Add Files
        </Button>
      </Box>

      {/* File List */}
      <Paper sx={{ p: 2 }}>
        {mockResources.map((file, idx) => (
          <Box
            key={idx}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            my={1}
          >
            <Box display="flex" alignItems="center" gap={1}>
              {getFileIcon(file.name)}
              <Typography
                component="a"
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {file.name}
              </Typography>
            </Box>

            <IconButton onClick={() => window.open(file.url, '_blank')}>
              <CloudDownloadIcon />
            </IconButton>
          </Box>
        ))}
      </Paper>

      <ResourceUploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
      />
    </Box>
  );
};

export default ResourceList;

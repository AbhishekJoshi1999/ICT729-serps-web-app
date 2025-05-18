// src/pages/student/StudentResources.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  MenuItem,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  CircularProgress
} from '@mui/material';
import { Description, Folder } from '@mui/icons-material';
import axios from '../../utils/axios';

const resourceLinks = [
  {
    name: 'Capstone 1',
    url: 'https://example.com/resources/capstone1.pdf',
    icon: <Folder />,
  },
  {
    name: 'Assessments Specifications',
    url: 'https://example.com/resources/specifications.pdf',
    icon: <Description />,
  },
  {
    name: 'Assessments Template',
    url: 'https://example.com/resources/template.docx',
    icon: <Description />,
  },
  {
    name: 'Useful Links and Resources for Assessments',
    url: 'https://example.com/resources/links.html',
    icon: <Folder />,
  },
];

const deadlines = [
  { task: 'Assignment 1', date: 'Dec 01, 2024', status: 'Closed' },
  { task: 'Initial Proposal', date: 'Dec 14, 2024', status: 'Closed' },
  { task: 'Initial Prototype', date: 'Jan 06, 2025', status: 'Started' },
  { task: 'Final Assignment', date: 'Feb 28, 2025', status: 'Scheduled' },
];

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'closed':
      return 'red';
    case 'started':
      return 'orange';
    case 'scheduled':
      return 'green';
    default:
      return 'black';
  }
};

const StudentResources = () => {
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await axios.get('/unit/getAllUnit');
        const allUnits = res.data?.data || [];
        setUnits(allUnits);
        if (allUnits.length > 0) setSelectedUnit(allUnits[0]._id);
      } catch (err) {
        console.error('Error fetching units:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  return (
    <Box p={3} >
      <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
        Available Study Resources
      </Typography>

      {/* Filters */}
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Grid item>
          <TextField
            select
            label="Unit"
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            sx={{
              width: 250,
              bgcolor: '#f0f4ff',
              '& .MuiInputLabel-root': { fontWeight: 'bold' },
              '& .MuiSelect-select': { fontWeight: 'bold', color: '#1976d2' },
            }}
          >
            {loading ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : units.length === 0 ? (
              <MenuItem disabled>No Units Found</MenuItem>
            ) : (
              units.map((unit) => (
                <MenuItem key={unit._id} value={unit._id}>
                  {unit.unitName}
                </MenuItem>
              ))
            )}
          </TextField>
        </Grid>
      </Grid>

      {/* Resource Links */}
      <List>
        {resourceLinks.map((res, index) => (
          <ListItem
            key={index}
            button
            component="a"
            href={res.url}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemIcon>{res.icon}</ListItemIcon>
            <ListItemText primary={res.name} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 3 }} />

      {/* Deadlines Table */}
      <Typography variant="h6" mb={2}>
        Deadlines:
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tasks</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deadlines.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.task}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell
                  sx={{
                    color: getStatusColor(item.status),
                    fontWeight: 'bold',
                  }}
                >
                  {item.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentResources;

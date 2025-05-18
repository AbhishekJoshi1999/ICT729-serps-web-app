import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Button,
  TextField,
  MenuItem
} from '@mui/material';
import axios from '../../utils/axios';

const Attendance = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState([]);
  const [topic, setTopic] = useState('');

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const res = await axios.get('/class/getAllClass');
        setClasses(res.data.data || []);
      } catch (err) {
        console.error('Failed to load classes:', err);
      }
    };
    loadClasses();
  }, []);

  useEffect(() => {
    const fetchStudentsFromAssignments = async () => {
      if (!selectedClass) return;

      try {
        const res = await axios.get('/assignments');
        const assignments = res.data.data || [];

        const flattened = [];
        const seen = new Set();

        assignments.forEach(a => {
          a.submissions.forEach(s => {
            if (s.classId === selectedClass) {
              s.students.forEach(st => {
                if (!seen.has(st.studentId)) {
                  seen.add(st.studentId);
                  flattened.push({
                    studentId: st.studentId,
                    name: `Student ${st.studentId.slice(-4)}`,
                    status: 'present',
                  });
                }
              });
            }
          });
        });

        setStudents(flattened);
      } catch (err) {
        console.error('Failed to fetch students:', err);
      }
    };

    fetchStudentsFromAssignments();
  }, [selectedClass]);

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleMarkPresent = async () => {
    if (!topic || !selectedClass) {
      return alert('Select class and enter topic first.');
    }

    const payload = {
      date: new Date().toISOString().split('T')[0],
      topic,
      students: selected.map(id => ({ studentId: id, status: 'present' }))
    };

    try {
      await axios.post(`/class/${selectedClass}/attendance`, payload);
      alert('Attendance marked successfully!');
    } catch (err) {
      console.error('Error marking attendance:', err);
      alert('Failed to mark attendance.');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>Attendance</Typography>

      {/* Class Select and Topic */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          select
          label="Select Class"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        >
          {classes.map(cls => (
            <MenuItem key={cls._id} value={cls._id}>
              {cls.className}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          size="small"
        />

        <Button variant="contained" onClick={handleMarkPresent}>
          Mark Present
        </Button>
      </Box>

      {/* Attendance Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Student Name</TableCell>
            <TableCell>Student ID</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((s, i) => (
            <TableRow key={s.studentId}>
              <TableCell>
                <Checkbox
                  checked={selected.includes(s.studentId)}
                  onChange={() => toggleSelect(s.studentId)}
                />
              </TableCell>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.studentId}</TableCell>
              <TableCell>Present</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Attendance;

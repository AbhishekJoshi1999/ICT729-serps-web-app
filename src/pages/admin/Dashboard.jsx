// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from '../../utils/axios';

const COLORS = ['#ff4d4f', '#faad14', '#52c41a'];


const AdminDashboard = () => {
  const [year, setYear] = useState('2025');
  const [semester, setSemester] = useState('Semester 1');
  const [course, setCourse] = useState('Capstone 1');
  const [attendanceData, setAttendanceData] = useState([]);
  const [riskData, setRiskData] = useState([]);
  const [students, setStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [messageText, setMessageText] = useState('');


  useEffect(() => {
    fetchAttendance();
    fetchRisk();
    fetchStudents();
  }, [year, semester, course]);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`/admin/attendance?year=${year}&semester=${semester}&course=${course}`);
      setAttendanceData(res.data);
    } catch (err) {
      console.error('Failed to fetch attendance:', err);
    }
  };

  const fetchRisk = async () => {
    try {
      const res = await axios.get('/admin/risk-summary');
      setRiskData(res.data);
    } catch (err) {
      console.error('Failed to fetch risk summary:', err);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get('/users');
      setStudents(res.data.users);
    } catch (err) {
      console.error('Failed to fetch students:', err);
    }
  };
  const handleExportReport = async () => {
    try {
      const response = await axios.get('/admin/export-report', {
        params: { year, semester, course },
        responseType: 'blob', // Important for file downloads
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${course}_${year}_${semester}.xlsx`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Export failed:", error);
    }
  };


  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>Dashboard</Typography>

      {/* Filters */}
      {/* <Grid container spacing={2} mb={3}>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select value={year} onChange={(e) => setYear(e.target.value)}>
              <MenuItem value="2025">2025</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel>Semester</InputLabel>
            <Select value={semester} onChange={(e) => setSemester(e.target.value)}>
              <MenuItem value="Semester 1">Semester 1</MenuItem>
              <MenuItem value="Semester 2">Semester 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel>Course</InputLabel>
            <Select value={course} onChange={(e) => setCourse(e.target.value)}>
              <MenuItem value="Capstone 1">Capstone 1</MenuItem>
              <MenuItem value="Capstone 2">Capstone 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>*/}

      <Grid container spacing={3}>
        {/* Attendance Graph */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>Attendance Graph</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attendance" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Risk Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>Risk Chart</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={riskData} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={100}>
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Export and Table */}
      <Box mt={4}>
        <Button variant="contained" sx={{ mb: 2 }} onClick={handleExportReport} >Export Report</Button>
        <Paper>
          <Box p={2}>
            <Typography variant="h6" mb={2}>Students</Typography>
            <table width="100%">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Attendance</th>
                  <th>Risk Level</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td>{s.username}</td>
                    <td>{s.gender}</td>
                    <td>{s.email}</td>
                    <td>{s.attendance || '-'}</td>
                    <td>{s.risk || '-'}</td>
                    <td>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          setSelectedEmail(s.email);
                          setOpenModal(true);
                        }}
                      >
                        Message
                      </Button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Paper>
      </Box>
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Send Message to {selectedEmail}</DialogTitle>
        <DialogContent>
          <TextField
            label="Your Message"
            multiline
            rows={5}
            fullWidth
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message here..."
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} variant="outlined">Cancel</Button>
          <Button
            onClick={() => {
              console.log(`Message to ${selectedEmail}:`, messageText); // simulate send
              alert('Message sent!');
              setOpenModal(false);
              setMessageText('');
            }}
            variant="contained"
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;

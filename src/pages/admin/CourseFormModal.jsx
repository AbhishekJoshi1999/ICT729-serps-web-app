import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Grid
} from '@mui/material';
import axios from '../../utils/axios';

const CourseFormModal = ({ open, handleClose, course, refresh }) => {
  const isEdit = Boolean(course);

  const [formData, setFormData] = useState({
    courseName: '',
    headOfDepartment: '',
    totalCredits: ''
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users to populate Head of Department dropdown
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/users?role=teacher');
        setUsers(res.data.users);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (isEdit) {
      setFormData({
        courseName: course.courseName || '',
        headOfDepartment: course.headOfDepartment || '',
        totalCredits: course.totalCredits || ''
      });
    } else {
      setFormData({
        courseName: '',
        headOfDepartment: '',
        totalCredits: ''
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await axios.put(`/courses/${course._id}`, formData);
      } else {
        await axios.post('/courses/createCourse', formData);
      }
      refresh();
      handleClose();
    } catch (err) {
      console.error('Error saving course:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to save course.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? 'Edit Course' : 'Create Course'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Course"
              name="courseName"
              fullWidth
              value={formData.courseName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Total Credits"
              name="totalCredits"
              type="number"
              fullWidth
              value={formData.totalCredits}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Head of Department"
              name="headOfDepartment"
              select
              fullWidth
              value={formData.headOfDepartment}
              onChange={handleChange}
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user.fullName}>
                  {user.fullName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleSubmit} variant="contained">
          {isEdit ? 'Save Changes' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseFormModal;

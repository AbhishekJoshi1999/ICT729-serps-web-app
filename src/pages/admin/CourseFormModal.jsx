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
        courseName: course.name || '',
        headOfDepartment: course.headOfDepartment?._id || '',
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
      const payload = {
        name: formData.courseName,
        headOfDepartment: formData.headOfDepartment,
        totalCredits: Number(formData.totalCredits)
      };

      if (isEdit) {
        await axios.put(`/course/${course._id}`, payload);
      } else {
        await axios.post('/course/createCourse', payload);
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
              select
              label="Head of Department"
              name="headOfDepartment"
              fullWidth
              value={formData.headOfDepartment}
              onChange={handleChange}
              sx={{ minWidth: '300px' }}
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
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

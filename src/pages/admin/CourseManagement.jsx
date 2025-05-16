import React, { useEffect, useState } from 'react';
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper
} from '@mui/material';
import CourseFormModal from './CourseFormModal';
import axios from '../../utils/axios';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [userMap, setUserMap] = useState({});

  const fetchCourses = async () => {
    try {
      const res = await axios.get('/course/getAllCourse');
      setCourses(res.data.data || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/users/findAllTeachers'); // Replace with your actual users API path
      const map = {};
      res.data.data.forEach(user => {
        map[user._id] = user.fullName;
      });
      setUserMap(map);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchUsers();
  }, []);

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setOpenModal(true);
  };

  const handleCreate = () => {
    setSelectedCourse(null);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/course/${id}`);
      fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete course');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>Course Management</Typography>
      <Button variant="contained" onClick={handleCreate} sx={{ mb: 2 }}>
        CREATE COURSE
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Head of Department</TableCell>
              <TableCell>Total Credits</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={course._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{userMap[course.headOfDepartment] || 'N/A'}</TableCell>
                <TableCell>{course.totalCredits}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => handleEdit(course)}>Edit</Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <CourseFormModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        course={selectedCourse}
        refresh={fetchCourses}
      />
    </Box>
  );
};

export default CourseManagement;

import React, { useEffect, useState } from 'react';
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, TextField
} from '@mui/material';
import CourseFormModal from './CourseFormModal';
import axios from '../../utils/axios';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
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
      await axios.delete(`/courses/${id}`);
      fetchCourses();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert('Error deleting course');
      }
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
            {courses.map((course, idx) => (
              <TableRow key={course._id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.headOfDepartment}</TableCell>
                <TableCell>{course.totalCredits}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => handleEdit(course)}>Edit</Button>
                  <Button variant="contained" size="small" color="error" onClick={() => handleDelete(course._id)} sx={{ ml: 1 }}>
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

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import GradeAssignmentModal from '../../components/teacher/GradeAssignmentModal';
import AssignmentPreview from '../../components/teacher/AssignmentPreview';
import axios from '../../utils/axios';

const GradeAssignment = () => {
  const [search, setSearch] = useState('');
  const [flattenedData, setFlattenedData] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [gradeInput, setGradeInput] = useState('');

  // ✅ Fetch assignments and flatten data
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get('/assignments');
        const assignments = res.data.data;

        const flatList = [];

        assignments.forEach((assignment) => {
          assignment.submissions.forEach((submission) => {
            submission.students.forEach((student) => {
              flatList.push({
                assignmentId: assignment._id,             // ✅ Needed for POST URL
                assignmentTitle: assignment.title,
                studentId: student.studentId,
                classId: submission.classId,
                submissionDate: student.submissionDate,
                file: student.file,
                grade: student.grade,
              });
            });
          });
        });

        setFlattenedData(flatList);
      } catch (err) {
        console.error('Error fetching assignments:', err);
      }
    };

    fetchAssignments();
  }, []);

  const handlePreview = (fileUrl) => {
    setPreviewOpen(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setGradeInput(student.grade?.toString() || '');
    setEditOpen(true);
  };

  const handleGradeSave = () => {
    setFlattenedData(prev =>
      prev.map(d =>
        d.studentId === selectedStudent.studentId &&
        d.assignmentId === selectedStudent.assignmentId
          ? { ...d, grade: parseInt(gradeInput) }
          : d
      )
    );
    setEditOpen(false);
  };

  // ✅ Grouped upload to match Swagger API
  const handleUploadGrades = async () => {
    const grouped = {};

    flattenedData.forEach((entry) => {
      const key = `${entry.assignmentId}_${entry.classId}`;
      if (!grouped[key]) {
        grouped[key] = {
          assignmentId: entry.assignmentId,
          classId: entry.classId,
          grades: []
        };
      }
      grouped[key].grades.push({
        studentId: entry.studentId,
        grade: entry.grade
      });
    });

    try {
      for (const key in grouped) {
        const { assignmentId, classId, grades } = grouped[key];
        await axios.post(`/assignments/${assignmentId}/class/${classId}/grades`, {
          grades
        });
      }

      alert('Grades uploaded successfully!');
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload grades.');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Grade Assignment
      </Typography>

      {/* Search + Upload */}
      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder="Search Assignment Title"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUploadGrades}
            fullWidth
          >
            Upload Grade
          </Button>
        </Grid>
      </Grid>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Assignment</TableCell>
            <TableCell>Student ID</TableCell>
            <TableCell>Class ID</TableCell>
            <TableCell>Submission Date</TableCell>
            <TableCell>View File</TableCell>
            <TableCell>Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flattenedData
            .filter((row) =>
              row.assignmentTitle.toLowerCase().includes(search.toLowerCase())
            )
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.assignmentTitle}</TableCell>
                <TableCell>{row.studentId}</TableCell>
                <TableCell>{row.classId}</TableCell>
                <TableCell>
                  {row.submissionDate
                    ? new Date(row.submissionDate).toLocaleDateString()
                    : '—'}
                </TableCell>
                <TableCell>
                  {row.file ? (
                    <Button
                      startIcon={<VisibilityIcon />}
                      onClick={() => handlePreview(row.file)}
                      variant="outlined"
                      size="small"
                    >
                      View
                    </Button>
                  ) : (
                    <Typography variant="caption">No File</Typography>
                  )}
                </TableCell>
                <TableCell>
                  {row.grade ?? '—'} / 20{' '}
                  <IconButton onClick={() => handleEdit(row)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Modals */}
      <AssignmentPreview open={previewOpen} onClose={() => setPreviewOpen(false)} />
      <GradeAssignmentModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        student={selectedStudent}
        grade={gradeInput}
        setGrade={setGradeInput}
        onSave={handleGradeSave}
      />
    </Box>
  );
};

export default GradeAssignment;

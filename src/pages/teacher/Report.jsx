import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from '../../utils/axios'; // Your configured axios instance

const Report = () => {
  const [loading, setLoading] = useState(false);

  const handleDownloadReport = async () => {
    setLoading(true);
    try {
      // 1. Fetch all assignments with submission data
      const response = await axios.get('/assignments');
      const assignments = response.data.data || [];

      // 2. Flatten the structure into rows
      const reportRows = [];

      assignments.forEach((assignment) => {
        const { title, unitId, maxMarks, deadline, submissions } = assignment;

        submissions.forEach((submission) => {
          submission.students.forEach((student) => {
            reportRows.push({
              'Assignment Title': title,
              'Unit Name': unitId?.name || 'N/A',
              'Max Marks': maxMarks,
              'Deadline': new Date(deadline).toLocaleDateString(),
              'Student ID': student.studentId,
              'Submission Date': student.submissionDate
                ? new Date(student.submissionDate).toLocaleDateString()
                : '—',
              'Grade': student.grade !== null ? student.grade : '—',
              'File Submitted': student.file ? 'Yes' : 'No',
              'Class ID': submission.classId,
            });
          });
        });
      });

      // 3. Convert to worksheet
      const worksheet = XLSX.utils.json_to_sheet(reportRows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Report');

      // 4. Export
      const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([buffer], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      saveAs(blob, 'SERPS_Student_Report.xlsx');
    } catch (err) {
      console.error('❌ Report generation failed:', err);
      alert('Failed to download report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Export Student Report
      </Typography>

      <Button
        variant="contained"
        onClick={handleDownloadReport}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Download Excel Report'}
      </Button>
    </Box>
  );
};

export default Report;

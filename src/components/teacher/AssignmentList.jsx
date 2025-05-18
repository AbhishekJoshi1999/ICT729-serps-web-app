import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';

const AssignmentList = ({ assignments, onView, onEdit, onDelete }) => {
  return (
    <Paper sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Max Marks</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignments.map((assignment) => (
            <TableRow key={assignment._id}>
              <TableCell>{assignment.title}</TableCell>
              <TableCell>{assignment.maxMarks}</TableCell>
              <TableCell>{new Date(assignment.startDay).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(assignment.deadline).toLocaleDateString()}</TableCell>
              <TableCell>
                <IconButton onClick={() => onView(assignment)}>
                  <Visibility />
                </IconButton>
                <IconButton onClick={() => onEdit(assignment)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDelete(assignment._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AssignmentList;

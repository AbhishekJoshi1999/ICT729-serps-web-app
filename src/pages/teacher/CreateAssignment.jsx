import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AssignmentList from '../../components/teacher/AssignmentList';
import AssignmentModal from '../../components/teacher/AssignmentModal';
import ViewAssignmentModal from '../../components/teacher/ViewAssignmentModal';
import { fetchAssignments, deleteAssignment } from '../../services/assignmentService';

const CreateAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const loadAssignments = async () => {
    const data = await fetchAssignments();
    setAssignments(data);
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  const handleAssignmentCreatedOrUpdated = () => {
    setOpenModal(false);
    setEditMode(false);
    setSelectedAssignment(null);
    loadAssignments();
  };

  const handleView = (assignment) => {
    setSelectedAssignment(assignment);
    setViewOpen(true);
  };

  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    setEditMode(true);
    setOpenModal(true);
  };

  const handleDelete = async (assignmentId) => {
    const confirm = window.confirm("Are you sure you want to delete this assignment?");
    if (!confirm) return;
    try {
      await deleteAssignment(assignmentId);
      loadAssignments();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete assignment");
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>

        <Button variant="contained" onClick={() => {
          setSelectedAssignment(null);
          setEditMode(false);
          setOpenModal(true);
        }}>
          Create Assignment
        </Button>
      </Box>

      <AssignmentList
        assignments={assignments}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create/Edit Modal */}
      <AssignmentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAssignmentCreated={handleAssignmentCreatedOrUpdated}
        assignment={selectedAssignment}
        isEdit={editMode}
      />

      {/* View-Only Modal */}
      <ViewAssignmentModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        assignment={selectedAssignment}
      />
    </Box>
  );
};

export default CreateAssignment;

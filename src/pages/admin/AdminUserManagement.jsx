import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import UserFormModal from './UserFormModal';
import axios from '../../utils/axios';
import BulkUploadModal from './UploadModal';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openBulkUpload, setOpenBulkUpload] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/users');
      console.log('Fetched users:', res.data); // 🧪 Debug: check response
      setUsers(res.data?.users || []); // Protect in case "users" is missing
    } catch (err) {
      console.error('Failed to fetch users:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenCreate = () => {
    setSelectedUser(null);
    setOpenForm(true);
  };

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedUser(null);
  };

  return (
    <Box gap={2} mb={2} alignItems="center">
      <Typography variant="h5" mb={2}>
        User Management
      </Typography>
      <Box display="flex" gap={2}>
        <Button variant="contained" onClick={handleOpenCreate}>
          CREATE A USER
        </Button>
        <Button variant="contained" onClick={() => setOpenBulkUpload(true)}>
          UPLOAD CSV
        </Button>
      </Box>
      <Paper>
        {users.length === 0 ? (
          <Typography p={2}>No users found.</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.user_id}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" onClick={() => handleOpenEdit(user)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      <UserFormModal
        open={openForm}
        handleClose={handleCloseForm}
        refreshUsers={fetchUsers}
        user={selectedUser}
      />

      <BulkUploadModal
        open={openBulkUpload}
        handleClose={() => setOpenBulkUpload(false)}
        refreshUsers={fetchUsers}
      />
    </Box>
  );
};

export default UserManagement;

// src/pages/business/UserManagement.jsx
import React, { useState } from 'react';
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, IconButton, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const initialUsers = [
  { id: 1, name: 'Joe', email: 'joe@email.com', phone: '0123456789', role: 'Admin', school: 'Greenwood Elementary' },
  { id: 2, name: 'Kay', email: 'kay@email.com', phone: '0123456789', role: 'Admin', school: 'Maple Ridge Academy' },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleOpen = (user = null) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setOpenDialog(false);
  };

  const handleSave = () => {
    if (selectedUser.id) {
      setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
    } else {
      setUsers([...users, { ...selectedUser, id: Date.now() }]);
    }
    handleClose();
  };

  const handleDelete = () => {
    setUsers(users.filter(u => u.id !== selectedUser.id));
    setDeleteConfirm(false);
    setSelectedUser(null);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" mb={2}>User Management</Typography>
      <Button variant="contained" onClick={() => handleOpen({})}>Create User</Button>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>School</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.school}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.phone}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(u)}><Edit /></IconButton>
                  <IconButton onClick={() => { setSelectedUser(u); setDeleteConfirm(true); }}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{selectedUser?.id ? 'Edit User' : 'Create a New User'}</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="School Name" value={selectedUser?.school || ''} onChange={(e) => setSelectedUser({ ...selectedUser, school: e.target.value })} />
          <TextField fullWidth margin="dense" label="Name" value={selectedUser?.name || ''} onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} />
          <TextField fullWidth margin="dense" label="Email" value={selectedUser?.email || ''} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
          <TextField fullWidth margin="dense" label="Phone" value={selectedUser?.phone || ''} onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })} />
          <TextField fullWidth margin="dense" label="Role" value={selectedUser?.role || ''} onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to <span style={{ color: 'red' }}>delete</span> this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(false)}>No</Button>
          <Button onClick={handleDelete} color="error">Yes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;

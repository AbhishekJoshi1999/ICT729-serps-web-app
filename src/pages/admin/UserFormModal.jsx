import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Grid, Checkbox, FormControlLabel, FormGroup, Typography
} from '@mui/material';
import axios from '../../utils/axios';

const roles = ['Admin', 'Teacher', 'Student'];
const genders = ['Male', 'Female', 'Other'];
const statuses = ['Active', 'Inactive'];
const permissionOptions = ['read', 'write', 'delete'];

const UserFormModal = ({ open, handleClose, refreshUsers, user }) => {
  const isEdit = !!user;

  const [formData, setFormData] = useState({
    user_id: '',
    fullName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    role: '',
    status: 'active',
    address: '',
    permissions: [],
  });

  useEffect(() => {
    if (user) {
      setFormData({
        user_id: user.user_id || '',
        fullName: user.fullName || '',
        username: user.username || '',
        email: user.email || '',
        password: '', // Don't prefill password
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth?.substring(0, 10) || '',
        gender: user.gender || '',
        role: user.role || '',
        status: user.status || 'active',
        address: user.address || '',
        permissions: user.permissions || [],
      });
    } else {
      setFormData({
        user_id: '',
        fullName: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        role: '',
        status: 'active',
        address: '',
        permissions: [],
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (perm) => {
    setFormData((prev) => {
      const current = prev.permissions || [];
      const updated = current.includes(perm)
        ? current.filter((p) => p !== perm)
        : [...current, perm];
      return { ...prev, permissions: updated };
    });
  };

  const handleSave = async () => {
    try {
      const payload = {
        user_id: formData.user_id,
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender.toLowerCase(),
        role: formData.role.toLowerCase(),
        status: formData.status.toLowerCase(),
        address: formData.address,
        permissions: formData.permissions,
      };

      if (isEdit) {
        await axios.put(`/users/${user._id}`, payload);
      } else {
        await axios.post('/users/createUser', payload);
      }

      refreshUsers();
      handleClose();
    } catch (err) {
      console.error('Failed to save user:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Error saving user.');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? 'Edit User' : 'Create a New User'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <TextField name="user_id" label="User ID" value={formData.user_id} onChange={handleChange} fullWidth disabled={isEdit} />
          </Grid>
          <Grid item xs={6}>
            <TextField name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField name="username" label="Username" value={formData.username} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField name="email" label="Email" value={formData.email} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required={!isEdit}
              placeholder={isEdit ? 'Leave blank to keep unchanged' : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField name="phone" label="Phone Number" value={formData.phone} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              name="gender"
              label="Gender"
              value={formData.gender}
              onChange={handleChange}
              fullWidth
              sx={{ minWidth: 80 }}
            >
              {genders.map((g) => (
                <MenuItem key={g} value={g}>{g}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              name="role"
              label="Role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              sx={{ minWidth: 80 }}
            >
              {roles.map((r) => (
                <MenuItem key={r} value={r}>{r}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              name="status"
              label="Status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
              sx={{ minWidth: 80 }}
            >
              {statuses.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: 600 }}>Permissions:</Typography>
            <FormGroup row>
              {permissionOptions.map((perm) => (
                <FormControlLabel
                  key={perm}
                  control={
                    <Checkbox
                      checked={formData.permissions?.includes(perm)}
                      onChange={() => handlePermissionChange(perm)}
                    />
                  }
                  label={perm}
                />
              ))}
            </FormGroup>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button variant="contained" onClick={handleSave}>
          {isEdit ? 'Save Changes' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormModal;

// src/pages/admin/UnitFormModal.jsx
import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Grid, MenuItem
} from '@mui/material';
import axios from '../../utils/axios';

const semesters = ['Semester 1', 'Semester 2'];
const years = ['2024', '2025'];

const UnitFormModal = ({ open, handleClose, unit, refresh }) => {
    const isEdit = Boolean(unit);
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        course: '',
        year: '',
        semester: ''
    });

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get('/course/getAllCourse');
                setCourses(res.data.data);
            } catch (err) {
                console.error('Failed to load courses:', err);
            }
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        if (isEdit) {
            setFormData({
                name: unit.name || '',
                course: unit.course?._id || '',
                year: unit.year || '',
                semester: unit.semester || ''
            });
        } else {
            setFormData({ name: '', course: '', year: '', semester: '' });
        }
    }, [unit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (isEdit) {
                await axios.put(`/unit/${unit._id}`, formData);
            } else {
                await axios.post('/unit/createUnit', formData);
            }
            refresh();
            handleClose();
        } catch (err) {
            console.error('Error saving unit:', err);
            alert(err.response?.data?.message || 'Failed to save unit');
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEdit ? 'Edit Unit' : 'Create Unit'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Unit Name"
                            name="name"
                            fullWidth
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Credits"
                            name="credits"
                            fullWidth
                            value={formData.credits}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Year"
                            name="year"
                            fullWidth
                            value={formData.year}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            select
                            label="Semester"
                            name="semester"
                            fullWidth
                            value={formData.semester}
                            onChange={handleChange}
                            sx={{ minWidth: '195px' }}
                        >
                            <MenuItem value="1">Semester I</MenuItem>
                            <MenuItem value="2">Semester II</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button variant="contained" onClick={handleSubmit}>
                    {isEdit ? 'Save Changes' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UnitFormModal;

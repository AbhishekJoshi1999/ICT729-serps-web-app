import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper,
    TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from '../../utils/axios';

const semesters = [
    { label: 'Semester I', value: 1 },
    { label: 'Semester II', value: 2 }
];

const years = [2024, 2025];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const ClassManagement = () => {
    const [classes, setClasses] = useState([]);
    const [units, setUnits] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [openModal, setOpenModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);

    const [formData, setFormData] = useState({
        year: 2025,
        semester: 1,
        unitId: '',
        className: '',
        quantity: '',
        lecture: '',
        scheduleDay: '',
        scheduleTime: ''
    });

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [classRes, unitRes, lecturerRes] = await Promise.all([
                    axios.get('/class/getAllClass'),
                    axios.get('/unit/getAllUnits'),
                    axios.get('/users/getAllTeacher')
                ]);

                setClasses(classRes.data?.data || []);
                setUnits(unitRes.data?.data || []);
                setLecturers(lecturerRes.data?.teachers || []);
            } catch (err) {
                console.error('Fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const getUnitName = (id) => units.find(u => u._id === id)?.name || 'N/A';
    const getLecturerName = (id) => lecturers.find(l => l._id === id)?.fullName || 'N/A';

    const handleOpenModal = (cls = null) => {
        setEditMode(!!cls);
        setSelectedClass(cls);

        if (cls) {
            const schedule = cls.schedule[0] || {};

            // ✅ Check if the unit ID is valid before setting it
            const validUnitId = units.some(u => u._id === cls.unitId) ? cls.unitId : '';

            // ✅ Check if the lecturer ID is valid before setting it
            const validLecturerId = lecturers.some(l => l._id === cls.lecture) ? cls.lecture : '';
            setFormData({
                year: cls.year,
                semester: cls.semester,
                unitId: cls.unitId,
                className: cls.className,
                quantity: cls.quantity,
                lecture: cls.lecture,
                scheduleDay: schedule.day || '',
                scheduleTime: schedule.time || ''
            });
        } else {
            setFormData({
                year: 2025,
                semester: 1,
                unitId: '',
                className: '',
                quantity: '',
                lecture: '',
                scheduleDay: '',
                scheduleTime: ''
            });
        }
        setOpenModal(true);
    };

    const handleSave = async () => {
        const payload = {
            year: formData.year,
            semester: formData.semester,
            unitId: formData.unitId,
            className: formData.className,
            quantity: parseInt(formData.quantity),
            lecture: formData.lecture,
            schedule: [{ day: formData.scheduleDay, time: formData.scheduleTime }]
        };

        try {
            if (editMode) {
                await axios.put(`/class/update/${selectedClass._id}`, payload);
            } else {
                await axios.post('/class/create', payload);
            }
            setOpenModal(false);
            const res = await axios.get('/class/getAllClass');
            setClasses(res.data?.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/class/delete/${selectedClass._id}`);
            setOpenDelete(false);
            const res = await axios.get('/class/getAllClass');
            setClasses(res.data?.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box p={3}>
            <Typography variant="h5" mb={2}>Class Management</Typography>
            <Button variant="contained" onClick={() => handleOpenModal()}>Create New Class</Button>

            {isLoading ? (
                <Typography mt={2}>Loading class data...</Typography>
            ) : (
                <Paper sx={{ mt: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Class Name</TableCell>
                                <TableCell>Unit</TableCell>
                                <TableCell>Lecturer</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {classes.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No class found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                classes.map((cls, index) => (
                                    <TableRow key={cls._id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{cls.className}</TableCell>
                                        <TableCell>{getUnitName(cls.unitId)}</TableCell>
                                        <TableCell>{getLecturerName(cls.lecture)}</TableCell>
                                        <TableCell>{cls.quantity}</TableCell>
                                        <TableCell>
                                            <Button color="warning" onClick={() => handleOpenModal(cls)} startIcon={<Edit />}>Edit</Button>
                                            <Button color="error" onClick={() => { setSelectedClass(cls); setOpenDelete(true); }} startIcon={<Delete />}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            )}

            {/* Create/Edit Modal */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth>
                <DialogTitle>{editMode ? 'Edit Class' : 'Create New Class'}</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2} mt={1}>
                        <TextField select label="Year" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })}>
                            {years.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
                        </TextField>
                        <TextField select label="Semester" value={formData.semester} onChange={e => setFormData({ ...formData, semester: e.target.value })}>
                            {semesters.map(s => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
                        </TextField>
                        <TextField select label="Unit" value={formData.unitId} onChange={e => setFormData({ ...formData, unitId: e.target.value })}>
                            {units.map(unit => <MenuItem key={unit._id} value={unit._id}>{unit.name}</MenuItem>)}
                        </TextField>
                        <TextField label="Class Name" value={formData.className} onChange={e => setFormData({ ...formData, className: e.target.value })} />
                        <TextField label="Quantity" type="number" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })} />
                        <TextField select label="Lecturer" value={formData.lecture} onChange={e => setFormData({ ...formData, lecture: e.target.value })}>
                            {lecturers.map(lec => <MenuItem key={lec._id} value={lec._id}>{lec.fullName}</MenuItem>)}
                        </TextField>
                        <TextField select label="Schedule Day" value={formData.scheduleDay} onChange={e => setFormData({ ...formData, scheduleDay: e.target.value })}>
                            {days.map(day => <MenuItem key={day} value={day}>{day}</MenuItem>)}
                        </TextField>
                        <TextField label="Schedule Time (e.g., 08:00 AM - 10:00 AM)" value={formData.scheduleTime} onChange={e => setFormData({ ...formData, scheduleTime: e.target.value })} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)}>Close</Button>
                    <Button variant="contained" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                <DialogTitle>Warning</DialogTitle>
                <DialogContent>Are you sure you want to <span style={{ color: 'red' }}>delete</span> this class?</DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleDelete}>Yes</Button>
                    <Button onClick={() => setOpenDelete(false)}>No</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ClassManagement;

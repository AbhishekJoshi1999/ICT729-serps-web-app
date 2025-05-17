import axios from '../utils/axios';

export const fetchAssignments = async () => {
  try {
    const res = await axios.get('/assignments');
    return res.data.data || [];
  } catch (err) {
    console.error('Fetch assignments error:', err.response?.data || err.message);
    return [];
  }
};

export const createAssignment = async (formData) => {
  try {
    const payload = {
      title: formData.title,
      unitId: formData.unit, // ensure this is an ID
      startDay: new Date().toISOString(),
      deadline: new Date(formData.dueDate).toISOString(),
      maxMarks: 100,
      marks: 0,
      submissions: [], // will be filled later
    };

    const res = await axios.post('/assignments', payload);
    return res.data;
  } catch (err) {
    console.error('Create assignment error:', err.response?.data || err.message);
    throw err;
  }
};

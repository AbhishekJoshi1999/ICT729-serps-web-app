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
      description: formData.description,
      unitId: formData.unitId,
      startDay: new Date(formData.startDay).toISOString(),
      deadline: new Date(formData.deadline).toISOString(),
      maxMarks: parseInt(formData.maxMarks, 10),
      marks: 0,
      submissions: [
        {
          classId: formData.classId,
        },
      ],
    };

    const res = await axios.post('/assignments', payload);
    return res.data;
  } catch (err) {
    console.error('Create assignment error:', err.response?.data || err.message);
    throw err;
  }
};

export const updateAssignment = async (id, formData) => {
  try {
    const payload = {
      title: formData.title,
      description: formData.description,
      unitId: formData.unitId,
      startDay: new Date(formData.startDay).toISOString(),
      deadline: new Date(formData.deadline).toISOString(),
      maxMarks: parseInt(formData.maxMarks, 10),
      submissions: [
        {
          classId: formData.classId,
        },
      ],
    };

    const res = await axios.put(`/assignments/${id}`, payload);
    return res.data;
  } catch (err) {
    console.error('Update assignment error:', err.response?.data || err.message);
    throw err;
  }
};

export const deleteAssignment = async (id) => {
  try {
    const res = await axios.delete(`/assignments/${id}`);
    return res.data;
  } catch (err) {
    console.error('Delete assignment error:', err.response?.data || err.message);
    throw err;
  }
};

import React from 'react';
import { Box, Select, MenuItem } from '@mui/material';

const FiltersBar = ({ year, semester, unit, onChange }) => {
  return (
    <Box display="flex" gap={2} mb={3}>
      <Select value={year} onChange={(e) => onChange('year', e.target.value)}>
        <MenuItem value="2024">2024</MenuItem>
        <MenuItem value="2025">2025</MenuItem>
      </Select>

      <Select value={semester} onChange={(e) => onChange('semester', e.target.value)}>
        <MenuItem value="Semester I">Semester I</MenuItem>
        <MenuItem value="Semester II">Semester II</MenuItem>
      </Select>

      <Select value={unit} onChange={(e) => onChange('unit', e.target.value)}>
        <MenuItem value="All Units">All Units</MenuItem>
        <MenuItem value="DSA">DSA</MenuItem>
        <MenuItem value="AI">AI</MenuItem>
      </Select>
    </Box>
  );
};

export default FiltersBar;

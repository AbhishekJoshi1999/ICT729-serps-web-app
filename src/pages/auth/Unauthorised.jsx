// src/pages/auth/Unauthorized.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './Unauthorized.css';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <h1>Unauthorized Access</h1>
      <p>You don't have permission to view this page.</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
};

export default Unauthorized;
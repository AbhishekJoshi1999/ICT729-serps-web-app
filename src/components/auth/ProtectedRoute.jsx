// import { useAuth } from '../../contexts/AuthContext';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { user } = useAuth();

//   if (!user) {
//     console.warn('🔐 Redirecting to login');
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     console.warn(`⛔ Role ${user.role} not allowed`);
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

// src/routes/ProtectedRoute.jsx
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    console.warn('🔐 No user logged in – redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  // Logged in but role not allowed
  if (allowedRoles.length && !allowedRoles.includes(user.role?.toLowerCase())) {
    console.warn(`⛔ Role "${user.role}" not allowed for this route`);
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

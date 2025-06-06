import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Login from './pages/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import Unauthorized from './pages/auth/Unauthorised';

import AdminDashboard from './pages/admin/Dashboard';
import AdminLayout from './layouts/AdminLayout';
import AdminUserManagement from './pages/admin/AdminUserManagement';
import CourseManagement from './pages/admin/CourseManagement';
import UnitManagement from './pages/admin/UnitManagement';
import ClassManagement from './pages/admin/ClassManagement';
import Configuration from './pages/admin/Configuration';
import AdminSettings from './pages/admin/AdminSettings';

import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherLayout from './layouts/TeacherLayout';
import CreateAssignment from './pages/teacher/CreateAssignment';
import AssignmentTracker from './pages/teacher/AssignmentTracker';
import GradeAssignment from './pages/teacher/GradeAssignment';
import ListResource from './pages/teacher/ListResource';
import Attendance from './pages/teacher/Attendance';
import Report from './pages/teacher/Report';
import TeacherSettings from './pages/teacher/TeacherSettings';
import TeacherNotifications from './pages/teacher/TeacherNotifications';

import StudentDashboard from './pages/student/StudentDashboard';
import StudentLayout from './layouts/StudentLayout';
import StudentAttendance from './pages/student/StudentAttendance';
import StudentGrades from './pages/student/StudentGrades';
import StudentResources from './pages/student/StudentResources';
import StudentSettings from './pages/student/StudentSettings';
import StudentNotifications from './pages/student/StudentNotifications';

import BusinessDashboard from './pages/business/Dashboard';
import UserManagement from './pages/business/UserManagement';
import Settings from './pages/business/Settings';
import BusinessLayout from './layouts/BusinessLayout';

// Protected Route Wrapper
import ProtectedRoute from './components/auth/ProtectedRoute';


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUserManagement />} />
        <Route path="/admin/courses" element={<CourseManagement />} />
        <Route path="/admin/units" element={<UnitManagement />} />
        <Route path="/admin/classes" element={<ClassManagement />} />
        <Route path="configuration" element={<Configuration />} />
        <Route path="settings" element={<AdminSettings />} />
        {/* Add more nested admin pages later */}
      </Route>

      <Route path="/teacher" element={<TeacherLayout />}>
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="assignments/create" element={<CreateAssignment />} />
        <Route path="assignments/track" element={<AssignmentTracker />} />
        <Route path="assignments/grade" element={<GradeAssignment />} />
        <Route path="upload/resources" element={<ListResource />} />
        <Route path="upload/attendance" element={<Attendance />} />
        <Route path="report" element={<Report />} />
        <Route path="settings" element={<TeacherSettings />} />
        <Route path="notifications" element={<TeacherNotifications />} />
      </Route>

      <Route path="/student" element={<StudentLayout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="grades" element={<StudentGrades />} />
        <Route path="resources" element={<StudentResources />} />
        <Route path="settings" element={<StudentSettings />} />
        <Route path="notifications" element={<StudentNotifications />} />
      </Route>


      {/* Business (Nested layout with Sidebar + Header) */}
      <Route element={<ProtectedRoute allowedRoles={['business client']} />}>
        <Route path="/business" element={<BusinessLayout />}>
          <Route path="dashboard" element={<BusinessDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;

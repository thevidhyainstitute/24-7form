import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Make sure to install jwt-decode

const ProtectedRoute = ({ allowedRoles, redirectPath = '/login', isLoginPage = false }) => {
  // Check if token exists in local storage
  const token = localStorage.getItem('token');

  // If no token exists
  if (!token) {
    // If it's not a login page, redirect to login
    return isLoginPage ? <Outlet /> : <Navigate to={redirectPath} replace />;
  }

  try {
    // Decode the token to check user details
    const decoded = jwtDecode(token);
    
    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return <Navigate to={redirectPath} replace />;
    }

    // If it's a login page and user is logged in, redirect to appropriate dashboard
    if (isLoginPage) {
      // Customize dashboard route based on user role
      const dashboardRoute = decoded.role === 'admin' ? '/admin-dashboard' : '/technician-dashboard';
      return <Navigate to={dashboardRoute} replace />;
    }

    // If roles are specified, check if user has allowed role
    if (allowedRoles && !allowedRoles.includes(decoded.role)) {
      return <Navigate to={redirectPath} replace />;
    }

    // If all checks pass, render the child routes
    return <Outlet />;

  } catch (error) {
    // If token is invalid
    localStorage.removeItem('token');
    return <Navigate to={redirectPath} replace />;
  }
};

export default ProtectedRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCustomAuth } from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return isAuthenticated && isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user.currentUser);

  if (!user) {
    // If no user, redirect to login
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole'); // o donde guardes el rol

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si se requiere un rol específico y no coincide, redirigir
  if (requiredRole && userRole !== requiredRole) {
    // Si es admin intentando acceder a ruta de usuario, redirigir a admin
    if (userRole === 'admin') {
      return <Navigate to="/admin/pqrs" replace />;
    }
    // Si es usuario intentando acceder a ruta de admin, redirigir a usuario
    return <Navigate to="/pqrs" replace />;
  }

  return children;
};

export default ProtectedRoute;
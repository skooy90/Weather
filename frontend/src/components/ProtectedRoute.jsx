import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    // 관리자 권한이 필요한 페이지에 일반 사용자가 접근한 경우
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 
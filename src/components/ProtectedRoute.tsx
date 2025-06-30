// components/ProtectedRoute.tsx
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { authService } from '../services/api/authService';

const ProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/auth');
    }
  }, [navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
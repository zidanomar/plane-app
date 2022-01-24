import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import * as api from '../../api';

function AdminRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/auth');
    }

    const getAdminUser = async () => {
      try {
        await api.getAdmin();
      } catch (error) {
        navigate('/');
      }
    };

    getAdminUser();
  }, [navigate]);

  return localStorage.getItem('authToken') ? children : <Navigate to='/' />;
}

export default AdminRoute;

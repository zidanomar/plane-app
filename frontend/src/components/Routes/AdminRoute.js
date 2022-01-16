import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import * as api from '../../api';

function AdminRoute({ children }) {
  const navigate = useNavigate();

  useState(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/auth');
    }

    const getAdminUser = async () => {
      try {
        await api.getAdmin();
      } catch (error) {
        localStorage.removeItem('authToken');
        navigate('/');
      }
    };

    getAdminUser();
  }, []);

  return localStorage.getItem('authToken') ? children : <Navigate to='/' />;
}

export default AdminRoute;

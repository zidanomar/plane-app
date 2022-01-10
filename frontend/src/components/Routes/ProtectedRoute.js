import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as api from '../../api';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login');
    }

    const getAuthentication = async () => {
      try {
        await api.getAuth();
      } catch (error) {
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    };

    getAuthentication();
  }, [dispatch, navigate]);

  return localStorage.getItem('authToken') ? (
    children
  ) : (
    <Navigate to='/login' />
  );
}

export default ProtectedRoute;

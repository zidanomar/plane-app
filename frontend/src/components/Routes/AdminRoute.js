import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import * as api from '../../api';
import { logout } from '../../flux/actions/authAction';

function AdminRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/auth');
    }

    const getAdminUser = async () => {
      try {
        await api.getAdmin();
      } catch (error) {
        localStorage.removeItem('authToken');
        dispatch(logout(navigate));
      }
    };

    getAdminUser();
  }, [dispatch, navigate]);

  return localStorage.getItem('authToken') ? children : <Navigate to='/' />;
}

export default AdminRoute;

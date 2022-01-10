import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth } from '../flux/actions/authAction';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login');
    }

    const getAuthentication = async () => {
      try {
        dispatch(getAuth(navigate));
        console.log('dispatch');
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

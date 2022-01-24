import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import * as api from '../../api';

function CompanyRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/auth');
    }

    const getCompanyUser = async () => {
      try {
        await api.getCompanyUser();
      } catch (error) {
        navigate('/');
      }
    };

    getCompanyUser();
  }, [navigate]);

  return localStorage.getItem('authToken') ? children : <Navigate to='/' />;
}

export default CompanyRoute;

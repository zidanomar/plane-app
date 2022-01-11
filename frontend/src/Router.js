import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Playground from './pages/Customer/Playground/Playground';
import Test from './pages/Admin/Test';
import { Admin, Customer, Flight, Home, Login, Plane, Register } from './pages';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import { Container } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { getAuth } from './flux/actions/authAction';
import App from './App';

function Router() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAuthentication = async () => {
      try {
        dispatch(getAuth());
      } catch (error) {
        localStorage.removeItem('authToken');
      }
    };

    getAuthentication();
  }, [dispatch]);
  return (
    <Container maxW='container.xl'>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route
            path='plane'
            element={
              <ProtectedRoute>
                <Plane />
              </ProtectedRoute>
            }
          />
          <Route
            path='customer'
            element={
              <ProtectedRoute>
                <Customer />
              </ProtectedRoute>
            }
          />
          <Route
            path='flight'
            element={
              <ProtectedRoute>
                <Flight />
              </ProtectedRoute>
            }
          />

          <Route path='playground' element={<Playground />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='admin' element={<Admin />}>
            <Route index element={<Test />} />
          </Route>
        </Route>
      </Routes>
    </Container>
  );
}

export default Router;

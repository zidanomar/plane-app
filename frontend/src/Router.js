import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Playground from './pages/Customer/Playground/Playground';
import ErrorDialog from './components/Dialog/ErrorDialog';
import { Customer, Flight, Home, Login, Plane, Register } from './pages';
import ProtectedRoute from './components/ProtectedRoute';
import { Container } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { getAuth } from './flux/actions/authAction';

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
    <BrowserRouter>
      <Header />
      <ErrorDialog />
      <Container maxW='container.xl'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route
            exact
            path='/plane'
            element={
              <ProtectedRoute>
                <Plane />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/customer'
            element={
              <ProtectedRoute>
                <Customer />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/flight'
            element={
              <ProtectedRoute>
                <Flight />
              </ProtectedRoute>
            }
          />
          <Route exact path='/playground' element={<Playground />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default Router;

import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Test from './pages/Admin/Test';
import {
  Admin,
  AdminCustomer,
  AdminFlight,
  AdminPlane,
  AuthLayout,
  Companies,
  Company,
  Flight,
  Flights,
  Home,
  Login,
  PageLayout,
  PlaneDetail,
  Planes,
  Register,
} from './pages';
import { useDispatch } from 'react-redux';
import { getAuth } from './flux/actions/authAction';
import App from './App';
import AdminRoute from './components/Routes/AdminRoute';
import NotFound from './components/NotFound';

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
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />

        <Route path='planes' element={<PageLayout />}>
          <Route index element={<Planes />} />
          <Route path=':planeId' element={<PlaneDetail />} />
        </Route>

        <Route path='companies' element={<PageLayout />}>
          <Route index element={<Companies />} />
          <Route path=':companyId' element={<Company />} />
        </Route>

        <Route path='flights' element={<PageLayout />}>
          <Route index element={<Flights />} />
          <Route path=':flightId' element={<Flight />} />
        </Route>

        <Route path='/auth' element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        <Route path='admin' element={<Admin />}>
          <Route index element={<Test />} />

          <Route
            path='planes'
            element={
              <AdminRoute>
                <AdminPlane />
              </AdminRoute>
            }
          />

          <Route
            path='companies'
            element={
              <AdminRoute>
                <AdminCustomer />
              </AdminRoute>
            }
          />

          <Route
            path='flights'
            element={
              <AdminRoute>
                <AdminFlight />
              </AdminRoute>
            }
          />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Router;

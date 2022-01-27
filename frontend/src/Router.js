import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import App from './App';
import {
  Admin,
  AdminCompany,
  AdminFlight,
  AdminHome,
  AdminPlane,
  AdminUser,
  AuthLayout,
  Companies,
  Company,
  CompanyProfile,
  CompanyProfileHome,
  CompanyProfileSettings,
  FlightDetail,
  Flights,
  Home,
  Login,
  PageLayout,
  PlaneDetail,
  Planes,
  Register,
  UserProfile,
  UserProfileHome,
} from './pages';
import { getAuth } from './flux/actions/authAction';
import AdminRoute from './components/Routes/AdminRoute';
import NotFound from './components/NotFound';
import ScrollToTop from './components/ScrollToTop';
import CompanyRoute from './components/Routes/CompanyRoute';
import ProtectedRoute from './components/Routes/ProtectedRoute';

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
    <ScrollToTop>
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
            <Route path=':flightId' element={<FlightDetail />} />
          </Route>

          <Route path='/auth' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>

          <Route path='admin' element={<Admin />}>
            <Route
              index
              element={
                <AdminRoute>
                  <AdminHome />
                </AdminRoute>
              }
            />

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
                  <AdminCompany />
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

            <Route
              path='users'
              element={
                <AdminRoute>
                  <AdminUser />
                </AdminRoute>
              }
            />
          </Route>

          <Route path='userprofile' element={<UserProfile />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <UserProfileHome />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path='companyprofile' element={<CompanyProfile />}>
            <Route
              index
              element={
                <CompanyRoute>
                  <CompanyProfileHome />
                </CompanyRoute>
              }
            />

            <Route
              path='settings'
              element={
                <CompanyRoute>
                  <CompanyProfileSettings />
                </CompanyRoute>
              }
            />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </ScrollToTop>
  );
}

export default Router;

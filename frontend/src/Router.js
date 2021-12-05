import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import { Plane } from './pages/Plane';
import { Customer } from './pages/Customer';
import { Flight } from './pages/Flight';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <div className='p-5'>
        <Routes>
          <Route exact path='/' element={<Plane />} />
          <Route exact path='/customer' element={<Customer />} />
          <Route exact path='/flight' element={<Flight />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Router;

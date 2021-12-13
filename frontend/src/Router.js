import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import { Plane } from './pages/Plane';
import { Customer } from './pages/Customer';
import { Flight } from './pages/Flight';
import Playground from './pages/Customer/Playground/Playground';
import ErrorDialog from './components/Dialog/ErrorDialog';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <ErrorDialog />
      <div className='p-5'>
        <Routes>
          <Route exact path='/' element={<Plane />} />
          <Route exact path='/customer' element={<Customer />} />
          <Route exact path='/flight' element={<Flight />} />
          <Route exact path='/playground' element={<Playground />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Router;

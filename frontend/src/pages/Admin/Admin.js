import React from 'react';
import {
  MdAccountCircle,
  MdFlight,
  MdFlightTakeoff,
  MdAdminPanelSettings,
} from 'react-icons/md';
import Dashboard from '../../components/Dashboard';

const lists = [
  {
    to: '/admin',
    name: 'Admin',
    icon: MdAdminPanelSettings,
  },
  {
    to: '/admin/planes',
    name: 'Plane',
    icon: MdFlight,
  },
  {
    to: '/admin/companies',
    name: 'Company',
    icon: MdFlight,
  },
  {
    to: '/admin/flights',
    name: 'Flight',
    icon: MdFlightTakeoff,
  },
  {
    to: '/admin/users',
    name: 'Users',
    icon: MdAccountCircle,
  },
];

function Admin() {
  return <Dashboard links={lists} />;
}

export default Admin;

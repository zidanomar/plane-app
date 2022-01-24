import React from 'react';
import { MdAccountCircle, MdFlight, MdFlightTakeoff } from 'react-icons/md';
import Dashboard from '../../../components/Dashboard';

const lists = [
  {
    to: '/admin',
    name: 'Admin',
    icon: MdAccountCircle,
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
];

function UserProfile() {
  return <Dashboard links={lists} />;
}

export default UserProfile;

import React from 'react';
import { MdAccountCircle } from 'react-icons/md';
import Dashboard from '../../../components/Dashboard';

const lists = [
  {
    to: '/userprofile',
    name: 'Profile',
    icon: MdAccountCircle,
  },
];

function UserProfile() {
  return <Dashboard links={lists} />;
}

export default UserProfile;

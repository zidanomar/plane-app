import React from 'react';
import { MdAccountCircle, MdSettings } from 'react-icons/md';
import Dashboard from '../../../components/Dashboard';

const lists = [
  {
    to: '/companyprofile',
    name: 'Company',
    icon: MdAccountCircle,
  },
  {
    to: '/companyprofile/settings',
    name: 'Settings',
    icon: MdSettings,
  },
];

function CompanyProfile() {
  return <Dashboard links={lists} />;
}

export default CompanyProfile;

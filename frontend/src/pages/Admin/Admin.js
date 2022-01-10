import { HStack } from '@chakra-ui/react';
import React from 'react';
import Sidebar from '../../components/Sidebar';

function Admin() {
  return (
    <HStack width='full' flex={1} overflow='hidden'>
      <Sidebar />
      {/* <Routes>
        <Route exact path='/admin/test' element={<Test />} />
      </Routes> */}
    </HStack>
  );
}

export default Admin;

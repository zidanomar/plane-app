import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Badge } from '@chakra-ui/react';

import { getAllUser, updateUser } from '../../../flux/actions/userAction';
import {
  LeftToolbarTemplate,
  DataTableHeader,
} from '../../../components/DataTableTemplate';
import { getAllCompany } from '../../../flux/actions/companyAction';
import UserDialog from './UserDialog';

function User() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);
  const companies = useSelector((state) => state.company.companies);
  const isLoading = useSelector((state) => state.user.isLoading);

  const dt = useRef(null);
  const toast = useRef(null);

  const [newUser, setNewUser] = useState({});
  const [dialog, setDialog] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({});

  const openUpdateDialog = (rowData) => {
    setSelectedCompany(rowData.company);
    setNewUser(rowData);
    setDialog(true);
  };

  const closeUpdateDialog = () => {
    setNewUser({});
    setDialog(false);
    setSelectedCompany({});
  };

  const onUserUpdate = () => {
    setNewUser({});
    setDialog(false);
    setSelectedCompany({});
    dispatch(updateUser(newUser.uuid, { companyId: selectedCompany.uuid }));
  };

  const onCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllCompany());
  }, [dispatch]);

  const companyBodyTemplate = (rowData) => {
    return rowData.company ? rowData.company.name : 'not affiliated';
  };

  const actionBodyTemplate = (rowData) => {
    if (rowData.auth.roleDetail.role === 'admin') {
      return (
        <Badge colorScheme='purple' padding={2}>
          admin
        </Badge>
      );
    } else {
      return (
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success p-mr-2'
          onClick={() => openUpdateDialog(rowData)}
        />
      );
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className='card'>
        <Toolbar
          className='p-mb-4'
          left={
            <LeftToolbarTemplate
            // onCreate={openAddNewCompany}
            // onDelete={openDeleteSelectedDialog}
            // disabled={!selectedCompany || !selectedCompany.length}
            />
          }
          // right={rightToolbarTemplate}
        ></Toolbar>
        <DataTable
          ref={dt}
          value={users}
          dataKey='uuid'
          paginator
          loading={isLoading}
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} products'
          header={<DataTableHeader title='Users' />}
          responsiveLayout='scroll'
        >
          <Column field='name' header='Name' />
          <Column field='surename' header='Surename' sortable />
          <Column filed='company' header='Company' body={companyBodyTemplate} />
          <Column field='email' header='Email' />
          <Column
            header='Actions'
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: '8rem' }}
          />
        </DataTable>
      </div>
      <UserDialog
        visible={dialog}
        companies={companies}
        selectedCompany={selectedCompany}
        onClose={closeUpdateDialog}
        onCompanyChange={onCompanyChange}
        onConfirm={onUserUpdate}
      />
    </div>
  );
}

export { User };

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActionBodyTemplate,
  DataTableHeader,
  LeftToolbarTemplate,
} from '../../components/DataTableTemplate';
import DeleteDialog from '../../components/Dialog/DeleteDialog';

import {
  addNewCustomer as postNewCustomer,
  deleteCustomer,
  getAllCustomers,
  updateCustomer,
} from '../../flux/actions/customerAction';
import CustomerDialog from './CustomerDialog';

function Customer() {
  let emptyCustomer = {
    uuid: null,
    name: '',
    planes: [],
  };

  const dt = useRef(null);
  const toast = useRef(null);

  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);

  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [newCustomer, setNewCustomer] = useState(emptyCustomer);
  const [addNewCustomerDialog, setAddNewCustomerDialog] = useState(false);
  const [updateCustomerDialog, setUpdateCustomerDialog] = useState(false);
  const [deleteCustomerDialog, setDeleteCustomerDialog] = useState(false);

  useEffect(() => {
    dispatch(getAllCustomers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // INPUT HANDLERS
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _customer = { ...newCustomer };
    _customer[`${name}`] = val;
    setNewCustomer(_customer);
  };
  // END INPUT HANDLERS

  // CREATE CUSTOMER FUNCTION
  const openAddNewCustomer = () => {
    setAddNewCustomerDialog(true);
  };

  const closeAddNewCustomer = () => {
    setAddNewCustomerDialog(false);
    setNewCustomer(emptyCustomer);
  };

  const onAddNewCustomer = () => {
    dispatch(postNewCustomer(newCustomer));
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: `Customer x has been added`,
      life: 3000,
    });
    setAddNewCustomerDialog(false);
    setNewCustomer(emptyCustomer);
  };
  // END CREATE CUSTOMER FUNCTION

  // UPDATE CUSTOMER FUNCTIONS
  const openUpdateCustomer = (rowData) => {
    setNewCustomer(rowData);
    setUpdateCustomerDialog(true);
  };

  const closeUpdateCustomer = () => {
    setUpdateCustomerDialog(false);
    setNewCustomer(emptyCustomer);
  };

  const onUpdateCustomer = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: `Customer x has been updated`,
      life: 3000,
    });
    dispatch(updateCustomer(newCustomer.uuid, newCustomer));
    setUpdateCustomerDialog(false);
    setNewCustomer(emptyCustomer);
  };

  // END UPDATE CUSTOMER FUNCTIONS

  // DELETE CUSTOMER FUNCTIONS
  const openDeleteCustomer = (rowData) => {
    setNewCustomer(rowData);
    setDeleteCustomerDialog(true);
  };

  const closeDeleteCustomer = () => {
    setDeleteCustomerDialog(false);
    setNewCustomer(emptyCustomer);
  };

  const onDeleteCustomer = () => {
    dispatch(deleteCustomer(newCustomer.uuid));
    toast.current.show({
      severity: 'warn',
      summary: 'Warning Message',
      detail: `Customer x has been deleted`,
      life: 3000,
    });
    setDeleteCustomerDialog(false);
    setNewCustomer(emptyCustomer);
  };
  // END DELETE CUSTOMER FUNCTIONS

  const customerActionBody = (rowData) => {
    return (
      <ActionBodyTemplate
        rowData={rowData}
        onEdit={openUpdateCustomer}
        onDelete={openDeleteCustomer}
      />
    );
  };

  const totalPlaneTemplate = (rowData) => {
    const length = rowData.planes.length;
    return length;
  };

  const deliveredPlaneTemplate = (rowData) => {
    const length = rowData.planes.filter((x) => x.isDelivered).length;

    return length;
  };

  const onProgressPlaneTemplate = (rowData) => {
    const length = rowData.planes.filter((x) => !x.isDelivered).length;

    return length;
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className='card'>
        <Toolbar
          className='p-mb-4'
          left={
            <LeftToolbarTemplate
              onCreate={openAddNewCustomer}
              onDelete={() => {}}
              disabled={!selectedCustomers || !setSelectedCustomers.length}
            />
          }
          // right={rightToolbarTemplate}
        ></Toolbar>
        <DataTable
          ref={dt}
          value={customer.customers}
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          dataKey='id'
          paginator
          loading={customer.isLoading}
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} products'
          globalFilter={globalFilter}
          header={
            <DataTableHeader
              setGlobalFilter={setGlobalFilter}
              title='Customers'
            />
          }
          responsiveLayout='scroll'
        >
          {/* <Column
            selectionMode='multiple'
            headerStyle={{ width: '3rem' }}
            exportable={false}
          ></Column> */}
          <Column field='name' header='Name' sortable />
          <Column
            field='planes'
            header='Total Planes'
            body={totalPlaneTemplate}
            sortable
          />
          <Column
            field='planes'
            header='Total Delivered Planes'
            body={deliveredPlaneTemplate}
            sortable
          />
          <Column
            field='planes'
            header='Total In Progress Planes'
            body={onProgressPlaneTemplate}
            sortable
          />
          <Column
            header='Actions'
            body={customerActionBody}
            exportable={false}
            style={{ minWidth: '8rem' }}
          />
        </DataTable>
      </div>
      <CustomerDialog
        visible={addNewCustomerDialog}
        submitted={false}
        onClose={closeAddNewCustomer}
        onConfirm={onAddNewCustomer}
        onInputChange={onInputChange}
      />
      <CustomerDialog
        visible={updateCustomerDialog}
        customer={newCustomer}
        submitted={true}
        onClose={closeUpdateCustomer}
        onConfirm={onUpdateCustomer}
        onInputChange={onInputChange}
      />
      <DeleteDialog
        visible={deleteCustomerDialog}
        item={newCustomer}
        onClose={closeDeleteCustomer}
        onConfirm={onDeleteCustomer}
      />
    </div>
  );
}

export default Customer;

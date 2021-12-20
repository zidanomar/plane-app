import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';

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
  const [deleteManyDialog, setDeleteManyDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
  // const openAddNewCustomer = useCallback(
  //   () => navigate('/customer/add'),
  //   [navigate]
  // );

  const openAddNewCustomer = () => {
    setAddNewCustomerDialog(true);
    setSubmitted(false);
  };

  const closeAddNewCustomer = () => {
    setAddNewCustomerDialog(false);
    setNewCustomer(emptyCustomer);
    setSubmitted(false);
  };

  const onAddNewCustomer = () => {
    setSubmitted(true);

    if (newCustomer.name.trim()) {
      dispatch(postNewCustomer(newCustomer));
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: `Customer x has been added`,
        life: 3000,
      });
      setAddNewCustomerDialog(false);
      setNewCustomer(emptyCustomer);
    }
  };
  // END CREATE CUSTOMER FUNCTION

  // UPDATE CUSTOMER FUNCTIONS
  const openUpdateCustomer = (rowData) => {
    setNewCustomer(rowData);
    setUpdateCustomerDialog(true);
    setSubmitted(false);
  };

  const closeUpdateCustomer = () => {
    setUpdateCustomerDialog(false);
    setNewCustomer(emptyCustomer);
    setSubmitted(false);
  };

  const onUpdateCustomer = () => {
    // update submitted
    setSubmitted(true);
    if (newCustomer.name.trim()) {
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: `Customer x has been updated`,
        life: 3000,
      });
      dispatch(updateCustomer(newCustomer.uuid, newCustomer));
      setUpdateCustomerDialog(false);
      setNewCustomer(emptyCustomer);
    }
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

  // DELETE SELECTED CUSTOMERS
  const openDeleteSelectedDialog = () => {
    setDeleteManyDialog(true);
  };

  const closeDeleteSelectedDialog = () => {
    setDeleteManyDialog(false);
  };

  const onDeleteSelected = () => {
    console.log(selectedCustomers);
    setDeleteManyDialog(false);
  };

  // END DELETE SELECTED CUSTOMERS

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
              onDelete={openDeleteSelectedDialog}
              disabled={!selectedCustomers || !selectedCustomers.length}
            />
          }
          // right={rightToolbarTemplate}
        ></Toolbar>
        <DataTable
          ref={dt}
          value={customer.customers}
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          dataKey='uuid'
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
          <Column
            selectionMode='multiple'
            headerStyle={{ width: '3rem' }}
            exportable={false}
          />
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
      {/* add */}
      <CustomerDialog
        visible={addNewCustomerDialog}
        submitted={submitted}
        onClose={closeAddNewCustomer}
        onConfirm={onAddNewCustomer}
        onInputChange={onInputChange}
      />
      {/* update */}
      <CustomerDialog
        visible={updateCustomerDialog}
        customer={newCustomer}
        submitted={submitted}
        onClose={closeUpdateCustomer}
        onConfirm={onUpdateCustomer}
        onInputChange={onInputChange}
      />
      {/* delete */}
      <DeleteDialog
        visible={deleteCustomerDialog}
        message={`are you sure want to delete ${
          newCustomer?.name ? newCustomer?.name : newCustomer?.uuid
        } ?`}
        onClose={closeDeleteCustomer}
        onConfirm={onDeleteCustomer}
      />
      {/* delete many */}
      <DeleteDialog
        visible={deleteManyDialog}
        item={selectedCustomers}
        message={`are you sure want to delete ${selectedCustomers?.length} ${
          selectedCustomers?.length > 1 ? 'items' : 'item'
        } ?`}
        onClose={closeDeleteSelectedDialog}
        onConfirm={onDeleteSelected}
      />
    </div>
  );
}

export default Customer;

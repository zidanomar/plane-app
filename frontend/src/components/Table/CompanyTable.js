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
} from '../DataTableTemplate';
import DeleteDialog from '../Dialog/DeleteDialog';
import {
  getAllCompany,
  addNewCompany,
  updateCompany,
  deleteManyCompany,
  deleteCompany,
} from '../../flux/actions/companyAction';
import CompanyDialog from '../Dialog/CompanyDialog';

function Company() {
  let emptyCompany = {
    uuid: null,
    name: '',
    planes: [],
  };

  const dt = useRef(null);
  const toast = useRef(null);

  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.companies);
  const isLoading = useSelector((state) => state.company.isLoading);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [newCompany, setNewCompany] = useState(emptyCompany);
  const [addNewCompanyDialog, setAddNewCompanyDialog] = useState(false);
  const [updateCompanyDialog, setUpdateCompanyDialog] = useState(false);
  const [deleteCompanyDialog, setDeleteCompanyDialog] = useState(false);

  const [deleteManyDialog, setDeleteManyDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getAllCompany());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // INPUT HANDLERS
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _company = { ...newCompany };
    _company[`${name}`] = val;
    setNewCompany(_company);
  };
  // END INPUT HANDLERS

  const openAddNewCompany = () => {
    setAddNewCompanyDialog(true);
    setSubmitted(false);
  };

  const closeAddNewCompany = () => {
    setAddNewCompanyDialog(false);
    setNewCompany(emptyCompany);
    setSubmitted(false);
  };

  const onAddNewCompany = () => {
    setSubmitted(true);

    if (newCompany.name.trim()) {
      dispatch(addNewCompany(newCompany));
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: `Customer x has been added`,
        life: 3000,
      });
      setAddNewCompanyDialog(false);
      setNewCompany(emptyCompany);
    }
  };
  // END CREATE CUSTOMER FUNCTION

  // UPDATE CUSTOMER FUNCTIONS
  const openUpdateCompany = (rowData) => {
    setNewCompany(rowData);
    setUpdateCompanyDialog(true);
    setSubmitted(false);
  };

  const closeUpdateCompany = () => {
    setUpdateCompanyDialog(false);
    setNewCompany(emptyCompany);
    setSubmitted(false);
  };

  const onUpdateCompany = () => {
    // update submitted
    setSubmitted(true);
    if (newCompany.name.trim()) {
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: `Customer x has been updated`,
        life: 3000,
      });
      dispatch(updateCompany(newCompany.uuid, newCompany));
      setUpdateCompanyDialog(false);
      setNewCompany(emptyCompany);
    }
  };

  // END UPDATE CUSTOMER FUNCTIONS

  // DELETE CUSTOMER FUNCTIONS
  const openDeleteCompany = (rowData) => {
    setNewCompany(rowData);
    setDeleteCompanyDialog(true);
  };

  const closeDeleteCompany = () => {
    setDeleteCompanyDialog(false);
    setNewCompany(emptyCompany);
  };

  const onDeleteCompany = () => {
    dispatch(deleteCompany(newCompany.uuid));
    toast.current.show({
      severity: 'warn',
      summary: 'Warning Message',
      detail: `Customer x has been deleted`,
      life: 3000,
    });
    setDeleteCompanyDialog(false);
    setNewCompany(emptyCompany);
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
    let uuids = [];
    selectedCompany.map((x) => uuids.push(x.uuid));

    dispatch(deleteManyCompany(uuids));
    toast.current.show({
      severity: 'warn',
      summary: 'Warning Message',
      detail: `${uuids.length} items has been deleted!`,
      life: 3000,
    });

    setSelectedCompany(null);
    setDeleteManyDialog(false);
  };

  // END DELETE SELECTED COMPANY

  const companyActionBody = (rowData) => {
    return (
      <ActionBodyTemplate
        rowData={rowData}
        onEdit={openUpdateCompany}
        onDelete={openDeleteCompany}
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
              onCreate={openAddNewCompany}
              onDelete={openDeleteSelectedDialog}
              disabled={!selectedCompany || !selectedCompany.length}
            />
          }
          // right={rightToolbarTemplate}
        ></Toolbar>
        <DataTable
          ref={dt}
          value={company}
          selection={selectedCompany}
          onSelectionChange={(e) => setSelectedCompany(e.value)}
          dataKey='uuid'
          paginator
          loading={isLoading}
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
            body={companyActionBody}
            exportable={false}
            style={{ minWidth: '8rem' }}
          />
        </DataTable>
      </div>
      {/* add */}
      <CompanyDialog
        visible={addNewCompanyDialog}
        submitted={submitted}
        onClose={closeAddNewCompany}
        onConfirm={onAddNewCompany}
        onInputChange={onInputChange}
      />

      {/* update */}
      <CompanyDialog
        visible={updateCompanyDialog}
        customer={newCompany}
        submitted={submitted}
        onClose={closeUpdateCompany}
        onConfirm={onUpdateCompany}
        onInputChange={onInputChange}
      />
      {/* delete */}
      <DeleteDialog
        visible={deleteCompanyDialog}
        message={`are you sure want to delete ${
          newCompany?.name ? newCompany?.name : newCompany?.uuid
        } ?`}
        onClose={closeDeleteCompany}
        onConfirm={onDeleteCompany}
      />
      {/* delete many */}
      <DeleteDialog
        visible={deleteManyDialog}
        item={selectedCompany}
        message={`are you sure want to delete ${selectedCompany?.length} ${
          selectedCompany?.length > 1 ? 'items' : 'item'
        } ?`}
        onClose={closeDeleteSelectedDialog}
        onConfirm={onDeleteSelected}
      />
    </div>
  );
}

export default Company;

import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';

import { planes } from './planes';

function TableList() {
  let emptyPlane = {
    uuid: null,
    name: '',
    aircraftNumber: 0,
    tailNumber: 0,
    isDelivered: false,
    owner: null,
  };

  const dt = useRef(null);
  const toast = useRef(null);

  const [plane, setPlane] = useState(emptyPlane);
  const [submitted, setSubmitted] = useState(false);
  const [editPlaneDialog, setEditPlaneDialog] = useState(false);
  const [deletePlaneDialog, setDeletePlaneDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _plane = { ...plane };
    _plane[`${name}`] = val;

    setPlane(_plane);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _plane = { ...plane };
    _plane[`${name}`] = val;

    setPlane(_plane);
  };

  const hideEditPlaneDialog = () => {
    setEditPlaneDialog(false);
  };

  const editPlane = (plane) => {
    setPlane(plane);
    setEditPlaneDialog(true);
  };

  const hideDeletePlaneDialog = () => {
    setDeletePlaneDialog(false);
  };

  const confirmDeletePlane = (plane) => {
    setPlane(plane);
    setDeletePlaneDialog(true);
  };

  const deletePlane = () => {
    // CHANGE CONSOLE.LOG TO DELETE ACTION
    console.log(plane);
    setDeletePlaneDialog(false);
    setPlane(emptyPlane);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: `${plane.name} has been deleted!`,
      life: 3000,
    });
  };

  const header = (
    <div
      className='table-header p-d-flex p-jc-end p-ai-center'
      style={{ gap: '1rem' }}
    >
      <h5 className='p-mx-0 p-my-1'>Manage Products</h5>
      <span className='p-input-icon-left'>
        <i className='pi pi-search' />
        <InputText
          type='search'
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder='Search...'
        />
      </span>
    </div>
  );

  const deliveryStatusTemplate = (rowData) => {
    return <span>{rowData.isDelivered ? 'Delivered' : 'Processing'}</span>;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success p-mr-2'
          onClick={() => editPlane(rowData)}
        />
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-warning'
          onClick={() => confirmDeletePlane(rowData)}
        />
      </React.Fragment>
    );
  };

  const editPlaneDialogFooter = (
    <React.Fragment>
      <Button
        label='Cancel'
        icon='pi pi-times'
        className='p-button-text'
        // onClick={hideDialog}
      />
      <Button
        label='Save'
        icon='pi pi-check'
        className='p-button-text'
        // onClick={saveProduct}
      />
    </React.Fragment>
  );

  const deletePlaneDialogFooter = (
    <React.Fragment>
      <Button
        label='No'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideDeletePlaneDialog}
      />
      <Button
        label='Yes'
        icon='pi pi-check'
        className='p-button-text'
        onClick={deletePlane}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className='card'>
        <DataTable
          ref={dt}
          value={planes}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey='id'
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} products'
          globalFilter={globalFilter}
          header={header}
          responsiveLayout='scroll'
        >
          <Column field='name' header='Name' sortable />
          <Column field='aircraft_number' header='Aircraft Number' sortable />
          <Column field='tail_number' header='Tail Number' sortable />
          <Column field='owner.name' header='Owner' sortable />
          <Column
            field='isDelivered'
            header='Status'
            body={deliveryStatusTemplate}
            sortable
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: '8rem' }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={editPlaneDialog}
        style={{ width: '450px' }}
        header='Product Details'
        modal
        className='p-fluid'
        footer={editPlaneDialogFooter}
        onHide={hideEditPlaneDialog}
      >
        <div className='p-field'>
          <label htmlFor='name'>Name</label>
          <InputText
            id='name'
            value={plane.name}
            onChange={(e) => onInputChange(e, 'name')}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !plane.name })}
          />
          {submitted && !plane.name && (
            <small className='p-error'>Name is required.</small>
          )}
        </div>
        <div className='p-formgrid p-grid'>
          <div className='p-field p-col'>
            <label htmlFor='price'>Price</label>
            <InputNumber
              id='price'
              value={plane.aircraftNumber}
              onValueChange={(e) => onInputNumberChange(e, 'price')}
              mode='currency'
              currency='USD'
              locale='en-US'
            />
          </div>
          <div className='p-field p-col'>
            <label htmlFor='quantity'>Quantity</label>
            <InputNumber
              id='quantity'
              value={plane.tailNumber}
              onValueChange={(e) => onInputNumberChange(e, 'quantity')}
              integeronly
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deletePlaneDialog}
        style={{ width: '450px' }}
        header='Confirm'
        modal
        footer={deletePlaneDialogFooter}
        onHide={hideDeletePlaneDialog}
      >
        <div className='confirmation-content'>
          <i
            className='pi pi-exclamation-triangle p-mr-3'
            style={{ fontSize: '2rem' }}
          />
          {plane && (
            <span>Are you sure you want to delete the selected plane?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default TableList;

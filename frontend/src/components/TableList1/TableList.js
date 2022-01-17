import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

import { planes } from './planes';
import { customers } from './customers';
import { Toolbar } from 'primereact/toolbar';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';

function TableList() {
  let emptyPlane = {
    uuid: null,
    name: '',
    aircraft_number: 0,
    tail_number: 0,
    isDelivered: false,
    owner: null,
  };

  const owners = customers.map((x) =>
    Object.entries(x)
      .filter(([key, value]) => key !== 'planes')
      .reduce((x, [key, value]) => ({ ...x, [key]: value }), {})
  );

  const dt = useRef(null);
  const toast = useRef(null);

  const [plane, setPlane] = useState(emptyPlane);
  const [submitted, setSubmitted] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [addPlaneDialog, setAddPlaneDialog] = useState(false);
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

  const onCategoryChange = (e) => {
    let _plane = { ...plane };
    _plane['isDelivered'] = e.value;
    setPlane(_plane);
  };

  const onOwnerChange = (e) => {
    const { value } = e.target;

    // const owner = Object.entries(value)
    //   .filter(([key, value]) => key !== 'planes')
    //   .reduce((owner, [key, value]) => ({ ...owner, [key]: value }), {});

    setSelectedOwner(value);
  };

  const openNew = () => {
    setPlane(emptyPlane);
    setSubmitted(false);
    setAddPlaneDialog(true);
  };

  const hideAddPlaneDialog = () => {
    setPlane(emptyPlane);
    setSelectedOwner(null);
    setSubmitted(false);
    setAddPlaneDialog(false);
  };

  const hideEditPlaneDialog = () => {
    setPlane(emptyPlane);
    setSubmitted(false);
    setEditPlaneDialog(false);
  };

  const editPlane = (plane) => {
    setPlane(plane);
    setEditPlaneDialog(true);
  };

  const updatePlane = () => {
    setSubmitted(true);
    if (
      plane.name.trim() &&
      plane.tail_number > 9999 &&
      plane.aircraft_number > 9999
    ) {
      setPlane(emptyPlane);
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: `${plane.name} has been updated!`,
        life: 3000,
      });
      hideEditPlaneDialog();
    }
  };

  const hideDeletePlaneDialog = () => {
    setDeletePlaneDialog(false);
  };

  const confirmDeletePlane = (plane) => {
    setPlane(plane);
    setDeletePlaneDialog(true);
  };

  const deletePlane = () => {
    hideDeletePlaneDialog();
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

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label='New'
          icon='pi pi-plus'
          className='p-button-success p-mr-2'
          onClick={openNew}
        />
        <Button
          label='Delete'
          icon='pi pi-trash'
          className='p-button-danger'
          // onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </React.Fragment>
    );
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

  const productDialogFooter = (
    <React.Fragment>
      <Button
        label='Cancel'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideAddPlaneDialog}
      />
      <Button
        label='Save'
        icon='pi pi-check'
        className='p-button-text'
        // onClick={saveProduct}
      />
    </React.Fragment>
  );

  const editPlaneDialogFooter = (
    <React.Fragment>
      <Button
        label='Cancel'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideEditPlaneDialog}
      />
      <Button
        label='Save'
        icon='pi pi-check'
        className='p-button-text'
        onClick={updatePlane}
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
        <Toolbar
          className='p-mb-4'
          left={leftToolbarTemplate}
          // right={rightToolbarTemplate}
        ></Toolbar>

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
        visible={addPlaneDialog}
        style={{ width: '450px' }}
        header='Product Details'
        modal
        className='p-fluid'
        footer={productDialogFooter}
        onHide={hideAddPlaneDialog}
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
            <label htmlFor='aircraft_number'>Aircraft Number</label>
            <InputNumber
              id='aircraftNumber'
              className={classNames({
                'p-invalid': submitted && plane.aircraft_number < 9999,
              })}
              value={plane.aircraft_number}
              useGrouping={false}
              required
              onValueChange={(e) => onInputNumberChange(e, 'aircraft_number')}
            />
            {submitted && plane.aircraft_number < 9999 && (
              <small className='p-error'>
                Aircraft Number should be at least 5 digit.
              </small>
            )}
          </div>
          <div className='p-field p-col'>
            <label htmlFor='tail_number'>Tail Number</label>
            <InputNumber
              id='tailNumber'
              className={classNames({
                'p-invalid': submitted && plane.tail_number < 9999,
              })}
              value={plane.tail_number}
              useGrouping={false}
              required
              onValueChange={(e) => onInputNumberChange(e, 'tail_number')}
              integeronly
            />
            {submitted && plane.tail_number < 9999 && (
              <small className='p-error'>
                Tail Number should be at least 5 digit.
              </small>
            )}
          </div>
        </div>

        <div className='p-field'>
          <label className='p-mb-3'>Delivery Status</label>
          <div className='p-formgrid p-grid'>
            <div className='p-field-radiobutton p-col-6'>
              <RadioButton
                inputId='status1'
                name='status'
                value={true}
                onChange={onCategoryChange}
                checked={plane.isDelivered}
              />
              <label htmlFor='status1'>Delivered</label>
            </div>
            <div className='p-field-radiobutton p-col-6'>
              <RadioButton
                inputId='status2'
                name='status'
                value={false}
                onChange={onCategoryChange}
                checked={!plane.isDelivered}
              />
              <label htmlFor='status2'>On Process</label>
            </div>
          </div>
        </div>

        <div className='p-field'></div>

        <div className='p-field'>
          <label htmlFor='owner'>Owner</label>
          <Dropdown
            id='owner'
            value={selectedOwner}
            options={owners}
            onChange={onOwnerChange}
            optionLabel='name'
            placeholder='Select Owner'
          />
        </div>
      </Dialog>

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
            className={classNames({ 'p-invalid': submitted && !plane.name })}
            value={plane.name}
            onChange={(e) => onInputChange(e, 'name')}
            required
            autoFocus
          />
          {submitted && !plane.name && (
            <small className='p-error'>Name is required.</small>
          )}
        </div>
        <div className='p-formgrid p-grid'>
          <div className='p-field p-col'>
            <label htmlFor='aircraft_number'>Aircraft Number</label>
            <InputNumber
              id='aircraftNumber'
              className={classNames({
                'p-invalid': submitted && plane.aircraft_number < 9999,
              })}
              value={plane.aircraft_number}
              useGrouping={false}
              required
              onValueChange={(e) => onInputNumberChange(e, 'aircraft_number')}
            />
            {submitted && plane.aircraft_number < 9999 && (
              <small className='p-error'>
                Aircraft Number should be at least 5 digit.
              </small>
            )}
          </div>
          <div className='p-field p-col'>
            <label htmlFor='tail_number'>Tail Number</label>
            <InputNumber
              id='tailNumber'
              className={classNames({
                'p-invalid': submitted && plane.tail_number < 9999,
              })}
              value={plane.tail_number}
              useGrouping={false}
              required
              onValueChange={(e) => onInputNumberChange(e, 'tail_number')}
              integeronly
            />
            {submitted && plane.tail_number < 9999 && (
              <small className='p-error'>
                Tail Number should be at least 5 digit.
              </small>
            )}
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

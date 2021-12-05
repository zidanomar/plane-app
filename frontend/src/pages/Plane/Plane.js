import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';

import { getAllPlane } from '../../flux/actions/planeAction';
import {
  ActionBodyTemplate,
  DataTableHeader,
  LeftToolbarTemplate,
} from '../../components/DataTableTemplate';
import PlaneDialog from './PlaneDialog';
import DeleteDialog from '../../components/Dialog/DeleteDialog';

function Plane() {
  let emptyPlane = {
    uuid: null,
    name: '',
    aircraft_number: 0,
    tail_number: 0,
    isDelivered: false,
    owner: '',
  };

  const dt = useRef(null);
  const toast = useRef(null);

  const dispatch = useDispatch();
  const plane = useSelector((state) => state.plane);

  const [selectedPlanes, setSelectedPlanes] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [newPlane, setNewPlane] = useState(emptyPlane);
  // eslint-disable-next-line no-unused-vars
  const [submitted, setSubmitted] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [addPlaneDialog, setAddPlaneDialog] = useState(false);
  const [editPlaneDialog, setEditPlaneDialog] = useState(false);
  const [deletePlaneDialog, setDeletePlaneDialog] = useState(false);

  useEffect(() => {
    dispatch(getAllPlane());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _plane = { ...newPlane };
    _plane[`${name}`] = val;

    setNewPlane(_plane);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _plane = { ...newPlane };
    _plane[`${name}`] = val;

    setNewPlane(_plane);
  };

  const onCategoryChange = (e) => {
    let _plane = { ...newPlane };
    _plane['isDelivered'] = e.value;
    setNewPlane(_plane);
  };

  const onOwnerChange = (e) => {
    const { value } = e;

    let _plane = { ...newPlane };
    _plane['owner'] = value.uuid;
    setNewPlane(_plane);
    setSelectedOwner(value);
  };

  const openAddPlaneDialog = () => {
    setNewPlane(emptyPlane);
    setSubmitted(false);
    setAddPlaneDialog(true);
  };

  const closeAddPlaneDialog = () => {
    setNewPlane(emptyPlane);
    setSubmitted(false);
    setAddPlaneDialog(false);
  };

  const onAddNewPlane = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: `${newPlane.name} has been added!`,
      life: 3000,
    });
    setAddPlaneDialog(false);
    setNewPlane(emptyPlane);
  };

  const editPlane = (rowData) => {
    console.log(rowData);
    setNewPlane(rowData);
    setSelectedOwner(rowData.owner);
    setEditPlaneDialog(true);
  };

  const closeEditPlaneDialog = () => {
    setEditPlaneDialog(false);
    setSubmitted(false);
    setSelectedPlanes(null);
    setSelectedOwner(null);
  };

  const onEditPlane = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: `${newPlane.name} has been updated!`,
      life: 3000,
    });
    setEditPlaneDialog(false);
    setSubmitted(false);
  };

  const deletePlane = (rowData) => {
    setNewPlane(rowData);
    setDeletePlaneDialog(true);
  };

  const closeDeletePlane = () => {
    setDeletePlaneDialog(false);
    setNewPlane(emptyPlane);
  };

  const onDeletePlane = () => {
    toast.current.show({
      severity: 'warn',
      summary: 'Warn Message',
      detail: `${newPlane.name} has been deleted!`,
      life: 3000,
    });
    setDeletePlaneDialog(false);
  };

  const ownerTemplate = (rowData) => {
    return rowData.owner.name;
  };

  const deliverStatusTemplate = (rowData) => {
    return rowData.isDelivered ? 'Delivered' : 'Processing';
  };

  const planeActionBody = (rowData) => {
    return (
      <ActionBodyTemplate
        rowData={rowData}
        onEdit={editPlane}
        onDelete={deletePlane}
      />
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className='card'>
        <Toolbar
          className='p-mb-4'
          left={
            <LeftToolbarTemplate
              onCreate={openAddPlaneDialog}
              onDelete={() => {}}
              disabled={true}
            />
          }
          // right={rightToolbarTemplate}
        ></Toolbar>
        <DataTable
          ref={dt}
          value={plane.planes}
          selection={selectedPlanes}
          onSelectionChange={(e) => setSelectedPlanes(e.value)}
          dataKey='id'
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} products'
          globalFilter={globalFilter}
          header={
            <DataTableHeader setGlobalFilter={setGlobalFilter} title='Planes' />
          }
          responsiveLayout='scroll'
        >
          <Column field='name' header='Name' sortable />
          <Column field='aircraft_number' header='Aircraft Number' sortable />
          <Column field='tail_number' header='Tail Number' sortable />
          <Column field='owner' header='Owner' body={ownerTemplate} sortable />
          <Column
            field='isDelivered'
            header='Delivery Status'
            body={deliverStatusTemplate}
            dataType='boolean'
            sortable
          />
          <Column
            header='Actions'
            body={planeActionBody}
            exportable={false}
            style={{ minWidth: '8rem' }}
          ></Column>
        </DataTable>
      </div>
      <PlaneDialog
        visible={addPlaneDialog}
        plane={newPlane}
        submitted={false}
        selectedOwner={selectedOwner}
        onClose={closeAddPlaneDialog}
        onConfirm={onAddNewPlane}
        onInputChange={onInputChange}
        onInputNumberChange={onInputNumberChange}
        onCategoryChange={onCategoryChange}
        onOwnerChange={onOwnerChange}
      />
      <PlaneDialog
        visible={editPlaneDialog}
        plane={newPlane}
        submitted={false}
        selectedOwner={selectedOwner}
        onClose={closeEditPlaneDialog}
        onConfirm={onEditPlane}
        onInputChange={onInputChange}
        onInputNumberChange={onInputNumberChange}
        onCategoryChange={onCategoryChange}
        onOwnerChange={onOwnerChange}
      />
      <DeleteDialog
        visible={deletePlaneDialog}
        item={newPlane}
        onClose={closeDeletePlane}
        onConfirm={onDeletePlane}
      />
    </div>
  );
}

export default Plane;

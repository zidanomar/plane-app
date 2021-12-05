import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  ActionBodyTemplate,
  LeftToolbarTemplate,
} from '../../components/DataTableTemplate';
import DeleteDialog from '../../components/Dialog/DeleteDialog';
import { getAllFlight } from '../../flux/actions/flightAction';
import FlightDialog from './FlightDialog';

function Flight() {
  // let emptyFlight = {
  //   depatureDate: null,
  //   arrivaldate: null,
  //   planeId: null,
  // };

  const dt = useRef(null);
  const toast = useRef(null);

  const disapatch = useDispatch();
  const flight = useSelector((state) => state.flight);

  const [newFlight, setNewFlight] = useState(null);
  const [selectedPlane, setSelectedPlane] = useState(null);
  const [selectedDepatureDate, setSelectedDepatureDate] = useState(null);
  const [selectedArrivalDate, setSelectedArrivalDate] = useState(null);
  const [addFlightDialog, setAddFlightDialog] = useState(false);
  const [updateFlightDialog, setUpdateFlightDialog] = useState(false);
  const [deleteFlightDialog, setDeleteFlightDialog] = useState(false);

  useEffect(() => {
    disapatch(getAllFlight());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // INPUT HANDLER FUNCTIONS
  // const onInputChange = (e, name) => {
  //   const val = (e.target && e.target.value) || '';
  //   let _flight = { ...newFlight };
  //   _flight[`${name}`] = val;

  //   setNewFlight(_flight);
  // };

  // TODO : CREATE DATE PICKER
  const onSelectDate = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _flight = { ...newFlight };
    _flight[`${name}`] = val.toISOString();

    name === 'arrivaldate'
      ? setSelectedArrivalDate(val)
      : setSelectedDepatureDate(val);
  };

  const onSelectedFlightChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _flight = { ...newFlight };
    _flight[`${name}`] = val.uuid;

    console.log(e.target.value);
    setSelectedPlane(val);
  };

  // CREATE FUNCTIONS

  const openAddFlightDialog = () => {
    setAddFlightDialog(true);
  };

  const closeAddFlightDialog = () => {
    setAddFlightDialog(false);
  };

  const onAddNewFlight = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: `Flight from x to y hasbeen added`,
      life: 3000,
    });
    setAddFlightDialog(false);
  };

  // END CREATE FUNCTIONS

  // UPDATE FUNCTIONS
  const openUpdateFlightDialog = (rowData) => {
    setNewFlight(rowData);
    setUpdateFlightDialog(true);
  };

  const closeUpdateFlightDialog = () => {
    setUpdateFlightDialog(false);
  };

  const onUpdateFlight = () => {
    console.log('updateed!');
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: `Flight x has been updated`,
      life: 3000,
    });
    setAddFlightDialog(false);
    setUpdateFlightDialog(false);
  };

  // END UPDATE FUNCTIONS

  // DELETE FUNCTIONS
  const openDeleteFlightDialog = (rowData) => {
    setNewFlight(rowData);
    setDeleteFlightDialog(true);
  };

  const closeDeleteFlightDialog = () => {
    setDeleteFlightDialog(false);
  };

  const onDeleteFlight = () => {
    toast.current.show({
      severity: 'warn',
      summary: 'Warn Message',
      detail: `Flight x has been deleted`,
      life: 3000,
    });
    setAddFlightDialog(false);
  };

  // END DELETE FUNCTIONS

  const dateParserTemplate = (rowData) => {
    return 'rowData.toString()';
  };

  const flightActionBody = (rowData) => {
    return (
      <ActionBodyTemplate
        rowData={rowData}
        onEdit={openUpdateFlightDialog}
        onDelete={openDeleteFlightDialog}
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
              onCreate={openAddFlightDialog}
              onDelete={() => {}}
              disabled={true}
            />
          }
          // right={rightToolbarTemplate}
        ></Toolbar>
        <DataTable ref={dt} value={flight.flights}>
          <Column field='uuid' header='Flight Id' />
          <Column field='duration' header='Flight Duration' />
          <Column field='planeDetail.name' header='Plane' />
          <Column
            field='depature_date'
            header='Depature'
            date={dateParserTemplate}
          />
          <Column
            field='arrival_date'
            header='Arrival'
            date={dateParserTemplate}
          />
          <Column
            header='Actions'
            body={flightActionBody}
            exportable={false}
            style={{ minWidth: '8rem' }}
          ></Column>
        </DataTable>
      </div>
      <FlightDialog
        visible={addFlightDialog}
        selectedPlane={selectedPlane}
        selectedDepatureDate={selectedDepatureDate}
        selectedArrivalDate={selectedArrivalDate}
        onClose={closeAddFlightDialog}
        onConfirm={onAddNewFlight}
        onSelectedFlightChange={onSelectedFlightChange}
        onSelectedArrivalDate={onSelectDate}
        onSelectedDepatureDate={onSelectDate}
        submitted={false}
      />
      <FlightDialog
        visible={updateFlightDialog}
        selectedPlane={selectedPlane}
        selectedDepatureDate={selectedDepatureDate}
        selectedArrivalDate={selectedArrivalDate}
        onClose={closeUpdateFlightDialog}
        onConfirm={onUpdateFlight}
        onSelectedFlightChange={onSelectedFlightChange}
        onSelectedArrivalDate={onSelectDate}
        onSelectedDepatureDate={onSelectDate}
        //onInputChange={onInputChange}
        // onInputNumberChange={onInputNumberChange}
        // onCategoryChange={onCategoryChange}
        // onOwnerChange={onOwnerChange}
        // plane={newPlane}
        submitted={false}
      />
      <DeleteDialog
        visible={deleteFlightDialog}
        item={newFlight}
        onClose={closeDeleteFlightDialog}
        onConfirm={onDeleteFlight}
      />
    </div>
  );
}

export default Flight;

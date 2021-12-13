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
  addNewFlight,
  deleteFlight,
  getAllFlight,
  updateFlight,
} from '../../flux/actions/flightAction';
import FlightDialog from './FlightDialog';

function Flight() {
  let emptyFlight = {
    uuid: null,
    depature_date: null,
    arrival_date: null,
    planeDetail: null,
  };

  const dt = useRef(null);
  const toast = useRef(null);

  const dispatch = useDispatch();
  const flight = useSelector((state) => state.flight);

  const [newFlight, setNewFlight] = useState(emptyFlight);
  const [selectedPlane, setSelectedPlane] = useState(null);
  const [selectedFlights, setSelectedFlights] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedDepatureDate, setSelectedDepatureDate] = useState(null);
  const [selectedArrivalDate, setSelectedArrivalDate] = useState(null);
  const [addFlightDialog, setAddFlightDialog] = useState(false);
  const [updateFlightDialog, setUpdateFlightDialog] = useState(false);
  const [deleteFlightDialog, setDeleteFlightDialog] = useState(false);

  useEffect(() => {
    dispatch(getAllFlight());
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

    name === 'arrival_date'
      ? setSelectedArrivalDate(val)
      : setSelectedDepatureDate(val);

    setNewFlight(_flight);
  };

  const onSelectedPlaneChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _flight = { ...newFlight };
    _flight[`${name}`] = val;
    setSelectedPlane(val);
    setNewFlight(_flight);
  };

  // CREATE FUNCTIONS

  const openAddFlightDialog = () => {
    setAddFlightDialog(true);
  };

  const closeAddFlightDialog = () => {
    setAddFlightDialog(false);
    setNewFlight(emptyFlight);
    setSelectedArrivalDate(null);
    setSelectedDepatureDate(null);
    setSelectedPlane(null);
  };

  const onAddNewFlight = () => {
    dispatch(addNewFlight(newFlight));
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: `Flight from x to y hasbeen added`,
      life: 3000,
    });
    setAddFlightDialog(false);
    setNewFlight(emptyFlight);
    setSelectedArrivalDate(null);
    setSelectedDepatureDate(null);
    setSelectedPlane(null);
  };

  // END CREATE FUNCTIONS

  // UPDATE FUNCTIONS
  const openUpdateFlightDialog = (rowData) => {
    const arrival = new Date(rowData.arrival_date);
    const depature = new Date(rowData.depature_date);
    setUpdateFlightDialog(true);
    setNewFlight(rowData);
    setSelectedArrivalDate(arrival);
    setSelectedDepatureDate(depature);
    setSelectedPlane(rowData.planeDetail);
  };

  const closeUpdateFlightDialog = () => {
    setUpdateFlightDialog(false);
    setNewFlight(emptyFlight);
    setSelectedArrivalDate(null);
    setSelectedDepatureDate(null);
    setSelectedPlane(null);
  };

  const onUpdateFlight = () => {
    dispatch(updateFlight(newFlight.uuid, newFlight));
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: `Flight x has been updated`,
      life: 3000,
    });
    setUpdateFlightDialog(false);
    setNewFlight(emptyFlight);
    setSelectedArrivalDate(null);
    setSelectedDepatureDate(null);
    setSelectedPlane(null);
  };

  // END UPDATE FUNCTIONS

  // DELETE FUNCTIONS
  const openDeleteFlightDialog = (rowData) => {
    setNewFlight(rowData);
    setDeleteFlightDialog(true);
  };

  const closeDeleteFlightDialog = () => {
    setDeleteFlightDialog(false);
    setNewFlight(emptyFlight);
    setSelectedArrivalDate(null);
    setSelectedDepatureDate(null);
    setSelectedPlane(null);
  };

  const onDeleteFlight = () => {
    dispatch(deleteFlight(newFlight.uuid));
    toast.current.show({
      severity: 'warn',
      summary: 'Warn Message',
      detail: `Flight x has been deleted`,
      life: 3000,
    });
    setDeleteFlightDialog(false);
    setNewFlight(emptyFlight);
    setSelectedArrivalDate(null);
    setSelectedDepatureDate(null);
    setSelectedPlane(null);
  };

  // END DELETE FUNCTIONS

  const parseISOString = (s) => {
    var b = s.split(/\D+/);
    return new Date(
      Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])
    ).toString();
  };

  const arrivalParserTemplate = (rowData) => {
    const arrival = parseISOString(rowData.arrival_date);
    return arrival;
  };

  const depatureParserTemplate = (rowData) => {
    const depature = parseISOString(rowData.depature_date);
    return depature;
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

  const planeDetailTemplate = (rowData) => {
    return rowData.planeDetail.name;
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
        <DataTable
          ref={dt}
          value={flight.flights}
          loading={flight.isLoading}
          selection={selectedFlights}
          onSelectionChange={(e) => setSelectedFlights(e.value)}
          dataKey='id'
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} products'
          globalFilter={globalFilter}
          header={
            <DataTableHeader
              setGlobalFilter={setGlobalFilter}
              title='Flights'
            />
          }
          responsiveLayout='scroll'
        >
          <Column field='uuid' header='Flight Id' />
          <Column field='duration' header='Flight Duration' />
          <Column
            field='planeDetail'
            header='Plane'
            body={planeDetailTemplate}
          />
          <Column
            field='depature_date'
            header='Depature'
            body={depatureParserTemplate}
          />
          <Column
            field='arrival_date'
            header='Arrival'
            body={arrivalParserTemplate}
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
        onSelectedPlaneChange={onSelectedPlaneChange}
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
        onSelectedPlaneChange={onSelectedPlaneChange}
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

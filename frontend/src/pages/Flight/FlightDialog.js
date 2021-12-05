import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
// import { classNames } from 'primereact/utils';

import { DialogFooter } from '../../components/DataTableTemplate';

import { getAllPlane } from '../../flux/actions/planeAction';

function FlightDialog({
  visible,
  flight,
  selectedPlane,
  selectedArrivalDate,
  selectedDepatureDate,
  onClose,
  onConfirm,
  onSelectedArrivalDate,
  onSelectedDepatureDate,
  onSelectedFlightChange,
}) {
  const dispatch = useDispatch();
  const planes = useSelector((state) => state.plane.planes);
  console.log(planes);
  useEffect(() => {
    dispatch(getAllPlane());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog
      visible={visible}
      style={{ width: '450px' }}
      header='Flight Details'
      modal
      className='p-fluid'
      footer={<DialogFooter onClose={onClose} onConfirm={onConfirm} />}
      onHide={onClose}
    >
      <div className='p-field'>
        <label htmlFor='planes'>Planes</label>
        <Dropdown
          id='planes'
          value={selectedPlane}
          options={planes}
          onChange={(e) => onSelectedFlightChange(e, 'planeId')}
          optionLabel='name'
          placeholder='Select Plane'
        />
      </div>

      <div className='p-field'>
        <label htmlFor='depatureDate'>Depature Date</label>
        <Calendar
          id='depatureDate'
          value={selectedDepatureDate}
          onChange={(e) => onSelectedDepatureDate(e, 'arrivalDate')}
          showTime
          showSeconds
        />
      </div>

      <div className='p-field'>
        <label htmlFor='arrivalDate'>Arrival Date</label>
        <Calendar
          id='arrivalDate'
          value={selectedArrivalDate}
          onChange={(e) => onSelectedArrivalDate(e, 'depatureDate')}
          showTime
          showSeconds
        />
      </div>
    </Dialog>
  );
}

export default FlightDialog;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';

import { getAllPlane } from '../../flux/actions/planeAction';

function Plane() {
  const dispatch = useDispatch();
  const plane = useSelector((state) => state.plane);

  const [firstTable, setFirstTable] = useState(0);
  const [rowTable, setRowTable] = useState(10);

  useEffect(() => {
    dispatch(getAllPlane());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCustomPage2 = (event) => {
    setFirstTable(event.first);
    setRowTable(event.rows);
  };

  const paginationTemplate = {
    layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
    RowsPerPageDropdown: (options) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
      ];

      return (
        <React.Fragment>
          <span
            className='p-mx-1'
            style={{ color: 'var(--text-color)', userSelect: 'none' }}
          >
            Items per page:{' '}
          </span>
          <Dropdown
            value={options.value}
            options={dropdownOptions}
            onChange={options.onChange}
            appendTo={document.body}
          />
        </React.Fragment>
      );
    },
    CurrentPageReport: (options) => {
      return (
        <span
          style={{
            color: 'var(--text-color)',
            userSelect: 'none',
            width: '120px',
            textAlign: 'center',
          }}
        >
          {options.first} - {options.last} of {options.totalRecords}
        </span>
      );
    },
  };

  const ownerTemplate = (rowData) => {
    return rowData.owner.name;
  };

  const deliverStatusTemplate = (rowData) => {
    return rowData.isDelivered ? 'Delivered' : 'Processing';
  };

  return (
    <div>
      <div className='card'>
        <DataTable
          value={plane.planes}
          paginator
          paginatorTemplate={paginationTemplate}
          first={firstTable}
          rows={rowTable}
          onPage={onCustomPage2}
          paginatorClassName='p-jc-end'
        >
          <Column field='name' header='Name'></Column>
          <Column field='aircraft_number' header='Aircraft Number'></Column>
          <Column field='tail_number' header='Category'></Column>
          <Column field='owner' header='Owner' body={ownerTemplate}></Column>
          <Column
            field='isDelivered'
            header='Delivery Status'
            body={deliverStatusTemplate}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default Plane;

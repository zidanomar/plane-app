import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';

import { getAllPlane } from '../../flux/actions/planeAction';

function Plane() {
  const dispatch = useDispatch();
  const plane = useSelector((state) => state.plane);

  const [firstTable, setFirstTable] = useState(0);
  const [rowTable, setRowTable] = useState(10);
  const [filters2, setFilters2] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    aircraftNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tailNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    owner: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [globalFilterValue2, setGlobalFilterValue2] = useState('');

  useEffect(() => {
    dispatch(getAllPlane());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGlobalFilterChange2 = (e) => {
    const value = e.target.value;
    let _filters2 = { ...filters2 };
    _filters2['global'].value = value;

    setFilters2(_filters2);
    setGlobalFilterValue2(value);
  };

  const onCustomPage2 = (event) => {
    setFirstTable(event.first);
    setRowTable(event.rows);
  };

  const ownerTemplate = (rowData) => {
    return rowData.owner.name;
  };

  const deliverStatusTemplate = (rowData) => {
    return rowData.isDelivered ? 'Delivered' : 'Processing';
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

  const renderHeader2 = () => {
    return (
      <div className='p-d-flex p-jc-end'>
        <span className='p-input-icon-left'>
          <i className='pi pi-search' />
          <InputText
            value={globalFilterValue2}
            onChange={onGlobalFilterChange2}
            placeholder='Keyword Search'
          />
        </span>
      </div>
    );
  };

  const header2 = renderHeader2();

  const verifiedRowFilterTemplate = (options) => {
    return (
      <TriStateCheckbox
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
      />
    );
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
          filters={filters2}
          filterDisplay='row'
          loading={plane.isLoading}
          responsiveLayout='scroll'
          globalFilterFields={[
            'name',
            'aircraft_number',
            'tail_number',
            'owner',
            'status',
          ]}
          header={header2}
          emptyMessage='No plane found'
          paginatorClassName='p-jc-end'
        >
          <Column
            field='name'
            header='Name'
            sortable
            filter
            filterPlaceholder='Search by name'
            filterField='name'
            style={{ minWidth: '8rem' }}
          />
          <Column
            field='aircraft_number'
            header='Aircraft Number'
            sortable
            filter
            filterPlaceholder='Search by Aircraft Number'
            filterField='aircraftNumber'
            style={{ minWidth: '8rem' }}
          />
          <Column
            field='tail_number'
            header='Tail Number'
            sortable
            filter
            filterPlaceholder='Search by Tail Number'
            filterField='tailNumber'
            style={{ minWidth: '8rem' }}
          />
          <Column
            field='owner'
            header='Owner'
            body={ownerTemplate}
            sortable
            filter
            filterPlaceholder='Search by owner'
            filterField='owner'
            style={{ minWidth: '8rem' }}
          />
          <Column
            field='isDelivered'
            header='Delivery Status'
            body={deliverStatusTemplate}
            dataType='boolean'
            sortable
            filter
            filterField='status'
            filterElement={verifiedRowFilterTemplate}
            style={{ minWidth: '6rem' }}
          />
        </DataTable>
      </div>
    </div>
  );
}

export default Plane;

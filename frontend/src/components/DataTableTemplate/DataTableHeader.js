import { InputText } from 'primereact/inputtext';
import React from 'react';

const DataTableHeader = ({ setGlobalFilter, title }) => (
  <div
    className='table-header p-d-flex p-jc-between p-ai-center'
    style={{ gap: '1rem' }}
  >
    <h5 className='p-mx-0 p-my-1'>{`Manage ${title}`}</h5>
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

export default DataTableHeader;

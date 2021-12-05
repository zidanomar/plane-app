import { Dropdown } from 'primereact/dropdown';
import React from 'react';

export const paginatorTemplate = {
  layout:
    'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown',
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

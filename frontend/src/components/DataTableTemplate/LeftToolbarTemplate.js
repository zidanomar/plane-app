import { Button } from 'primereact/button';
import React from 'react';
function LeftToolbarTemplate({ onCreate, onDelete, disabled }) {
  return (
    <React.Fragment>
      <Button
        label='New'
        icon='pi pi-plus'
        className='p-button-success p-mr-2'
        onClick={onCreate}
      />
      <Button
        label='Delete'
        icon='pi pi-trash'
        className='p-button-danger'
        onClick={onDelete}
        disabled={disabled}
      />
    </React.Fragment>
  );
}

export default LeftToolbarTemplate;

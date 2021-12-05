import { Button } from 'primereact/button';
import React from 'react';

function ActionBodyTemplate({ rowData, onEdit, onDelete }) {
  return (
    <React.Fragment>
      <Button
        icon='pi pi-pencil'
        className='p-button-rounded p-button-success p-mr-2'
        onClick={() => onEdit(rowData)}
      />
      <Button
        icon='pi pi-trash'
        className='p-button-rounded p-button-warning'
        onClick={() => onDelete(rowData)}
      />
    </React.Fragment>
  );
}

export default ActionBodyTemplate;

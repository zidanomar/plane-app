import { Column } from 'primereact/column';
import React from 'react';

function TableItem() {
  return (
    <Column
      selectionMode='multiple'
      headerStyle={{ width: '3rem' }}
      exportable={false}
    ></Column>
  );
}

export default TableItem;

import { Button } from 'primereact/button';
import React from 'react';

function DialogFooter({ onClose, onConfirm }) {
  return (
    <React.Fragment>
      <Button
        label='Cancel'
        icon='pi pi-times'
        className='p-button-text'
        onClick={onClose}
      />
      <Button
        label='Save'
        icon='pi pi-check'
        className='p-button-text'
        onClick={onConfirm}
      />
    </React.Fragment>
  );
}

export default DialogFooter;

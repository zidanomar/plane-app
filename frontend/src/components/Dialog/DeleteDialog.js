import { Dialog } from 'primereact/dialog';
import React from 'react';
import DialogFooter from './DialogFooter';

function DeleteDialog({ visible, onClose, onConfirm, plane }) {
  return (
    <Dialog
      visible={visible}
      style={{ width: '450px' }}
      header='Product Details'
      modal
      className='p-fluid'
      footer={<DialogFooter onClose={onClose} onConfirm={onConfirm} />}
      onHide={onClose}
    >
      <div>
        <p>{`are you sure want to delete ${plane?.name} ?`}</p>
      </div>
    </Dialog>
  );
}

export default DeleteDialog;

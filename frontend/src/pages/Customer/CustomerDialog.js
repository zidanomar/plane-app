import React from 'react';
import { Dialog } from 'primereact/dialog';
import { DialogFooter } from '../../components/DataTableTemplate';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

function CustomerDialog({
  visible,
  customer,
  submitted,
  onClose,
  onConfirm,
  onInputChange,
}) {
  return (
    <Dialog
      visible={visible}
      style={{ width: '450px' }}
      header='Customer Details'
      modal
      className='p-fluid'
      footer={<DialogFooter onClose={onClose} onConfirm={onConfirm} />}
      onHide={onClose}
    >
      <div className='p-field'>
        <label htmlFor='name'>Name</label>
        <InputText
          id='name'
          value={customer?.name}
          onChange={(e) => onInputChange(e, 'name')}
          required
          autoFocus
          className={classNames({ 'p-invalid': submitted && !customer?.name })}
        />
        {submitted && !customer?.name && (
          <small className='p-error'>Name is required.</small>
        )}
      </div>
    </Dialog>
  );
}

export default CustomerDialog;

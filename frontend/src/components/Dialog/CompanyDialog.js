import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

import { DialogFooter } from '../DataTableTemplate';

function CompanyDialog({
  visible,
  company,
  submitted,
  onClose,
  onConfirm,
  onInputChange,
}) {
  return (
    <Dialog
      visible={visible}
      style={{ width: '450px' }}
      header='Company Details'
      modal
      className='p-fluid'
      footer={<DialogFooter onClose={onClose} onConfirm={onConfirm} />}
      onHide={onClose}
    >
      <div className='p-field'>
        <label htmlFor='name'>Name</label>
        <InputText
          id='name'
          value={company?.name}
          onChange={(e) => onInputChange(e, 'name')}
          required
          autoFocus
          className={classNames({ 'p-invalid': submitted && !company?.name })}
        />
        {submitted && !company?.name && (
          <small className='p-error'>Name is required.</small>
        )}
      </div>
    </Dialog>
  );
}

export default CompanyDialog;

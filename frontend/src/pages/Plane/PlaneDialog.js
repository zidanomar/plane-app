import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { classNames } from 'primereact/utils';

import { DialogFooter } from '../../components/DataTableTemplate';

import { getAllCustomers } from '../../flux/actions/customerAction';

function PlaneDialog({
  visible,
  plane,
  submitted,
  selectedOwner,
  onClose,
  onConfirm,
  onInputChange,
  onInputNumberChange,
  onCategoryChange,
  onOwnerChange,
}) {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);

  const owners = customer.customers.map((x) =>
    Object.entries(x)
      .filter(([key, value]) => key !== 'planes')
      .reduce((x, [key, value]) => ({ ...x, [key]: value }), {})
  );

  useEffect(() => {
    dispatch(getAllCustomers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog
      visible={visible}
      style={{ width: '450px' }}
      header='Plane Details'
      modal
      className='p-fluid'
      footer={<DialogFooter onClose={onClose} onConfirm={onConfirm} />}
      onHide={onClose}
    >
      <div className='p-field'>
        <label htmlFor='name'>Name</label>
        <InputText
          id='name'
          value={plane?.name}
          onChange={(e) => onInputChange(e, 'name')}
          required
          autoFocus
          className={classNames({ 'p-invalid': submitted && !plane?.name })}
        />
        {submitted && !plane?.name && (
          <small className='p-error'>Name is required.</small>
        )}
      </div>

      <div className='p-formgrid p-grid'>
        <div className='p-field p-col'>
          <label htmlFor='aircraft_number'>Aircraft Number</label>
          <InputNumber
            id='aircraft_number'
            className={classNames({
              'p-invalid': submitted && plane?.aircraft_number < 9999,
            })}
            value={plane?.aircraft_number}
            useGrouping={false}
            required
            onValueChange={(e) => onInputNumberChange(e, 'aircraft_number')}
          />
          {submitted && plane?.aircraft_number < 9999 && (
            <small className='p-error'>
              Aircraft Number should be at least 5 digit.
            </small>
          )}
        </div>
        <div className='p-field p-col'>
          <label htmlFor='tail_number'>Tail Number</label>
          <InputNumber
            id='tail_number'
            className={classNames({
              'p-invalid': submitted && plane?.tail_number < 9999,
            })}
            value={plane?.tail_number}
            useGrouping={false}
            required
            onValueChange={(e) => onInputNumberChange(e, 'tail_number')}
            integeronly
          />
          {submitted && plane?.tail_number < 9999 && (
            <small className='p-error'>
              Tail Number should be at least 5 digit.
            </small>
          )}
        </div>
      </div>

      <div className='p-field'>
        <label className='p-mb-3'>Delivery Status</label>
        <div className='p-formgrid p-grid'>
          <div className='p-field-radiobutton p-col-6'>
            <RadioButton
              inputId='status2'
              name='status'
              value={false}
              onChange={onCategoryChange}
              checked={!plane?.isDelivered}
            />
            <label htmlFor='status2'>On Process</label>
          </div>
          <div className='p-field-radiobutton p-col-6'>
            <RadioButton
              inputId='status1'
              name='status'
              value={true}
              onChange={onCategoryChange}
              checked={plane?.isDelivered}
            />
            <label htmlFor='status1'>Delivered</label>
          </div>
        </div>
      </div>

      <div className='p-field'>
        <label htmlFor='owner'>Owner</label>
        <Dropdown
          id='owner'
          value={selectedOwner}
          options={owners}
          onChange={(e) => onOwnerChange(e)}
          optionLabel='name'
          placeholder='Select Owner'
        />
      </div>
    </Dialog>
  );
}

export default PlaneDialog;

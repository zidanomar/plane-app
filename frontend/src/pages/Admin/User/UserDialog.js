import React, { useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

import { DialogFooter } from '../../../components/DataTableTemplate';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompany } from '../../../flux/actions/companyAction';

function UserDialog({
  visible,
  selectedCompany,
  onClose,
  onConfirm,
  onCompanyChange,
}) {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company.companies);

  const companyList = companies.map((x) =>
    Object.entries(x)
      .filter(([key, value]) => key !== 'planes')
      .reduce((x, [key, value]) => ({ ...x, [key]: value }), {})
  );

  useEffect(() => {
    dispatch(getAllCompany());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <label htmlFor='owner'>Company</label>
        <Dropdown
          id='companyId'
          value={selectedCompany}
          options={[
            {
              uuid: null,
              name: 'Remove Authorization',
              imgUrl: null,
            },
            ...companyList,
          ]}
          onChange={(e) => onCompanyChange(e)}
          optionLabel='name'
          placeholder='Select Company or Remove Authorization'
        />
      </div>
    </Dialog>
  );
}

export default UserDialog;

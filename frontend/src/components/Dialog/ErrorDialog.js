import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { clearErrors } from '../../flux/actions/errorAction';

function ErrorDialog() {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.error);

  let status = false;

  if (error.status || error.message) {
    status = true;
  } else {
    status = false;
  }

  const productDialogFooter = <React.Fragment></React.Fragment>;

  return (
    <Dialog
      visible={status}
      style={{ width: '450px' }}
      header='Error Acquired'
      modal
      className='p-fluid'
      footer={productDialogFooter}
      onHide={() => dispatch(clearErrors())}
    >
      <div>
        <h3>{`status: ${error.status || 500}`}</h3>
        <h3>{`message: ${error.message || 'Server Error'}`}</h3>
      </div>
    </Dialog>
  );
}

export default ErrorDialog;

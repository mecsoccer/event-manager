import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import LinearProgress from '@material-ui/core/LinearProgress';
import { tbhApiInternals } from '../apis/tbhApi';
import DialogRedirection from './modals/DialogRedirection';
//import { displayRedirectionDialog } from '../actions/redirectionDialogActions';

const intialValues = { accountNumber: '' };
const initialValidation = { accountNumber: true };

const ValidateSterlingAccNo = ({ action, actionType2, initialStates, title, margin, doNotVerify }) => {
  const [values, setValues] = useState(intialValues);
  const [validation, setValidation] = useState(initialValidation);
  const [verifyingAccNo, setVerifyingAccNo] = useState(null);
  const [open, setOpen] = useState(false);
  
  function updateParentComponent() {
    if (action) {
      action.setValues({ ...initialStates.values, accountNumber: values.accountNumber });
      action.setValidation({ ...initialStates.validation, accountNumber: validation.accountNumber });
    }
    if (actionType2) {
      actionType2({
        ...initialStates,
        accountNumber: { value: values.accountNumber, validation: validation.accountNumber }
      })
    }
  }
  
  const handleAccountNumberInput = (value) => {
    const valuesObject = { ...values };
    const validationObject = { ...validation };

    valuesObject.accountNumber = value;
    setValues(valuesObject);

    if (/^\d{10}$/g.test(value)) {
      setVerifyingAccNo('verifying');
      setValidation({ ...validation, accountNumber: null });

      if (doNotVerify) {
        setVerifyingAccNo('verified');
        return setValidation({ ...validation, accountNumber: true });
      }

      return tbhApiInternals().post('/verify/account-number', { accountNumber: value })
        .then(() => {
          setVerifyingAccNo('verified');
          setValidation({ ...validation, accountNumber: true });
          updateParentComponent();
        })
        .catch((err) => {
          console.log(err);
          setValidation({ ...validation, accountNumber: false });
          setVerifyingAccNo('unverified');
          updateParentComponent();
        });
    }

    validationObject.accountNumber = false;
    setValidation(validationObject);
  }

  return (
    <div style={{ marginBottom: margin ? margin : 20 }}>
      <DialogRedirection open={open} setOpen={setOpen} />
      <div style={{display:'flex',alignItems:'center'}}>
        <TextField
          required
          className="" 
          id="account-no-field"
          fullWidth
          label={title ? title : "Enter your Sterling Account Number"}
          variant="outlined"
          value={values.accountNumber}
          error={!validation.accountNumber}
          onChange={(e) => {
            const acceptedValue = e.target.value.replace(/[a-z\W]/gi, '').slice(0, 10);
            handleAccountNumberInput(acceptedValue);
          }}
          disabled={verifyingAccNo === 'verifying' ? true : false}
        />
        <>
          {verifyingAccNo === 'verified' 
            ? <CheckCircleOutlineRoundedIcon color="secondary" style={{marginLeft:10,color:'green'}} />
            : null}
        </>
      </div>
      <>
        {verifyingAccNo === 'verifying'
          ? <div>
              <span className="must-be-sterling-spf">verifying account number</span>
              <LinearProgress />
            </div>
          : null}
      </>
      <>
        <span className="must-be-sterling-spf">
          {"Don't have an account with Sterling Bank? "}
          <span style={{color:'#005fc0',cursor:'pointer'}} onClick={() => setOpen(true)}>
            Open one in less than 10mins
          </span>
        </span>
      </>
    </div>
  )
};

export default ValidateSterlingAccNo;

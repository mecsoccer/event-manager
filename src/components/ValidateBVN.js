import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import LinearProgress from '@material-ui/core/LinearProgress';
import { tbhApiInternals } from '../apis/tbhApi';

const intialValues = { bvn: '', phoneNumber: '' };
const initialValidation = { bvn: true, phoneNumber: true };

const ValidateBVN = ({ action, actionType2, initialStates, title }) => {
  const [values, setValues] = useState(intialValues);
  const [validation, setValidation] = useState(initialValidation);
  const [verifyingBVN, setVerifyingBVN] = useState(null);

  function updateParentComponent(status) {
    if (action) {
      action.setValues({ ...initialStates.values, bvn: values.bvn });
      action.setValidation({ ...initialStates.validation, bvn: status });
    }
    if (actionType2) {
      actionType2({
        ...initialStates,
        bvn: { value: values.bvn, validation: status }
      })
    }
  }

  function handleFormInput(name, value, regEx) {
    const valuesObject = { ...values };
    const validationObject = { ...validation };

    regEx.test(value) ? validationObject[name] = 'true' : validationObject[name] = false;
    setValidation(validationObject);

    valuesObject[name] = value;
    setValues(valuesObject);
  }

  function handleBvnPhoneInput(value) {
    const valuesObject = { ...values };
    const validationObject = { ...validation };

    valuesObject.phoneNumber = value;
    setValues(valuesObject);

    if (/^(0\d{10}|\+234\d{10}|234\d{10})$/g.test(value)) {
      setVerifyingBVN('verifying');
      setValidation({ ...validation, phoneNumber: true, bvn: 'true' });

      return tbhApiInternals().post('/verify/bvn', { ...values, phoneNumber: value })
        .then(() => {
          setVerifyingBVN('verified');
          setValidation({ ...validation, phoneNumber: true, bvn: true });
          updateParentComponent(true);
        })
        .catch((err) => {
          console.log(err.message);
          setValidation({ ...validation, phoneNumber: false, bvn: 'false' });
          setVerifyingBVN('unverified');
          updateParentComponent(false);
          if (err.message === 'Network Error') alert('Error completing request. Try again later');
        });
    }

    validationObject.phoneNumber = false;
    setValidation(validationObject);
  }

  return (
    <div>
      <div style={{marginBottom:20}}>
        <div style={{display:'flex',alignItems:'center'}}>
          <TextField
            id="bvn-field"
            fullWidth
            label={title || 'Enter your BVN'}
            variant="outlined"
            value={values.bvn}
            error={validation.bvn === 'false' || !validation.bvn}
            onChange={(e) => {
              const acceptedValue = e.target.value.replace(/[a-z\W]/gi, '').slice(0,11);
              handleFormInput('bvn', acceptedValue, /^\d{11}$/g);
            }}
            disabled={verifyingBVN === 'verifying' ? true : false}
          />
          {verifyingBVN === 'verified' ? <CheckCircleOutlineRoundedIcon color="secondary" style={{marginLeft:10,color:'green'}} /> : null}
          {verifyingBVN === 'unverified' ? <CancelOutlinedIcon color="secondary" style={{marginLeft:10,color:'red'}} /> : null}
        </div>
        {verifyingBVN === 'verifying'
          ? <div>
              <span className="must-be-sterling-spf">verifying BVN</span>
              <LinearProgress />
            </div>
          : null}
      </div>
      {values.bvn && (validation.bvn === 'true' || validation.bvn === 'false')
        ? <TextField
            style={{marginBottom:20}}
            id="dir-phone-number"
            fullWidth
            label="Enter bvn phone number"
            variant="outlined"
            value={values.phoneNumber}
            error={!validation.phoneNumber}
            onChange={(e) => {
              const acceptedValue = e.target.value.replace(/[^0-9+]/gi, '').slice(0,14);
              handleBvnPhoneInput(acceptedValue);
            }}
            disabled={verifyingBVN === 'verifying' ? true : false}
            helperText={!validation.phoneNumber && 'phone number does not match bvn'}
          />
        : null
      }
    </div>
  );
}

export default ValidateBVN;

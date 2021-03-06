import React, { useState, useEffect, useContext } from "react";
import { RouteComponentProps } from 'react-router-dom';
import { Button, TextField, withStyles } from '@material-ui/core';
//import { store } from '../../global-store/popupContext';
import tbhLogo from "../../assets/images/TBH-logo.png";
import { ROUTES } from '../../constants/routes';
import { validate, handleFormInput } from "../../utils/validations";
import { displayAlertBar } from '../../global-store/actions/popupActions';
import { store } from '../../global-store/popupContext';

const initialValues = {
  email: { value: '', validation: true },
  password: { value: '', validation: true },
};

const Signup: React.FunctionComponent<RouteComponentProps> = (props) => {
  const { dispatch } = useContext(store);
  
  const [formValues, setFormValues] = useState(initialValues);
  const [fadeBtn, setFadeBtn] = useState(true);

  useEffect(() => {
    validate(formValues, setFadeBtn);
  }, [formValues]);

  const submitForm = () => {
    const usersObject = JSON.parse(localStorage.getItem('users') || '') || {};
    const users = usersObject?.users;
    const user = users[formValues.email.value];

    if (user && dispatch) return displayAlertBar(
      dispatch,
      'error',
      'email not available'
    );

    /*
    localStorage.setItem('users', JSON.stringify({
      ...usersObject,
      //[formValues.email.value]:
    }));*/

    localStorage.setItem('user', '')
  };

  return (
    <div className="sdf-login-page email-sent-page">
      <img
        src={tbhLogo} alt=""
        className="esp-logo-img"
        onClick={() => props.history.push(ROUTES.index)}
      />
      <div className="login-esp-white-div esp-white-div">
        <h2 style={{margin:0}}>
          Login
        </h2>
        <form>
          <TextField
            className="form-fields"
            style={{marginBottom: 20, marginTop: 20}}
            id="email-field"
            fullWidth
            label="Email"
            variant="standard"
            value={formValues.email.value}
            error={!formValues.email.validation}
            onChange={(e) => handleFormInput('email', e.target.value, /./gi, formValues, setFormValues)}
          />
          <TextField
            className="form-fields"
            id="password-field"
            style={{marginBottom:40}}
            type="password"
            label="Password"
            placeholder="eg 1d#8%sd232Yds$"
            variant="standard"
            fullWidth
            value={formValues.password.value}
            error={!formValues.password.validation}
            onChange={(e) => handleFormInput('password', e.target.value, /./gi, formValues, setFormValues)}
          />
        </form>
        <ColorButton
          variant="contained"
          color="primary"
          fullWidth
          onClick={submitForm}
          disabled={fadeBtn}
        >
          login
        </ColorButton>
        <div>
          <ColorButton
            fullWidth
            onClick={submitForm}
            disabled={fadeBtn}
          >
            signup
          </ColorButton>
        </div>
      </div>
    </div>
  );
};

export default Signup;

const ColorButton = withStyles((theme) => ({
  root: {
    '&:hover': {
      //backgroundColor: '#0c946e',
    },
    backgroundColor: '#000000',
    height: 40,
    color: '#ffffff',
    fontSize: 14,
    letterSpacing: 1.4,
    maxWidth: 250,
  },
}))(Button);

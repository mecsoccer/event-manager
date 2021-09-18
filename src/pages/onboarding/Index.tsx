import React, { useEffect, useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, TextField, withStyles } from '@material-ui/core';
import { handleFormInput, validate } from '../../utils/validations';
import { ROUTES } from '../../constants/routes';
import { store } from '../../global-store/popupContext';
import { displayAlertBar } from '../../global-store/actions/popupActions';
import { checkLoggedIn } from '../../utils/auth';
import { createNewEvent, getUserEvents } from '../../utils/events';

const initialValues = {
  name: { value: '', validation: true },
  startDate: { value: '', validation: true },
  endDate: { value: '', validation: true },
  //recur: { value: '', validation: true },
  //recurParam: { value: '', validation: true },
};

const Index: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const { dispatch } = useContext(store);

  const [formValues, setFormValues] = useState(initialValues);
  const [fadeBtn, setFadeBtn] = useState(true);

  useEffect(() => validate(formValues, setFadeBtn), [formValues]);

  useEffect(() => checkLoggedIn(history), [history]);

  const createEvent = () => {
    const events = getUserEvents();
    if (events.length >= 10) {
      if (dispatch)
        return displayAlertBar(
          dispatch,
          'error',
          'Sorry cannot create any more events. Not more than 10 events allowed'
        );
    }
    createNewEvent({
      name: formValues.name.value, 
      startDate: formValues.startDate.value,
      endDate: formValues.endDate.value,
    });
    dispatch && displayAlertBar(dispatch, 'success', 'Successfully created');
    history.push(ROUTES.dashboardHome);
  };

  return (
    <div>
      <h2>Create an Event</h2>
      <div className="progress-bar">
        <div style={{width: `${7/7 * 100}%`}}></div>
      </div>
      <form style={{textAlign:'left',fontSize:14,}}>
        <p style={{margin:'30px 0 20px',lineHeight:'22px',color:'#1C234F',fontWeight:'bold'}}>
          Please Provide Information for your event
        </p>
        <TextField
          id="rc-number-field"
          fullWidth
          label="Enter name of event"
          style={{marginBottom:20}}
          variant="outlined"
          value={formValues.name.value}
          error={!formValues.name.validation}
          onChange={(e) => {
            handleFormInput('name', e.target.value, /.+/gi, formValues, setFormValues)}
          }
        />
        <TextField
          id="tin-field"
          fullWidth
          type="date"
          label="Enter start Date and Time"
          style={{marginBottom:20}}
          variant="outlined"
          value={formValues.startDate.value}
          error={!formValues.startDate.validation}
          onChange={(e) => {
            handleFormInput('startDate', e.target.value, /.+/gi, formValues, setFormValues)}
          }
        />
        <TextField
          id="tin-field"
          fullWidth
          type="date"
          label="Enter end Date and Time"
          style={{marginBottom:40}}
          variant="outlined"
          value={formValues.endDate.value}
          error={!formValues.endDate.validation}
          onChange={(e) => {
            handleFormInput('endDate', e.target.value, /.+/gi, formValues, setFormValues)}
          }
        />
      </form>
      <div className="next-btn">
        <ColorButton
          variant="contained"
          color="primary"
          fullWidth
          onClick={createEvent}
          disabled={fadeBtn}
        >
          create
        </ColorButton>
      </div>
    </div>
  )
};

export default Index;

const ColorButton = withStyles((theme) => ({
  root: {
    '&:hover': {
      //backgroundColor: '#0c946e',
    },
    backgroundColor: '#000000',
    height: 56,
    color: '#ffffff',
    fontSize: 14,
    letterSpacing: 1.4,
  },
}))(Button);

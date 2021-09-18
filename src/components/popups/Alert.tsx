import React, { useContext } from 'react';
import { Snackbar, SnackbarCloseReason } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { store } from '../../global-store/popupContext';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomizedSnackbars: React.FC = (props) => {
  const { state, dispatch } = useContext(store);

  const classes = useStyles();
  const { open, duration, message } = state.alert;
  
  const type = state.alert.type

  const setOpen = (status: boolean) => {
    if (dispatch)
      dispatch({ type: 'DISPLAY_ALERT', payload: { open: status, type, duration, message } });
  };

  const handleClose = (event: React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        anchorOrigin={{horizontal:'center',vertical:'top'}}
        autoHideDuration={duration}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={type}
        >
          {message}
        </MuiAlert>
      </Snackbar>
      {/*<Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
        <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert>*/}
    </div>
  );
}

export default CustomizedSnackbars;

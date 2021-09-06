import React, { useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { store } from '../../global-store/popupContext';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function CustomizedSnackbars() {
  const { state, dispatch } = useContext(store);

  const classes = useStyles();
  const { open, type, duration, message } = state.alert;

  const setOpen = (status) => {
    dispatch({ type: 'DISPLAY_ALERT', payload: { open: status, type, duration, message } });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} anchorOrigin={{horizontal:'center',vertical:'top'}} autoHideDuration={duration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
      {/*<Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
        <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert>*/}
    </div>
  );
}

export default CustomizedSnackbars;

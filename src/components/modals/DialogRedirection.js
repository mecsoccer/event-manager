import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function DialogRedirection({ open, setOpen }) {
  const handleRedirection = () => {
    /*
    window.open(redirectState.url);
    displayRedirectionDialog({ open: false, url: '' });
    */
  };

  return (
    <Dialog
      maxWidth="xs"
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        <strong style={{fontSize:18}}>Redirecting to a differrent site</strong>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To complete your request you'll be redirected to another Sterling bank site. Click continue to proceed
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {<Button autoFocus onClick={() => setOpen(false)} color="primary" style={{color:'#e24848'}}>
          Cancel
        </Button>}
        <Button onClick={handleRedirection} color="primary" autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogRedirection;

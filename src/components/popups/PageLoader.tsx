import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { store } from '../../global-store/popupContext';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    maxWidth: 'unset',
    backgroundColor: 'black',
    opacity: 0.7,
    zIndex: 20,
  },
}));

const CircularIndeterminate: React.FC = (props) => {
  const classes = useStyles();

  const { state } = useContext(store);

  return (
    state.pageLoader.open
      ? <div className="page-loader">
          <div className={classes.root}>
            <CircularProgress />
          </div>
        </div>
      : null
  );
}

export default CircularIndeterminate;

import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomSnackbar = ({open, snackbarprops, alertProps, setClose}) => {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setClose(false);
  };

  const sbProps = {
    autoHideDuration: setClose ? 5000 : undefined,
    elevation:6,
    ...snackbarprops,
    onClose: setClose ? handleClose : undefined
  }

  const aProps = {
    severity:"error",
    ...alertProps,
  }


  return (
    <div className={classes.root}>
      <Snackbar open={open} {...sbProps}>
        <MuiAlert variant="filled" {...aProps} >
          {aProps.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default CustomSnackbar;

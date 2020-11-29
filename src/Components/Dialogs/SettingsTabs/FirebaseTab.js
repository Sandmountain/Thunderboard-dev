/* global chrome */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Warning } from '@material-ui/icons';
import React from 'react';
import { removeFirebaseSettings } from '../../../Firestore/FirestoreFunctions';

import { GoogleLogout } from 'react-google-login';

const useStyles = makeStyles((theme) => ({
  error: {
    color: theme.palette.error.main,
    background: '#ffeded',
    width: '80%',
    padding: '5px',
    margin: '10px auto',
    borderLeft: '3px solid' + theme.palette.error.main,
  },
  errorButton: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
  deleteContainer: {
    display: 'flex',
    marginTop: '1em',
    justifyContent: 'center',
  },
}));

export default function FirebaseTab({ saveChanges }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetDashboard = () => {
    removeFirebaseSettings();
    setOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <DialogTitle>Storage Settings</DialogTitle>
      <Typography className={classes.error} align="center" style={{ margin: ' 10 0' }}>
        <Warning style={{ verticalAlign: 'text-bottom' }} /> Deleting your settings is a permanent action.
      </Typography>
      <DialogContent className={classes.deleteContainer}>
        <Button variant="outlined" className={classes.errorButton} onClick={handleClickOpen}>
          {' '}
          Delete Settings{' '}
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete your settings?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deleting your settings is a permanent action.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Go back
            </Button>
            <Button onClick={() => resetDashboard()} className={classes.errorButton} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </DialogContent>
    </div>
  );
}

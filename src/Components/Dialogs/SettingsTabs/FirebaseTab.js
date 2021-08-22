import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Warning } from '@material-ui/icons';
import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { removeFirebaseSettings } from '../../../Firestore/FirestoreFunctions';

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
  profileImageContainer: {
    height: '2em',
    width: '2em',
    borderRadius: '50%',
    margin: 2,
    overflow: 'hidden',
  },
  googleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1em',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  nameSection: {
    marginLeft: '.5em',
    flexDirection: 'column',
    lineHeight: 1,
  },
}));

export default function FirebaseTab({ saveChanges, profileData }) {
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
      <DialogTitle>Storage and Auth Settings</DialogTitle>

      <DialogContent>
        <Typography variant="h6"> Authentication </Typography>
        <DialogContentText>
          If you wish to change account, or just log out. Press this button. Your settings will still be present when
          you log in again.
        </DialogContentText>
        <Typography variant="subtitle2">Current user:</Typography>
        <div className={classes.googleContainer}>
          <div className={classes.profileContainer}>
            <div className={classes.profileImageContainer}>
              <img src={profileData.imageUrl} height="100%" width="100%" alt="ppic" />
            </div>
            <div className={classes.nameSection}>
              <Typography> {profileData.name}</Typography>

              <Typography variant="caption"> {profileData.email}</Typography>
            </div>
          </div>
          <div>
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_OAUTH_KEY}
              buttonText="Logout"
              onLogoutSuccess={() => window.location.reload()}></GoogleLogout>
          </div>
        </div>
      </DialogContent>
      <DialogContent>
        <Typography variant="h6"> Firebase (Storage) </Typography>
        <DialogContentText>
          This action will whipe all your data from the database. If you reload the app, your dashboard will load the
          default layout with default settings.
        </DialogContentText>
        <Typography className={classes.error} align="center" style={{ margin: ' 10 0' }}>
          <Warning style={{ verticalAlign: 'text-bottom' }} /> Deleting your settings is a permanent action.
        </Typography>
        <DialogContent className={classes.deleteContainer}>
          <Button variant="outlined" className={classes.errorButton} onClick={handleClickOpen}>
            Delete Settings
          </Button>
        </DialogContent>
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

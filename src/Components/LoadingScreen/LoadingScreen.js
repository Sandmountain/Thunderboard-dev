import React, { useEffect, useState } from 'react';
import { Fade, makeStyles, Typography } from '@material-ui/core';
import GoogleAuthentication from '../Authentication/GoogleAuthentication';

import ProgressBolt from '../ProgressBolt/ProgressBolt';

const useStyles = makeStyles({
  overlayContainer: {
    position: 'absolute',
    zIndex: 10000,
  },
  logoContainer: {
    position: 'absolute',
    background: '#fff',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#3e3e3e',
  },
  logoWrapper: {
    marginBottom: '5vh',
    fontWeight: '500',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loggingInContainer: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'flex-end',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    flexDirection: 'column',
    top: '-6rem',
  },
  animatedBolt: {},
});

export default function LoadingScreen({ loggedIn, setIsLoggedIn, setCredentials, setSettings, setProfileData }) {
  const classes = useStyles();

  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLogout(true);
    }, 10000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Fade in={!loggedIn} timeout={{ enter: 0, exit: 500 }}>
      <div className={classes.overlayContainer}>
        <div className={classes.logoContainer}>
          <Typography component="div" className={classes.logoWrapper} variant="h2">
            <ProgressBolt fontSize={'4rem'} />
            Thunder Board
          </Typography>
        </div>
        <div className={classes.loggingInContainer}>
          {!showLogout ? (
            <Typography>Logging in...</Typography>
          ) : (
            <>
              <Typography>Something went wrong. Try relogging</Typography>
              <GoogleAuthentication
                loggedIn={loggedIn}
                setSettings={setSettings}
                setIsLoggedIn={setIsLoggedIn}
                setCredentials={setCredentials}
                setProfileData={setProfileData}
              />
            </>
          )}
        </div>
      </div>
    </Fade>
  );
}

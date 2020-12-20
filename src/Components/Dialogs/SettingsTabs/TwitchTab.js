import {
  Avatar,
  Button,
  ButtonGroup,
  Checkbox,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import { WarningTwoTone } from '@material-ui/icons';

import React, { useEffect, useState } from 'react';
import { updateFirestoreCollection } from '../../../Firestore/FirestoreFunctions';
import { openInNewTab } from '../../helperFunctions';
import { validateTwitch, getUserData } from './helperFunctions/twitchHelper';

const marks = (min, max) => {
  return [
    {
      value: min,
      label: min,
    },
    {
      value: max,
      label: max,
    },
  ];
};

const useStyles = makeStyles((theme) => ({
  warning: {
    color: theme.palette.warning.main,
  },
  error: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
}));

export default function YoutubeTab({ settings, testChanges, setSettings }) {
  const { authenticated, nrOfStreams, authKey, streamType, scrollbar, useComponent } = settings.twitchSettings;

  const [authToken, setAuthToken] = useState(authKey);
  const [isAuth, setIsAuth] = useState(authenticated);
  const [errorMessage, setErrorMessage] = useState({ isError: false, message: '' });

  const [strmType, setStrmType] = useState(streamType);

  const [authedUser, setAuthedUser] = useState('');

  const classes = useStyles();
  const [videos, setNrOfVideos] = useState(nrOfStreams);
  const [inUse, setInUse] = useState(useComponent);

  const handleChange = (e, val) => {
    setNrOfVideos(val);

    setSettings({ ...settings, twitchSettings: { ...settings.twitchSettings, nrOfStreams: val } });
    updateFirestoreCollection({
      twitchSettings: { ...settings.twitchSettings, nrOfStreams: val },
    });
  };

  const handleToggleScrollbar = () => {
    setSettings({
      ...settings,
      twitchSettings: { ...settings.twitchSettings, scrollbar: !settings.twitchSettings.scrollbar },
    });
    updateFirestoreCollection({
      twitchSettings: { ...settings.twitchSettings, scrollbar: !settings.twitchSettings.scrollbar },
    });
  };

  useEffect(() => {
    //TODO: move this out to initilize on load
    async function getAuthedUser() {
      const data = await getUserData('https://api.twitch.tv/helix/users', authToken);

      if (data) {
        setAuthedUser(data);
        setSettings({
          ...settings,
          twitchSettings: {
            ...settings.twitchSettings,
            followedUser: data.id,
          },
        });
        updateFirestoreCollection({
          twitchSettings: {
            ...settings.twitchSettings,
            followedUser: data.id,
          },
        });
      }
    }
    if (authedUser === '') {
      getAuthedUser();
    }
  }, [settings, setSettings, authToken, authedUser]);

  const testValue = () => {
    testChanges();
  };

  const handleSubmitAuthToken = (e) => {
    e.preventDefault();
    validateTwitch('https://api.twitch.tv/helix/users', settings, setIsAuth, setSettings, authToken, setErrorMessage);
  };

  const handleInput = (e, method) => {
    method(e.target.value);
  };

  const resetAuth = () => {
    setIsAuth(false);
    setSettings({
      ...settings,
      twitchSettings: {
        ...settings.twitchSettings,
        authenticated: false,
        authKey: '',
      },
    });
    updateFirestoreCollection({
      twitchSettings: {
        ...settings.twitchSettings,
        authenticated: false,
        authKey: '',
      },
    });
  };

  const handleRadioInput = (e) => {
    setStrmType(e.target.value);
    setSettings({
      ...settings,
      twitchSettings: {
        ...settings.twitchSettings,
        streamType: e.target.value,
      },
    });
    updateFirestoreCollection({
      twitchSettings: {
        ...settings.twitchSettings,
        streamType: e.target.value,
      },
    });
  };

  const toggleComponent = (e) => {
    e.preventDefault();
    updateFirestoreCollection({
      twitchSettings: {
        ...settings.redditSettings,
        useComponent: !inUse,
      },
    });

    setSettings({
      ...settings,
      twitchSettings: {
        ...settings.twitchSettings,
        useComponent: !inUse,
      },
    });

    setInUse(!inUse);
  };

  return (
    <>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <FormControlLabel
          labelPlacement="start"
          control={<Switch checked={inUse} onChange={toggleComponent} />}
          label={inUse ? 'Disable Component' : 'Enable Component'}
        />
      </div>
      <DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          Twitch Settings
          {inUse && (
            <ButtonGroup aria-label="outlined primary button group">
              <Button variant="outlined" onClick={() => testValue()}>
                {' '}
                Test changes
              </Button>
              <Button variant="outlined" className={classes.error} onClick={() => resetAuth()}>
                {' '}
                Reset
              </Button>
            </ButtonGroup>
          )}
        </div>

        {authedUser !== '' && inUse && (
          <ListItem style={{ paddingLeft: 0 }}>
            <ListItemAvatar>
              <Avatar src={authedUser.profile_image_url}></Avatar>
            </ListItemAvatar>
            <ListItemText>{authedUser.login}</ListItemText>
          </ListItem>
        )}
      </DialogTitle>

      {inUse ? (
        !isAuth ? (
          <DialogContent>
            <DialogContentText align="center">
              <Typography component="span" align="center" style={{ marginBottom: 10 }} className={classes.warning}>
                <WarningTwoTone style={{ verticalAlign: 'text-bottom' }} /> This is a hacky solution to get Twitch to
                work!
              </Typography>
            </DialogContentText>
            <DialogContentText>
              <Typography component="span" align="left">
                Click on the button below to autorize Twitch, then copy the access token as highlighted in the image
                below from the url field in the browser.
              </Typography>
              <br></br>
              <Typography variant="caption">
                <strong>Note:</strong> After your Twitch account is authenticated, you will be redirected to a new page
                (that can't be loaded) where this url is present.
              </Typography>
            </DialogContentText>
            <img src={require('./images/url.png')} alt="access-token" width={'100%'} />
            <div style={{ display: 'flex', justifyContent: 'center', margin: 12 }}>
              <Button
                variant="outlined"
                onClick={() =>
                  openInNewTab(
                    `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_TWITCH_CLIENT_KEY}&redirect_uri=http://localhost&response_type=token&scope=viewing_activity_read`
                  )
                }>
                {' '}
                Autorize Twitch
              </Button>
            </div>
            <DialogContentText>
              <Typography component="span" align="left">
                Then enter the acess token in the field below <i> and press enter</i>:
              </Typography>
            </DialogContentText>
            <form onSubmit={handleSubmitAuthToken} noValidate autoComplete="off">
              <TextField
                fullWidth
                label="Enter your copied access token and press enter"
                value={authToken}
                onChange={(e) => handleInput(e, setAuthToken)}
                error={errorMessage.isError ? true : false}
                helperText={errorMessage.isError && errorMessage.message}></TextField>
            </form>
          </DialogContent>
        ) : (
          <DialogContent>
            <DialogContentText>
              <Typography component="span" align="left">
                Choose if you wish to get your followed streams or top games
              </Typography>
            </DialogContentText>
            <FormGroup row component="fieldset" style={{ marginBottom: 20 }}>
              <RadioGroup row aria-label="position" name="position" value={strmType} onChange={handleRadioInput}>
                <FormControlLabel
                  value="user"
                  control={<Radio color="primary" />}
                  label="Use user followed streams"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="topGames"
                  control={<Radio color="primary" />}
                  label="Use most viewed streams"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormGroup>
            <DialogContentText>Change the number of streams</DialogContentText>
            <Typography gutterBottom>Number of streams</Typography>
            <Slider
              value={videos}
              onChange={(e, val) => handleChange(e, val)}
              valueLabelDisplay="auto"
              marks={marks(3, 18)}
              step={1}
              min={3}
              max={18}
            />
            <FormControlLabel
              control={<Checkbox checked={scrollbar} onChange={() => handleToggleScrollbar()} name="scrollbar" />}
              label="Use auto scrollbar"
              labelPlacement="end"
            />
          </DialogContent>
        )
      ) : (
        ''
      )}
    </>
  );
}

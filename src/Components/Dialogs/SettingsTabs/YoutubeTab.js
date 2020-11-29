import {
  Button,
  Checkbox,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Slider,
  Switch,
  Typography,
} from '@material-ui/core';

import React, { useState } from 'react';
import { updateFirestoreCollection } from '../../../Firestore/FirestoreFunctions';

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

export default function YoutubeTab({ settings, testChanges, setSettings, toggleMovement }) {
  const { nrOfVideos, scrollbar, youtubeVideoInfo, useComponent } = settings.youtubeSettings;
  const [inUse, setInUse] = useState(useComponent);
  const { showTitle, showChannel, showViews, showUpload } = youtubeVideoInfo;

  const [videos, setNrOfVideos] = useState(nrOfVideos);

  const handleChange = (e, val) => {
    setNrOfVideos(val);
    if (val !== settings.nrOfMails) {
      setSettings({ ...settings, youtubeSettings: { ...settings.youtubeSettings, nrOfVideos: videos } });
      updateFirestoreCollection({
        youtubeSettings: { ...settings.youtubeSettings, nrOfVideos: videos },
      });
    }
  };

  const handleToggleScrollbar = () => {
    setSettings({
      ...settings,
      youtubeSettings: { ...settings.youtubeSettings, scrollbar: !settings.youtubeSettings.scrollbar },
    });
    updateFirestoreCollection({
      youtubeSettings: { ...settings.youtubeSettings, scrollbar: !settings.youtubeSettings.scrollbar },
    });
  };

  const testValue = () => {
    testChanges();
  };
  //TODO: Funkar inte med checkboxarna, lös. Den blir inverterad mot vad som visas på skärm
  const handleCheckboxes = (type) => {
    setSettings({
      ...settings,
      youtubeSettings: {
        ...settings.youtubeSettings,
        youtubeVideoInfo: {
          ...settings.youtubeSettings.youtubeVideoInfo,
          [type]: !settings.youtubeSettings.youtubeVideoInfo[type],
        },
      },
    });
    updateFirestoreCollection({
      youtubeSettings: {
        ...settings.youtubeSettings,
        youtubeVideoInfo: {
          ...settings.youtubeSettings.youtubeVideoInfo,
          [type]: !settings.youtubeSettings.youtubeVideoInfo[type],
        },
      },
    });
  };

  const toggleComponent = () => {
    updateFirestoreCollection({
      youtubeSettings: {
        ...settings.youtubeSettings,
        useComponent: !inUse,
      },
    });

    setSettings({
      ...settings,
      youtubeSettings: {
        ...settings.youtubeSettings,
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
          control={<Switch checked={inUse} onChange={() => toggleComponent()} />}
          label={inUse ? 'Disable Component' : 'Enable Component'}
        />
      </div>
      <DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          Youtube Settings
          {inUse && (
            <Button variant="outlined" onClick={() => testValue()}>
              {' '}
              Test Changes
            </Button>
          )}
        </div>
      </DialogTitle>
      {inUse && (
        <>
          <DialogContent>
            <DialogContentText>Change the number of imported videos</DialogContentText>
            <Typography gutterBottom>Number of videos</Typography>
            <Slider
              value={videos}
              onChange={(e, val) => handleChange(e, val)}
              valueLabelDisplay="auto"
              marks={marks(1, 25)}
              step={1}
              min={1}
              max={25}
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>Other options</DialogContentText>
            <FormControl>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={showTitle} onChange={() => handleCheckboxes('showTitle')} name="channel" />
                  }
                  label="Show the video title"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={showChannel} onChange={() => handleCheckboxes('showChannel')} name="channel" />
                  }
                  label="Show channel name"
                />
                <FormControlLabel
                  control={<Checkbox checked={showViews} onChange={() => handleCheckboxes('showViews')} name="views" />}
                  label="Show views"
                />

                <FormControlLabel
                  control={
                    <Checkbox checked={showUpload} onChange={() => handleCheckboxes('showUpload')} name="upload" />
                  }
                  label="Show upload date"
                />
              </FormGroup>
            </FormControl>
            <FormControlLabel
              control={<Checkbox checked={scrollbar} onChange={() => handleToggleScrollbar()} name="scrollbar" />}
              label="Use auto scrollbar"
              labelPlacement="end"
            />
          </DialogContent>
        </>
      )}
    </>
  );
}

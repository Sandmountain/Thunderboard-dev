import { DialogContent, DialogContentText, DialogTitle, FormControlLabel, Switch, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { updateFirestoreCollection } from '../../../Firestore/FirestoreFunctions';

export default function WeatherTab({ setSettings, settings }) {
  const { city, useComponent } = settings.weatherSettings;
  const [inUse, setInUse] = useState(useComponent);
  const [input, setInput] = useState('');

  const toggleComponent = () => {
    updateFirestoreCollection({
      weatherSettings: {
        ...settings.weatherSettings,
        useComponent: !inUse,
      },
    });

    setSettings({
      ...settings,
      weatherSettings: {
        ...settings.weatherSettings,
        useComponent: !inUse,
      },
    });

    setInUse(!inUse);
  };
  const onChange = (e) => {
    setInput(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setSettings({
      ...settings,
      weatherSettings: {
        ...settings.weatherSettings,
        city: input,
      },
    });
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
      <DialogTitle>Weather Settings</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Enter your town in the field below, then press save changes to change weather destination.
        </DialogContentText>
        <form onSubmit={(e) => onSubmit(e)}>
          <TextField
            onChange={(e) => onChange(e)}
            placeholder={'Enter your town name'}
            helperText={`Currently using ${city}`}></TextField>
        </form>
      </DialogContent>
    </>
  );
}

import { DialogContentText, DialogTitle, FormControlLabel, Switch } from '@material-ui/core';
import React, { useState } from 'react';
import { updateFirestoreCollection } from '../../../Firestore/FirestoreFunctions';

export default function WeatherTab({ setSettings, settings }) {
  const { city, useComponent } = settings.weatherSettings;
  const [inUse, setInUse] = useState(useComponent);

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

  return (
    <>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <FormControlLabel
          labelPlacement="start"
          control={<Switch checked={inUse} onChange={() => toggleComponent()} />}
          label={inUse ? 'Disable Component' : 'Enable Component'}
        />
      </div>
      <DialogTitle>Clock Settings</DialogTitle>
      <DialogContentText>No settings yet...</DialogContentText>
    </>
  );
}

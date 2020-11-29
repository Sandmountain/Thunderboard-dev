import { DialogContent, DialogContentText, DialogTitle, FormControlLabel, Switch } from '@material-ui/core';
import React, { useState } from 'react';
import { updateFirestoreCollection } from '../../../Firestore/FirestoreFunctions';

export default function CalenderTab({ setSettings, settings }) {
  const { useComponent } = settings.calenderSettings;
  const [inUse, setInUse] = useState(useComponent);

  const toggleComponent = () => {
    updateFirestoreCollection({
      calenderSettings: {
        ...settings.calenderSettings,
        useComponent: !inUse,
      },
    });

    setSettings({
      ...settings,
      calenderSettings: {
        ...settings.calenderSettings,
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
      <DialogTitle>Calender Settings</DialogTitle>
      {inUse && (
        <DialogContent>
          <DialogContentText>No settings yet...</DialogContentText>
        </DialogContent>
      )}
    </>
  );
}

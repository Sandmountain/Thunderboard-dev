import { DialogContentText, DialogTitle, FormControlLabel, Switch } from '@material-ui/core';
import React, { useState } from 'react';
import { updateFirestoreCollection } from '../../../Firestore/FirestoreFunctions';

export default function UniversalConverterTab({ setSettings, settings }) {
  const { useComponent } = settings.universalConverter;
  const [inUse, setInUse] = useState(useComponent);

  const toggleComponent = (e) => {
    e.preventDefault();
    updateFirestoreCollection({
      universalConverter: {
        ...settings.universalConverter,
        useComponent: !inUse,
      },
    });

    setSettings({
      ...settings,
      universalConverter: {
        ...settings.universalConverter,
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
      <DialogTitle>Universal Converter Settings</DialogTitle>
      {inUse && <DialogContentText>No settings yet...</DialogContentText>}
    </>
  );
}

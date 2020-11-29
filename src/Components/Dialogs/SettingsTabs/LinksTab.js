import { DialogContent, DialogContentText, DialogTitle, FormControlLabel, Switch } from '@material-ui/core';
import React, { useState } from 'react';
import { updateFirestoreCollection } from '../../../Firestore/FirestoreFunctions';

export default function LinksTab({ setSettings, settings }) {
  const { useComponent } = settings.linksSettings;
  const [inUse, setInUse] = useState(useComponent);

  const toggleComponent = () => {
    updateFirestoreCollection({
      linksSettings: {
        ...settings.linksSettings,
        useComponent: !inUse,
      },
    });

    setSettings({
      ...settings,
      linksSettings: {
        ...settings.linksSettings,
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
      <DialogTitle>Links Settings</DialogTitle>
      {inUse && (
        <DialogContent>
          <DialogContentText>No settings yet...</DialogContentText>
        </DialogContent>
      )}
    </>
  );
}

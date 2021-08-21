import { DialogContent, DialogContentText, DialogTitle, FormControlLabel, Switch } from '@material-ui/core';
import React, { useState } from 'react';
import { updateFirestoreCollection } from '../../../Firestore/FirestoreFunctions';

export default function TodosTab({ setSettings, settings }) {
  const { useComponent } = settings.todosSettings;
  const [inUse, setInUse] = useState(useComponent || false);

  const toggleComponent = (e) => {
    e.preventDefault();
    updateFirestoreCollection({
      todosSettings: {
        ...settings.todosSettings,
        useComponent: !inUse,
      },
    });

    setSettings({
      ...settings,
      todosSettings: {
        ...settings.todosSettings,
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
      <DialogTitle>Todos Settings</DialogTitle>

      {inUse && (
        <DialogContent>
          <DialogContentText>No settings yet...</DialogContentText>
        </DialogContent>
      )}
    </>
  );
}

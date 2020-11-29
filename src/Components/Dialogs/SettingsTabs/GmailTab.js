import {
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
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

export default function GmailTab({ settings, testChanges, setSettings, toggleMovement }) {
  const { nrOfMails, useComponent } = settings.gMailSettings;
  const [inUse, setInUse] = useState(useComponent);
  const [mails, setNrOfMails] = useState(nrOfMails);

  const handleChange = (e, val) => {
    setNrOfMails(val);
    if (val !== settings.nrOfMails) {
      setSettings({
        ...settings,
        gMailSettings: {
          ...settings.gMailSettings,
          nrOfMails: mails,
        },
      });
      updateFirestoreCollection({
        gMailSettings: {
          ...settings.gMailSettings,
          nrOfMails: mails,
        },
      });
    }
  };

  const testValue = () => {
    testChanges();
  };

  const toggleComponent = () => {
    updateFirestoreCollection({
      gMailSettings: {
        ...settings.gMailSettings,
        useComponent: !inUse,
      },
    });

    setSettings({
      ...settings,
      gMailSettings: {
        ...settings.gMailSettings,
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
          Google Mail settings
          {inUse && (
            <Button variant="outlined" onClick={() => testValue()}>
              {' '}
              Test Changes
            </Button>
          )}
        </div>
      </DialogTitle>
      {inUse && (
        <DialogContent>
          <DialogContentText>Change the number of imported mails</DialogContentText>
          <Typography gutterBottom>Number of mails</Typography>
          <Slider
            value={mails}
            onChange={(e, val) => handleChange(e, val)}
            valueLabelDisplay="auto"
            marks={marks(5, 50)}
            step={5}
            min={5}
            max={50}
          />
        </DialogContent>
      )}
    </>
  );
}

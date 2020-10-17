import { Button, DialogContent, DialogContentText, DialogTitle, Slider, Typography } from '@material-ui/core';
import React, { useState } from 'react';

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
  const { nrOfMails } = settings.gMailSettings;

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
    }
  };

  const testValue = () => {
    testChanges();
  };

  return (
    <>
      <DialogTitle>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          Google Mail settings
          <Button variant="outlined" onClick={() => testValue()}>
            {' '}
            Test Changes
          </Button>
        </div>
      </DialogTitle>
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
    </>
  );
}

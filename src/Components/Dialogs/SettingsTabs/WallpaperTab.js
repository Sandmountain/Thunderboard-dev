import React, { useContext, useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Typography,
} from '@material-ui/core';
import { SettingsContext } from '../../../Context/SettingsContext';

export default function WallpaperTab(props) {
  const { onClose, handleClose } = props;
  const { settings, setSettings } = useContext(SettingsContext);
  const { collectionID, windowSize } = settings;
  const [inputID, setInputID] = useState(collectionID);

  const handleChangeClose = () => {
    if (inputID !== 0) {
      onClose(inputID);
      setSettings({ ...settings, collectionID: inputID });
    }
  };
  const handleChange = (event) => {
    setInputID(event.target.value);
  };

  return (
    <>
      <DialogTitle id="form-dialog-title">Wallpaper settings</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter your screen size</DialogContentText>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 20,
          }}>
          <TextField id="standard-basic" label={`Width`} value={settings.windowSize[0]}></TextField>
          <Typography>x</Typography>
          <TextField id="standard-basic" label="Height" value={settings.windowSize[1]}></TextField>
        </div>

        <DialogContentText>
          Entering a{' '}
          <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">
            Unsplash
          </a>{' '}
          id in the input below will change the background images.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Enter Collection ID"
          type="ID"
          fullWidth
          value={inputID}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button className="noBorderRadius" onClick={handleClose} color="default">
          Cancel
        </Button>
        <Button className="noBorderRadius" onClick={handleChangeClose} color="primary">
          Change Collection
        </Button>
      </DialogActions>
    </>
  );
}

import { IconButton, Popover, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';

import PaletteIcon from '@material-ui/icons/Palette';
import { ChromePicker } from 'react-color';

export default function ColorPicker() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [pickedColor, setPickedColor] = useState('#FF0000');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (colors) => {
    setPickedColor(colors.hex);
  };

  const handleChangeComplete = (color, event) => {
    console.log(color);
    //this.setState({ background: color.hex });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Tooltip placement="top" title={'Color picker'}>
        <IconButton aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
          <PaletteIcon></PaletteIcon>
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <ChromePicker color={pickedColor} onChange={handleChange} onChangeComplete={handleChangeComplete} />
      </Popover>
    </>
  );
}

import { Fade, IconButton, makeStyles, Popover, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';

import PaletteIcon from '@material-ui/icons/Palette';
import { ChromePicker } from 'react-color';
let theTimeout;

const useStyles = makeStyles({
  paper: {
    background: 'transparent',
  },
});

export default function ColorPicker() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [pickedColor, setPickedColor] = useState('#FF0000');
  const [hexColor, setHexColor] = useState('#FF0000');

  const [showColor, setShowColor] = useState(false);

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (colors) => {
    setShowColor(false);
    setPickedColor(colors[colors.source]);
    console.log(colors);
    if (colors.rgb.a < 1) {
      setHexColor(`rgba(${colors.rgb.r},${colors.rgb.g},${colors.rgb.b},${colors.rgb.a}`);
    } else {
      setHexColor(colors.hex);
    }
    clearTimeout(theTimeout);
  };

  const handleChangeComplete = (color, event) => {
    clearTimeout(theTimeout);

    theTimeout = setTimeout(() => {
      console.log(hexColor);
      setShowColor(true);
    }, 1000);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Tooltip placement="top" title={'Color picker'}>
        <IconButton aria-describedby={id} variant="contained" color="primary" onClick={handleClick} size={'small'}>
          <PaletteIcon></PaletteIcon>
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{
          paper: classes.paper,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <ChromePicker color={pickedColor} onChange={handleChange} onChangeComplete={handleChangeComplete} />

        {showColor && <div style={{ background: hexColor, height: 40, width: '100%' }}></div>}
      </Popover>
    </>
  );
}

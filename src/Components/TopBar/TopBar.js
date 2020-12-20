import { makeStyles } from '@material-ui/core';
import React from 'react';
import DashboardSettings from '../DashboardSettings/DashboardSettings';

const useStyles = makeStyles({
  optionMenu: {
    position: 'absolute',
    zIndex: 5,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100vw',
  },
  optionMenuBackdrop: {
    background: 'rgba(255, 255, 255, 0.2)',
    margin: '2px',
    display: 'flex',
  },
});

export default function TopBar({ childRef }) {
  const classes = useStyles();
  return (
    <div className={classes.optionMenu}>
      <div className={classes.optionMenuBackdrop}></div>
      <DashboardSettings ref={childRef} />
    </div>
  );
}

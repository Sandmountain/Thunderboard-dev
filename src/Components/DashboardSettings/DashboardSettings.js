import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, makeStyles, Icon } from '@material-ui/core';

import '../../App.css';

import SettingsDialog from '../Dialogs/SettingsDialog';

const useStyles = makeStyles({
  backgrundContainer: { height: '100%', width: '100%' },
  backgroundImageContainer: {
    position: 'absolute',
    zIndex: 1,
    height: '100vh',
    width: '100vw',
  },
  backgroundImage: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  },
  optionMenu: {
    position: 'absolute',
    zIndex: 5,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

    width: '100vw',
  },
  optionMenuBackdrop: {
    background: 'rgba(255, 255, 255, 0.2)',
    margin: '2px',
    display: 'flex',
  },
  noBorderRadius: {
    borderRadius: '0!important',
  },
});

const DashboardSettings = forwardRef(({ settingsOptions }, ref) => {
  useImperativeHandle(ref, () => ({
    openSettings: openSettings,
  }));

  const [open, setOpen] = useState(false);
  const [openTab, setOpenTab] = useState('');

  const classes = useStyles();

  const openSettings = (setting) => {
    setOpenTab(setting);
    setOpen(true);
  };

  const handleChangeCollectionClickOpen = () => {
    setOpen(true);
  };

  const handleChangeCollectionClose = (value) => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.optionMenu}>
        <div className={classes.optionMenuBackdrop}>
          <Button
            endIcon={<Icon>settings</Icon>}
            onClick={() => handleChangeCollectionClickOpen()}
            className="noBorderRadius"
            size="small">
            Settings
          </Button>
        </div>
      </div>

      <SettingsDialog openTab={openTab} open={open} onClose={handleChangeCollectionClose} />
    </>
  );
});

export default DashboardSettings;

/* Funny Apis and components 
  Source = https://github.com/public-apis/public-apis
   
  Quotes = https://type.fit/api/quotes

  Aftonbladet rss?
 
  insults = https://evilinsult.com/generate_insult.php?lang=en&type=json

  integrate calender?


  //Slide show
  random cat = https://aws.random.cat/meow
  //random dog
  //Use unspash?

  //Web development
  https://github.com/casesandberg/react-color


  ---> Include
  Twitch

  */

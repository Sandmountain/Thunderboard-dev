import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { IconButton, makeStyles, Icon } from '@material-ui/core';

import '../../App.css';

import SettingsDialog from '../Dialogs/SettingsDialog';

const useStyles = makeStyles({
  backgrundContainer: { height: '100%', width: '100%' },

  optionMenuBackdrop: {
    background: 'rgba(255, 255, 255, 0.2)',
    padding: '2px',
    display: 'flex',
  },
  noBorderRadius: {
    borderRadius: '0!important',
  },
  profileImageContainer: {
    background: 'rgba(255, 255, 255, 0.2)',
    height: '20px',
    width: '20px',
    borderRadius: '50%',
    margin: 2,
    overflow: 'hidden',
    opacity: 0.6,
  },
});

const DashboardSettings = forwardRef(
  ({ settingsOptions, profileData }, ref) => {
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={classes.optionMenuBackdrop}>
            <div
              onClick={() => openSettings(12)}
              className={classes.profileImageContainer}
              style={{}}
            >
              <img
                src={profileData.imageUrl}
                alt="ppic"
                height="100%"
                width="100% "
              />
            </div>
            <IconButton
              onClick={() => handleChangeCollectionClickOpen()}
              className="noBorderRadius"
              size="small"
            >
              <Icon fontSize="small">menu</Icon>
            </IconButton>
          </div>

          <SettingsDialog
            openTab={openTab}
            open={open}
            profileData={profileData}
            onClose={handleChangeCollectionClose}
          />
        </div>
      </>
    );
  }
);

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

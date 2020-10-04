import { Button, Icon, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { SettingsContext } from '../../Context/SettingsContext';

const useStyles = makeStyles({
  gridItemCards: {},
  twitchAuthButton: { display: 'flex', justifyContent: 'center' },
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
});

export default function WallpaperComponent() {
  const classes = useStyles();

  const { settings } = useContext(SettingsContext);
  const { collectionID, windowSize } = settings;
  console.log(settings);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    loadCustomBackground();

    async function loadCustomBackground(terms = null) {
      const res = await axios.get(
        `https://source.unsplash.com/collection/${collectionID}/${windowSize[0]}x${windowSize[1]}`
      );
      setImageURL(res.config.url);
    }
  }, [collectionID, windowSize]);

  return (
    <div className={classes.backgrundContainer}>
      <div className={classes.backgroundImageContainer}>
        <img src={imageURL} className={classes.backgroundImage} alt="bg-img"></img>
      </div>
    </div>
  );
}

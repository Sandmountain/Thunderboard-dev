import { makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { SettingsContext } from '../../../Context/SettingsContext';

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
    minWidth: '100%',
    minHeight: '100%',
  },
  overlay: {
    height: '100vh',
    position: 'absolute',
    left: 0,
    right: 0,
    background: 'rgba(0,0,0,.3)',
  },
});

export default function WallpaperComponent({ overlay }) {
  const classes = useStyles();

  const { settings } = useContext(SettingsContext);
  const { collectionID, windowSize, customURL, imageType } =
    settings?.wallPaperSettings;
  const [imageURL, setImageURL] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    loadCustomBackground();

    async function loadCustomBackground() {
      if (imageType === 'unisplash' || customURL === '') {
        const res = await axios.get(
          `https://source.unsplash.com/collection/${collectionID}/${windowSize[0]}x${windowSize[1]}`
        );
        setImageURL(res.config.url);
      } else {
        setImageURL(customURL);
      }
    }
  }, [collectionID, windowSize, customURL, imageType]);

  const handleLoaded = () => {
    if (!imageLoaded) {
      setImageLoaded(true);
    }
  };

  return (
    <div className={classes.backgrundContainer}>
      <div className={classes.backgroundImageContainer}>
        {overlay && <div className={classes.overlay} />}
        {imageType === 'unisplash' ? (
          <img
            style={{ display: imageLoaded ? 'block' : 'none' }}
            src={imageURL}
            className={classes.backgroundImage}
            onLoad={handleLoaded()}
            alt="bg-img"
          ></img>
        ) : (
          <img
            src={imageURL}
            width={windowSize[0]}
            height={windowSize[1]}
            className={classes.backgroundImage}
            alt="img"
          ></img>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  responsive: {
    position: 'relative',
    overflow: 'hidden',
    flex: '1 0 auto',
    maxWidth: '100%',
    display: 'flex',
  },
  responsiveSizer: {
    transition: 'padding-bottom .2s cubic-bezier(.25,.8,.5,1)',
    flex: '1 0 0px',
  },
  imageImage: {
    backgroundSize: 'cover',
    position: 'absolute',
    zIndex: 0,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export default function Image({ src, height, width }) {
  const classes = useStyles();
  return (
    <div style={{ maxHeight: height, maxWidth: width }}>
      <div className={`${classes.responsive} ${classes.responsiveSizer}`} style={{ paddingBottom: '100%' }} />
      <div
        style={{ backgroundImage: `url(${src})`, backgroundPosition: 'center center' }}
        className={`${classes.imageImage}`}></div>
    </div>
  );
}

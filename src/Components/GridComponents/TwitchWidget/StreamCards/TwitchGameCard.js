import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import '../styles/styles.css';

const parseThumbnails = (url) => {
  return url.replace('{width}', 160).replace('{height}', 210);
};

const useStyles = makeStyles({
  listTitleText: {
    lineHeight: 1,
    marginBottom: 7,
  },
});

export default function TwitchGameCard({ game, onClick }) {
  const classes = useStyles();

  return (
    <div>
      <div
        className={'stream'}
        onClick={() => onClick({ id: game.id, url: parseThumbnails(game.box_art_url), name: game.name })}>
        <img
          alt="game"
          style={{ width: '100%' }}
          src={parseThumbnails(game.box_art_url)}
          className="stream__thumbnail"
        />
      </div>

      <div className={classes.youtubeContent}>
        <Typography variant="subtitle2" style={{ fontSize: '0.8rem' }} className={classes.listTitleText}>
          {game.name}
        </Typography>
      </div>
    </div>
  );
}

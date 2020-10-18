import { Card, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TwitchCard from './TwitchCard';

const useStyles = makeStyles({
  universalConvContainer: {
    height: '100%',
    width: '100%',

    borderRadius: 0,
  },
});

export default function TwitchWidget({ authKey, nrOfStreams, streamType, followedUser, isDraggable }) {
  const [twitchData, setTwitchData] = useState(null);
  //https://id.twitch.tv/oauth2/validate
  useEffect(() => {
    async function getTwitchData() {
      const url =
        streamType === 'user'
          ? `https://api.twitch.tv/helix/users/follows?from_id=${followedUser}&first=${nrOfStreams}`
          : `https://api.twitch.tv/helix/streams?first=${nrOfStreams}&language=en`;

      try {
        fetch(url, {
          method: 'get',
          headers: new Headers({
            Authorization: `Bearer ${authKey}`,
            'Client-ID': process.env.REACT_APP_TWITCH_CLIENT_KEY,
          }),
        })
          .then(function (res) {
            return res.json();
          })
          .then((data) => {
            setTwitchData(data.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
    if (!twitchData) {
      getTwitchData();
    }
  }, [followedUser, nrOfStreams, authKey, streamType, twitchData]);
  // openInNewTab(`https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_TWITCH_CLIENT_KEY}&redirect_uri=http://localhost&response_type=token&scope=viewing_activity_read`)

  const classes = useStyles();
  console.log(twitchData);
  return (
    <Card className={classes.universalConvContainer}>
      <div
        className={`${isDraggable && 'isDraggableContainer'}`}
        style={{
          height: '100%',
          padding: '0 5px',
          gap: '5px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        }}>
        {twitchData &&
          twitchData.map((stream, idx) => {
            return <TwitchCard key={idx} data={stream} />;
          })}
      </div>
    </Card>
  );
}

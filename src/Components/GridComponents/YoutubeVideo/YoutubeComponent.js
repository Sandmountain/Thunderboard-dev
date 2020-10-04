import { Card, CircularProgress, Grid, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import YoutubeVideo from './YoutubeVideo';

const useStyles = makeStyles({
  wrapperCard: {
    height: '100%',
    borderRadius: 0,
  },
  innerContainer: {
    padding: 5,
  },
  progressContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  youtubeVideo: {
    margin: '5px 5px 5px 0',

    '&:first-of-kind': {
      marginLeft: '5px',
    },
  },
});

export default function YoutubeComponent({ credentials, isProduction, nrOfVideos, showInfo, isDraggable }) {
  const [youtubeUserData, setYoutubeUserData] = useState(null);
  const [youtubeList, setYoutubeList] = useState(null);
  const classes = useStyles();
  console.log(showInfo);
  useEffect(() => {
    fetchYoutubeData(credentials);

    async function fetchYoutubeData(credentials) {
      if (!isProduction) {
        //Move to youtube
        const res = await axios('https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true', credentials);

        //`https://www.googleapis.com/youtube/v3/search`

        setYoutubeUserData(res.data.items[0]);
        const youData = await axios(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&part=contentDetails&chart=mostPopular&regionCode=SE&maxResults=${nrOfVideos}`,
          credentials
        );
        setYoutubeList(youData.data.items);
        /*
        GET https://www.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=10&mine=true&key=[YOUR_API_KEY] HTTP/1.1
        */
      } else {
        //Production (remove above when deploy )
        axios
          .get('https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true', credentials)
          .then((response) => response.json())
          .then(function (data) {
            setYoutubeUserData(data.items[0]);
          });
      }
    }
  }, [credentials, isProduction, nrOfVideos]);

  return (
    <Card className={classes.wrapperCard}>
      {!youtubeList && !youtubeUserData && (
        <div className={classes.progressContainer}>
          <CircularProgress></CircularProgress>
        </div>
      )}

      <div
        className={`${isDraggable && 'isDraggableContainer'}`}
        style={{
          height: '100%',
          padding: '0 5px',
          gap: '5px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        }}>
        {youtubeList &&
          youtubeUserData &&
          youtubeList.map((video, idx) => {
            return <YoutubeVideo data={video} key={idx} showInfo={showInfo} />;
          })}
      </div>
    </Card>
  );
}

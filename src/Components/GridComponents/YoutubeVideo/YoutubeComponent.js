import { Card, CircularProgress, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardTopLabel from '../CardTopLabel/CardTopLabel';
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
  scrollbar: {
    overflowY: 'auto',
  },
  youtubeGrid: {
    height: '100%',
    padding: '35px 5px',
    gap: '5px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
  },
  youtubeVideo: {
    margin: '5px 5px 5px 0',

    '&:first-of-kind': {
      marginLeft: '5px',
    },
  },
});

export default function YoutubeComponent({
  credentials,
  isProduction,
  nrOfVideos,
  showInfo,
  scrollbar,
  isDraggable,
  openSettings,
}) {
  const [youtubeUserData, setYoutubeUserData] = useState(null);
  const [youtubeList, setYoutubeList] = useState(null);
  const classes = useStyles();

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
        //TODO: Production ( remove above when deploy )

        const youData = await axios(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&part=contentDetails&chart=mostPopular&regionCode=SE&maxResults=${nrOfVideos}`,
          credentials
        );
        console.log(youData.data.items);
        setYoutubeList(youData.data.items);
      }
    }
  }, [credentials, isProduction, nrOfVideos]);

  return (
    <Card className={classes.wrapperCard}>
      <CardTopLabel compName="YouTube" openSettings={openSettings} />
      {!youtubeList && !youtubeUserData && (
        <div className={classes.progressContainer} style={{ paddingTop: '35px' }}>
          <CircularProgress></CircularProgress>
        </div>
      )}

      <div
        className={`${isDraggable && 'isDraggableContainer'}
        ${scrollbar && classes.scrollbar} ${classes.youtubeGrid}`}>
        {youtubeList &&
          youtubeList.map((video, idx) => {
            return <YoutubeVideo data={video} key={idx} showInfo={showInfo} />;
          })}
      </div>
    </Card>
  );
}

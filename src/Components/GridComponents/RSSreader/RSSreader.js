import React, { useEffect, useRef, useState } from 'react';
import { Card, IconButton, List, makeStyles } from '@material-ui/core';

import RssCard from './RssCard';
import RssList from './RssList';
import { parseDate } from '../../helperFunctions';
import CardTopLabel from '../CardTopLabel/CardTopLabel';
import { Refresh } from '@material-ui/icons';

const Parser = require('rss-parser');
const parser = new Parser({
  customFields: {
    item: [['media:content', 'media:content', { keepArray: true }]],
  },
});

const useStyles = makeStyles({
  innerPadding: {
    padding: '35px 5px ',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '5px',
  },
  wrapperCard: {
    height: '100%',
    borderRadius: 0,
    width: '100%',
    overflowY: 'auto',
    backgroundColor: '#dae0e6',
  },
  noPadding: {
    padding: '35px 0 0',
  },
});

const parseContent = (text) => {
  if (text) {
    let tempText = text.substring(2, text.length);
    if (tempText !== 'null') {
      return tempText;
    }
    return '';
  }
  return '';
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// https://rss.aftonbladet.se/rss2/small/pages/sections/aftonbladet/
export default function RSSreader({
  url,
  nrOfArticles,
  showContent,
  showImage,
  showTitle,
  layout,
  anchorOriginVertical,
  anchorOriginHorizontal,
  isDraggable,
  margin,
  openSettings,
  standAlone = false,
}) {
  const [data, setData] = useState(null);
  const classes = useStyles();

  useInterval(async () => {
    const data = await parser.parseURL(url);
    setData(data.items);
  }, 30000);

  useEffect(() => {
    async function loadRSS() {
      const data = await parser.parseURL(url);
      console.log(data);
      setData(data.items);
    }
    loadRSS();
  }, [url]);

  const updateLink = async () => {
    const data = await parser.parseURL(url);
    console.log(data);
    setData(data.items);
  };

  return (
    <Card className={classes.wrapperCard}>
      <CardTopLabel
        compName="NYT World News"
        openSettings={openSettings}
        additionalButton={
          <IconButton size={'small'} onClick={() => updateLink()}>
            {<Refresh fontSize={'small'} />}
          </IconButton>
        }
      />

      {data && (
        <>
          {layout === 'card' ? (
            <div
              className={`${isDraggable && 'isDraggableContainer'} ${
                classes.innerPadding
              }`}
            >
              {data.map((article, idx) => {
                if (idx < nrOfArticles) {
                  return (
                    <RssCard
                      key={idx}
                      title={article.title}
                      url={article.link}
                      src={article['media:content'][0].$.url}
                      date={article.isoDate}
                      showContent={showContent}
                      showImage={showImage}
                      showTitle={showTitle}
                      content={parseContent(article.content)}
                    />
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <List
              dense
              className={`${isDraggable && 'isDraggableContainer'} ${
                classes.noPadding
              }`}
            >
              {data.map((article, idx) => {
                if (idx < nrOfArticles) {
                  return (
                    <RssList
                      key={idx}
                      title={article.title}
                      url={article.link}
                      src={article['media:content'][0].$.url}
                      date={parseDate(Date.parse(article.isoDate))}
                      content={article.content}
                      showContent={showContent}
                      showImage={showImage}
                      showTitle={showTitle}
                      anchorOriginVertical={anchorOriginVertical}
                      anchorOriginHorizontal={anchorOriginHorizontal}
                      margin={margin}
                      standAlone={standAlone}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </List>
          )}
        </>
      )}
    </Card>
  );
}

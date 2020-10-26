import React, { useEffect, useRef, useState } from 'react';
import { Card, List, makeStyles } from '@material-ui/core';

import RssCard from './RssCard';
import RssList from './RssList';
import { parseDate } from '../../helperFunctions';
import CardTopLabel from '../CardTopLabel/CardTopLabel';

let Parser = require('rss-parser');
let parser = new Parser();

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
  rssRef,
  margin,
  openSettings,
}) {
  const [data, setData] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    async function loadRSS() {
      const data = await parser.parseURL(url);
      setData(data.items);
    }
    loadRSS();
  }, [url]);

  return (
    <Card className={classes.wrapperCard}>
      <CardTopLabel compName="Aftonbladet" openSettings={openSettings} />
      {data && (
        <>
          {layout === 'card' ? (
            <div className={`${isDraggable && 'isDraggableContainer'} ${classes.innerPadding}`}>
              {data.map((article, idx) => {
                if (idx < nrOfArticles) {
                  return (
                    <RssCard
                      key={idx}
                      title={article.title}
                      url={article.link}
                      src={article.enclosure?.url}
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
            <List dense className={`${isDraggable && 'isDraggableContainer'} ${classes.noPadding}`}>
              {data.map((article, idx) => {
                if (idx < nrOfArticles) {
                  return (
                    //TODO: ParseDate vid dagsbyten, fortsätt visa klockslag
                    <RssList
                      key={idx}
                      title={article.title}
                      url={article.link}
                      src={article.enclosure?.url}
                      date={parseDate(Date.parse(article.isoDate))}
                      content={article.content}
                      showContent={showContent}
                      showImage={showImage}
                      showTitle={showTitle}
                      anchorOriginVertical={anchorOriginVertical}
                      anchorOriginHorizontal={anchorOriginHorizontal}
                      margin={margin}
                      rssRef={rssRef}
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

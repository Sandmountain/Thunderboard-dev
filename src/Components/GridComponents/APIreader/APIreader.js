import React, { useEffect, useState } from 'react';
import {
  Card,
  Collapse,
  IconButton,
  List,
  makeStyles,
} from '@material-ui/core';

import ReaderList from './ReaderList';
import { parseDate } from '../../helperFunctions';
import CardTopLabel from '../CardTopLabel/CardTopLabel';
import { Refresh } from '@material-ui/icons';
import { Divider } from '@material-ui/core';

const Parser = require('rss-parser');
const parser = new Parser({
  // If using NY times.
  // customFields: {
  //   item: [['media:content', 'media:content', { keepArray: true }]],
  // },
});

const useStyles = makeStyles({
  innerPadding: {
    padding: '35px 5px ',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '5px',
  },
  wrapperCard: {
    maxHeight: '100%',
    borderRadius: 0,
    width: '100%',

    overflowY: 'auto',
    backgroundColor: '#dae0e6',
  },
  noPadding: {
    padding: '35px 0 0',
  },
});

// https://rss.aftonbladet.se/rss2/small/pages/sections/aftonbladet/
export default function APIreader({
  nrOfArticles,
  showContent,
  showImage,
  showTitle,
  url,
  anchorOriginVertical,
  anchorOriginHorizontal,
  isDraggable,
  margin,
  openSettings,
  standAlone = false,
}) {
  const [data, setData] = useState(undefined);
  const [isMinimized, setIsMinimized] = useState(true);

  const classes = useStyles();

  // const fetchData = async () => {
  //   Only works on localhost :(
  //   try {
  //     return await axios.get(
  //       `https://newsapi.org/v2/top-headlines?sources=bbc-news,reuters,google-news&apiKey=${process.env.REACT_APP_NEWS_API}`
  //     );
  //   } catch (error) {
  //     console.error("couldn't fetch news", error);
  //     return undefined;
  //   }
  //   Load RSS Instead
  // };

  useEffect(() => {
    async function loadRSS() {
      // const { data } = await fetchData();
      // setData(data.articles);
      const data = await parser.parseURL(url);
      console.log(data);
      setData(data.items);
    }
    if (data === undefined) {
      loadRSS();
    }
  }, [data, url]);

  const updateLink = async () => {
    // const { data } = await fetchData();
    // setData(data.articles);
    const data = await parser.parseURL(url);
    setData(data.items);
  };

  const minimizeComponent = () => {
    setIsMinimized((prev) => !prev);
  };

  return (
    <Collapse in={!isMinimized} collapsedHeight={34}>
      <Card className={`${classes.wrapperCard}`} id="newsContainer">
        <CardTopLabel
          compName="Aftonbladet"
          standAlone={standAlone}
          minimizeComponent={minimizeComponent}
          isMinimized={isMinimized}
          openSettings={openSettings}
          additionalButtons={[
            <>
              <Divider orientation="vertical" style={{ margin: '0 5px' }} />
              <IconButton size={'small'} onClick={updateLink}>
                {<Refresh fontSize={'small'} />}
              </IconButton>
            </>,
          ]}
        />
        {data && (
          <>
            <List
              dense
              className={`${isDraggable && 'isDraggableContainer'} ${
                classes.noPadding
              }`}
            >
              {data.map((article, idx) => {
                if (idx < nrOfArticles) {
                  return (
                    // If using API
                    // <ReaderList
                    //   key={idx}
                    //   title={article.title}
                    //   url={article.url}
                    //   src={article.urlToImage}
                    //   source={article.source.name}
                    //   date={parseDate(Date.parse(article.publishedAt))}
                    //   content={article.description}
                    //   showContent={showContent}
                    //   showImage={showImage}
                    //   showTitle={showTitle}
                    //   anchorOriginVertical={anchorOriginVertical}
                    //   anchorOriginHorizontal={anchorOriginHorizontal}
                    //   margin={margin}
                    //   standAlone={standAlone}
                    // />
                    <ReaderList
                      key={idx}
                      title={article.title}
                      url={article.url}
                      src={article.enclosure.url}
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
          </>
        )}
      </Card>
    </Collapse>
  );
}

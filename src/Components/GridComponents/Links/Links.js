import React, { useState, useRef } from 'react';
import { Card, CircularProgress, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { Delete, Link } from '@material-ui/icons';
import { openInNewTab } from '../../helperFunctions';

const useStyles = makeStyles({
  innerPadding: {
    padding: '5px',
  },
  wrapperCard: {
    height: '100%',
    borderRadius: 0,
    width: '100%',
    overflowY: 'auto',
    backgroundColor: '#dae0e6',
  },

  droppableArea: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  deleteCursor: {
    //cursor: `url(${deleteCursor}), all`,
    //cursor: 'pointer',
  },
  dragWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  dragContainer: {
    top: '50%',
    position: 'absolute',
    width: '80%',
    border: '1px dashed gray',
    background: 'white',
    padding: 5,
  },
  holdUrl: {
    cursor: 'grab',
  },
  clickUrl: {
    cursor: 'pointer',
  },
  addText: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
  },
});

export default function Links({ links, isDraggable, openSettings }) {
  const cardRef = useRef();
  const cardContainer = cardRef.current && cardRef.current.getBoundingClientRect();
  const classes = useStyles();
  const [draggedOutside, setDraggedOutside] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [urls, setUrls] = useState(links);
  const [holdingUrl, setHoldingUrl] = useState(false);

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHover(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsHover(true);
    e.stopPropagation();
  };

  const isOutside = (targetX, targetY, container) => {
    const diffX = targetX - cardContainer?.x;
    const diffY = targetY - cardContainer?.y;
    if (diffX < 0 || diffY < 0 || diffX > container?.width || diffY > container?.height) {
      return true;
    } else {
      return false;
    }
  };

  const dragLink = (e) => {
    e.preventDefault();
    const outside = isOutside(e.clientX, e.clientY, cardContainer);
    if (outside) {
      setDraggedOutside(true);
    } else {
      setDraggedOutside(false);
    }
    e.stopPropagation();
  };
  const dragLinkEnd = (e, src) => {
    isOutside(e.clientX, e.clientY, cardContainer) && setUrls(urls.filter((link) => link.src !== src));
    setDraggedOutside(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHover(false);

    try {
      let url = e.dataTransfer.getData('url');
      console.log(url);
      console.log(urls);
      if (!urls.find((link) => link.src === url)) {
        let parsedUrl = new URL(url);
        setUrls([
          ...urls,
          {
            href: `https://i.olsh.me/icon?url=${parsedUrl.hostname}&size=12..120..200`,
            src: url,
            name: parsedUrl.hostname,
          },
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={`${isHover && classes.fileHover} ${classes.wrapperCard} `} ref={cardRef}>
      <div
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        className={classes.droppableArea}>
        <div className={`${isDraggable && 'isDraggableContainer'} ${classes.innerPadding}`}>
          {draggedOutside && (
            <div className={classes.dragWrapper}>
              <div className={classes.dragContainer}>
                <Typography align="center" justify="center" style={{ fontWeight: 'bold' }}>
                  <Delete style={{ verticalAlign: 'bottom' }}></Delete> Delete Link
                </Typography>
              </div>
            </div>
          )}
          {isHover && (
            <div className={classes.dragWrapper}>
              <div className={classes.dragContainer}>
                <Typography align="center" justify="center" style={{ fontWeight: 'bold' }}>
                  <Link style={{ verticalAlign: 'bottom' }}></Link>
                  Add link
                </Typography>
              </div>
            </div>
          )}
          {urls.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(32px, 1fr))',
                gridTemplateRows: 'repeat(auto-fit)',
                height: '100%',
                gap: 5,
                overflow: 'hidden',
              }}>
              {urls.map((url, idx) => {
                return (
                  <Tooltip key={idx} placement="top" title={url.src}>
                    <div className={holdingUrl ? classes.holdUrl : classes.clickUrl}>
                      <img
                        onClick={() => openInNewTab(url.src)}
                        src={url.href}
                        alt={url.href}
                        style={{ width: '100%' }}
                        draggable={true}
                        onDrag={dragLink}
                        onDragEnd={(e) => dragLinkEnd(e, url.src)}
                      />
                    </div>
                  </Tooltip>
                );
              })}
            </div>
          ) : (
            <>
              <Typography align="center" className={classes.addText}>
                <Link fontSize="small" style={{ verticalAlign: 'text-bottom' }}></Link> Add links by dragging an url
                here
              </Typography>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

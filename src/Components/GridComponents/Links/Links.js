import React, { useState, useRef } from 'react';
import { Card, IconButton, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { Check, Delete, Link } from '@material-ui/icons';
import { openInNewTab, moveArrayItemToNewIndex } from '../../helperFunctions';
import { updateFirestoreCollection } from '../../../Firestore/FirestoreFunctions';

const useStyles = makeStyles({
  innerPadding: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: '100%',
  },
  wrapperCard: {
    height: '100%',
    borderRadius: 0,
    width: '100%',
    overflowY: 'auto',
  },

  droppableArea: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  dragWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  dragContainer: {
    position: 'absolute',
    width: '80%',
    border: '1px dashed gray',
    background: 'white',
    padding: 5,
  },
  linksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(20px, 1fr))',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    overflow: 'hidden',
    padding: 5,
  },
  holdUrl: {
    cursor: 'grab',
  },
  clickUrl: {
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    maxHeight: 16,
  },
  addText: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
  },
});

export default function Links({ links, isDraggable, settings, setSettings }) {
  const cardRef = useRef();
  const cardContainer = cardRef.current && cardRef.current.getBoundingClientRect();
  const classes = useStyles();
  const [draggedOutside, setDraggedOutside] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isSavedLink, setIsSavedLink] = useState(false);

  const [currentDraggedLink, setCurrentDraggedLink] = useState(null);
  const [newChanges, setNewChanges] = useState(false);

  const [urls, setUrls] = useState(links);

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHover(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isSavedLink) {
      setIsHover(true);
    } else {
      // Handles movement of links
      const hoveredLink = e.target.querySelector('img').src;
      const currLinkIndex = urls.findIndex((obj) => obj.href === currentDraggedLink);
      const hoveredLinkIndex = urls.findIndex((obj) => obj.href === hoveredLink);

      if (currLinkIndex !== hoveredLinkIndex) {
        setUrls(moveArrayItemToNewIndex(urls, currLinkIndex, hoveredLinkIndex));
        setNewChanges(true);
      }
    }
    e.stopPropagation();
  };

  const saveChanges = () => {
    setSettings({
      ...settings,
      linksSettings: {
        ...settings.linksSettings,
        links: urls,
      },
    });
    updateFirestoreCollection({
      linksSettings: {
        ...settings.linksSettings,
        links: urls,
      },
    });
    setNewChanges(false);
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

  const dragLink = (e, href) => {
    e.preventDefault();
    setIsSavedLink(true);
    setCurrentDraggedLink(href);

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
    setIsSavedLink(false);
    setCurrentDraggedLink('');
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHover(false);

    if (isSavedLink) {
      setIsSavedLink(false);
      setCurrentDraggedLink('');
      return;
    }

    try {
      let url = e.dataTransfer.getData('url');

      if (!urls.find((link) => link.src === url)) {
        const parsedUrl = new URL(url);
        const newUrl = {
          href: `https://api.faviconkit.com/${parsedUrl.hostname}`,
          src: url,
          name: parsedUrl.hostname,
        };

        setUrls([...urls, newUrl]);

        updateFirestoreCollection({
          linksSettings: {
            ...settings.linksSettings,
            links: [...urls, newUrl],
          },
        });
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
            <div className={classes.linksGrid}>
              {urls.map((url, idx) => {
                return (
                  <Tooltip key={idx} placement="top" title={url.src}>
                    <div className={`${classes.clickUrl}`}>
                      <div
                        className={classes.linkContainer}
                        onClick={() => openInNewTab(url.src)}
                        draggable={true}
                        onDrag={(e) => dragLink(e, url.href)}
                        onDragEnd={(e) => dragLinkEnd(e, url.src)}>
                        <img style={{ width: '100%', objectFit: 'contain' }} src={url.href} alt={url.href} />
                      </div>
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
      {links !== urls ||
        (newChanges && (
          <IconButton
            size="small"
            style={{ position: 'absolute', right: 0, color: 'green' }}
            onClick={() => saveChanges()}>
            <Check></Check>
          </IconButton>
        ))}
    </Card>
  );
}

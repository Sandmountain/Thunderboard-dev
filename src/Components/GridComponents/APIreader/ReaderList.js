import { Box, Card, makeStyles, Popover, Typography } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';
import React, { useState, useRef } from 'react';

import { openInNewTab } from '../../helperFunctions';

const useStyles = makeStyles({
  articleText: {
    paddingRight: '12px',
    alignSelf: 'center',
  },
  iconContainer: {
    marginLeft: 'auto',
    alignSelf: 'center',
    display: 'inline-flex',
  },
  articleCard: {
    transition: 'none',
    borderRadius: 0,
    width: '100%',
    padding: '5px',
  },
  articleCardHover: {
    cursor: 'pointer',
    zIndex: 2,
    position: 'relative',
    boxShadow:
      '0px 2px 3px -1px rgba(0,0,0,0.2), 0px -2px 3px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12), inset 0 0 0 1px #f1f1f1',
  },
  articleListItem: {
    display: 'flex',
    flexDirection: 'row',
    whiteSpace: 'nowrap',
  },
  articleListItemText: {
    marginLeft: '0.25em',
    width: 'auto',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  articleListItemTextGray: {
    color: 'gray',
    fontWeight: '300',
    marginLeft: '0.25em',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    borderRadius: 0,
    //minHeight: '110px',
  },
  popoverTitleWrapper: {
    minHeight: 95,
    overflow: 'hidden',
  },
  popoverTitleContainer: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  popoverTitleText: {},
  popoverContentContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    overflow: 'hidden',
  },
  popoverContentInnerContainer: {
    // width: 'calc(50% - 2.5px)',
    // height: 'auto',
    // maxHeight: 150,
  },
  popoverContentImage: {
    maxHeight: 120,
    width: 'auto',
    maxWidth: '100%',
  },
});

export default function ReaderList({
  title,
  src,
  url,
  date,
  content,
  source = '',
  anchorOriginHorizontal,
  anchorOriginVertical,
  margin,
  standAlone,
}) {
  const classes = useStyles();
  const childRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentWidth, setCurrentWidth] = useState(0);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handlePopoverOpen = () => {
    setCurrentWidth(childRef.current?.parentNode.offsetParent.clientWidth);

    setAnchorEl(childRef.current.parentNode.offsetParent);
  };

  const open = Boolean(anchorEl);

  return (
    <Card
      ref={childRef}
      aria-haspopup="true"
      className={` ${classes.articleCard} ${open && classes.articleCardHover} 
        `}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <Typography variant="body2" component="div">
        <Box className={classes.articleText} onClick={() => openInNewTab(url)}>
          <div className={classes.articleListItem}>
            <Box>{date}</Box>
            <Box component="a" className={classes.articleListItemText}>
              <strong>{title}</strong>
              <span className={classes.articleListItemTextGray}>{content}</span>
            </Box>

            {open && (
              <div className={classes.iconContainer}>
                <OpenInNew style={{ fontSize: '1.2em' }} />
              </div>
            )}
          </div>
        </Box>
      </Typography>

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        style={{ margin: 0, padding: 0 }}
        elevation={18}
        open={open}
        anchorEl={anchorEl}
        classes={{
          paper: classes.paper,
        }}
        anchorReference={standAlone ? 'anchorPosition' : 'anchorEl'}
        anchorOrigin={{
          vertical: anchorOriginVertical,
          horizontal: anchorOriginHorizontal,
        }}
        anchorPosition={{
          top:
            document.getElementById('newsContainer').getBoundingClientRect()
              .top - 102,
          left: window.innerWidth / 2 - currentWidth / 2,
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div
          className={classes.popoverTitleWrapper}
          style={{
            width: standAlone ? currentWidth : currentWidth + 150,
          }}
        >
          <div style={{ padding: '5px 5px 0px 5px' }}>
            <Typography
              variant="body1"
              className={classes.popoverTitleContainer}
            >
              <Box
                component="span"
                className={classes.popoverTitleText}
                fontWeight={'fontWeightBold'}
                style={{ width: currentWidth - 10 }}
              >
                {title}
              </Box>
            </Typography>
            <div className={classes.popoverContentContainer}>
              <div
                className={classes.popoverContentInnerContainer}
                style={{ marginRight: 6, minWidth: 80 }}
              >
                {src && (
                  <img
                    src={src}
                    className={classes.popoverContentImage}
                    alt={title}
                  />
                )}
                {source !== '' && (
                  <Typography align="left" variant="overline">
                    Source: {source}
                  </Typography>
                )}
              </div>
              <div className="rssNewsContent-text">
                <Typography align="left" variant="caption">
                  {content}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Popover>
    </Card>
  );
}

import { Avatar, Badge, makeStyles, Popover, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { twitchViewsCount } from '../helperFunctions/getViewCount';
import TwitchStreamPopup from '../TwitchStreamPopup';
import RedDot from './icons/RedDot';

const useStyles = makeStyles({
  cardOnHover: {
    background: '#e6e6ea',
    cursor: 'pointer',
  },
  cardContainer: {
    height: '1.5em',
    marginBottom: '5px',
    display: 'flex',
    justifyContent: 'center',
  },
  offlineChannel: {
    filter: 'grayscale(100%) contrast(85%)',
    opacity: 0.8,
  },
  popover: {
    pointerEvents: 'none',
  },
  popoverPaper: {
    width: 200,
    overflow: 'hidden',
    padding: 5,
  },
  popoverTextDescription: {
    fontSize: '.65rem',
    padding: '5px 0',
    lineHeight: 1,
  },
  popoverLiveContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  sideBarTextBold: {
    fontSize: '.65rem',
    fontWeight: 'bold',
    lineHeight: 1,
  },
  sideBarText: {
    fontSize: '.65rem',
    lineHeight: 1,
  },
  avatarContainer: {
    display: 'flex',
    height: '100%',
    padding: '2.5px 5px',
    margin: '2.5px 0',
  },
  avatarSize: {
    height: '1em',
    width: '1em',
  },
  thinText: {
    fontWeight: '200',
  },
});

function TwitchUserCardClosed({ data, useSideBar }) {
  const classes = useStyles();
  const isLive = data.type === 'live';

  const [hoveredCard, setHoveredCard] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const onHover = (event) => {
    setHoveredCard(true);
    setAnchorEl(event.currentTarget);
  };

  const onHoverLeave = () => {
    setAnchorEl(null);
    setHoveredCard(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className={classes.cardContainer}
        onMouseEnter={onHover}
        onMouseOver={onHover}
        onMouseLeave={onHoverLeave}
        onClick={handleClickOpen}>
        <div className={`${hoveredCard ? classes.cardOnHover : ''} ${classes.avatarContainer}`}>
          <Badge color="secondary" variant="dot" overlap="circle" invisible={!isLive || useSideBar}>
            <Avatar
              src={data.profile_image_url}
              className={`${!isLive ? classes.offlineChannel : ''} ${classes.avatarSize}`}
              alt=""
            />
          </Badge>
        </div>
        <Popover
          className={classes.popover}
          classes={{
            paper: classes.popoverPaper,
          }}
          open={hoveredCard}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={onHoverLeave}
          disableRestoreFocus>
          {isLive ? (
            <Typography className={`${classes.sideBarTextBold} ${isLive && 'twitchLiveTextColor'}`}>
              {data.user_name} - <span className={classes.thinText}>{data.game_name}</span>
            </Typography>
          ) : (
            <Typography className={`${classes.sideBarTextBold}`}>{data.display_name}</Typography>
          )}
          <Typography className={classes.popoverTextDescription}>
            {data.title ? data.title : data.description}
          </Typography>

          <div className="flexContainer greyText">
            {isLive ? (
              <div className={classes.popoverLiveContainer}>
                <RedDot />
                <Typography className={classes.sideBarText}>
                  Live | {twitchViewsCount(data.viewer_count.toString())}
                </Typography>
              </div>
            ) : (
              <Typography className={classes.sideBarText}>Offline</Typography>
            )}
          </div>
        </Popover>
      </div>
      <TwitchStreamPopup
        open={open}
        handleClose={handleClose}
        user_name={data.user_name ? data.user_name : data.display_name}></TwitchStreamPopup>
    </>
  );
}

export default TwitchUserCardClosed;

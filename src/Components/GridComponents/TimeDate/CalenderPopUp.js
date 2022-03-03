import {
  Badge,
  List,
  ListItem,
  makeStyles,
  Popover,
  Typography,
  withStyles,
} from '@material-ui/core';
import { EventNote } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { openInNewTab } from '../../helperFunctions';

import {
  getEvents,
  parseDate,
  sortEvents,
  generateColor,
  getPopUpDate,
} from './functions/timeDateFunctions';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    margin: 0,
    padding: 5,
  },
  popUpEvents: {
    display: 'flex',
    placeSelf: 'center',
    height: '0.5em',
    width: '0.5em',
    borderRadius: '100%',
    marginRight: '0.2em',
  },
  eventName: {
    marginLeft: '0.2em',
  },
  standAloneIcon: {
    color: 'white',
  },
}));

const StyledBadgeLeft = withStyles((theme) => ({
  badge: {
    right: 23,
    top: 10,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const StyledBadgeRight = withStyles((theme) => ({
  badge: {
    right: -2,
    top: 11,
    height: 16,
    minWidth: 16,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function CalenderPopUp({ gCalenderData, right, standAlone }) {
  const [parsedCalenderData, setParsedCalenderData] = useState(null);
  const [colors, getColors] = useState(null);
  const [calenderData, setCalenderDate] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const classes = useStyles();

  useEffect(() => {
    if (!parsedCalenderData) {
      setParsedCalenderData(getEvents(gCalenderData));
    }
  }, [parsedCalenderData, gCalenderData]);

  useEffect(() => {
    if (parsedCalenderData) {
      setCalenderDate(sortEvents(parsedCalenderData));
      getColors(generateColor(gCalenderData));
    }
  }, [parsedCalenderData, gCalenderData]);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  //TODO: All events doesn't appear to show up. Both in Google Calender and here (from mpya).
  // Check what calenders are loaded (atm, mpya is not loaded into this app).

  return (
    <>
      {calenderData && calenderData.length > 0 && (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'end',
            }}
          >
            <Typography
              style={{ lineHeight: 1, marginLeft: 2 }}
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              {right ? (
                <StyledBadgeRight
                  badgeContent={calenderData && calenderData.length}
                  color="secondary"
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    openInNewTab('https://calendar.google.com/calendar')
                  }
                >
                  <EventNote
                    style={{ fontSize: '1em' }}
                    className={`${standAlone && classes.standAloneIcon} ${
                      standAlone && 'textShadow'
                    }`}
                  />
                </StyledBadgeRight>
              ) : (
                <StyledBadgeLeft
                  badgeContent={calenderData && calenderData.length}
                  color="secondary"
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    openInNewTab('https://calendar.google.com/calendar')
                  }
                >
                  <EventNote fontSize={'small'} />
                </StyledBadgeLeft>
              )}
            </Typography>
          </div>
          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography align="center">{getPopUpDate()}</Typography>
            <List dense style={{ padding: 0, margin: 0 }}>
              {calenderData &&
                calenderData.map((calEvent, idx) => {
                  return (
                    <ListItem key={idx} style={{ padding: 0, margin: 0 }}>
                      <Typography
                        component="div"
                        style={{ display: 'flex', fontSize: '10pt' }}
                      >
                        <span
                          className={classes.popUpEvents}
                          style={{
                            background: `${colors[calEvent.calenderName]}`,
                          }}
                        ></span>
                        {parseDate(calEvent.startTime).time}{' '}
                        <strong className={classes.eventName}>
                          {calEvent.name}
                        </strong>
                      </Typography>
                    </ListItem>
                  );
                })}
            </List>
          </Popover>
        </>
      )}
    </>
  );
}

import React, { useState } from 'react';

import { Chip, makeStyles, Menu, MenuItem } from '@material-ui/core';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles({
  filterContainer: {
    width: '630px',
    margin: '0 auto',
    padding: '5px',
  },
  progressCircle: {
    width: '630px',
    padding: '5px',
    margin: '10px auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
  },
  activeChip: {
    color: '#ff4500',
  },
  chip: {
    marginRight: '5px',
  },
});

export default function RedditFilter(props) {
  const { activeFilter } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTimeSpan, setActiveTimeSpan] = useState('Today');
  const classes = useStyles();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (time, label) => {
    setAnchorEl(null);
    if (time) {
      props.setActiveFilter({ ...activeFilter, time });
      setActiveTimeSpan(label);
    }
  };

  const handleClick = (type) => {
    props.setActiveFilter({ ...activeFilter, type: type });
  };
  return (
    <>
      <Chip
        className={classes.chip}
        onClick={() => handleClick('hot')}
        icon={<WhatshotIcon className={activeFilter.type === 'hot' && classes.activeChip} />}
        size={'small'}
        label={<strong>Hot</strong>}></Chip>
      <Chip
        className={classes.chip}
        onClick={() => handleClick('new')}
        icon={<Brightness5Icon className={activeFilter.type === 'new' && classes.activeChip} />}
        size={'small'}
        label={<strong>New</strong>}></Chip>
      <Chip
        className={classes.chip}
        onClick={() => handleClick('top')}
        icon={<TrendingUpIcon className={activeFilter.type === 'top' && classes.activeChip} />}
        size={'small'}
        label={<strong>Top</strong>}></Chip>
      {activeFilter.type === 'top' && (
        <>
          <Chip
            style={{ justifyContent: 'end' }}
            size={'small'}
            label={<strong>{activeTimeSpan}</strong>}
            deleteIcon={<ArrowDropDownIcon />}
            onDelete={handleMenuClick}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}></Chip>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleMenuClose}>
            <MenuItem onClick={() => handleMenuClose('day', 'Today')}>Today</MenuItem>
            <MenuItem onClick={() => handleMenuClose('week', 'This Week')}>This Week</MenuItem>
            <MenuItem onClick={() => handleMenuClose('month', 'This Month')}>This Month</MenuItem>
            <MenuItem onClick={() => handleMenuClose('year', 'This Year')}>This Year</MenuItem>
            <MenuItem onClick={() => handleMenuClose('all', 'All Time')}>All Time</MenuItem>
          </Menu>
        </>
      )}
    </>
  );
}

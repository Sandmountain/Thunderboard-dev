import React, { useState } from 'react';
import { IconButton, Card, Typography, Box, makeStyles, CardActions } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArchiveIcon from '@material-ui/icons/Archive';
import AttachmentIcon from '@material-ui/icons/AttachmentOutlined';

import { openInNewTab, parseDate } from '../../helperFunctions.js';

const parseMailData = (data) => {
  let tempObj = {
    unread: false,
    subject: '',
    date: '',
    from: '',
    fromName: '',
    body: '',
    attachment: false,
    id: data.id,
  };
  data.labelIds.forEach((id) => {
    if (id === 'UNREAD') {
      tempObj.unread = true;
    }
  });

  if (data.payload.parts?.length > 0) {
    data.payload.parts.forEach((part) => {
      if (part.body.hasOwnProperty('attachmentId')) {
        tempObj.attachment = true;
      }
    });
  }

  data.payload.headers.forEach((head, idx) => {
    if (head.name === 'Subject') {
      tempObj.subject = head.value;
    } else if (head.name === 'Date') {
      tempObj.date = parseDate(head.value);
    } else if (head.name === 'From') {
      //If the sender doesn't only have a mail address
      if (head.value.match(/<(.*?)>/)) {
        tempObj.fromName = head.value.replace(/<(.*?)>/, '').replace(/"/g, '');
        tempObj.from = head.value.match(/<(.*?)>/)[1];
      } else {
        tempObj.fromName = head.value;
      }
    }
  });
  //tempArr.push(data.payload.headers.name.find('Subject' && 'Date' && 'From'));
  return tempObj;
};

const useStyles = makeStyles({
  mailGrid: {
    display: 'grid',
    gridTemplateColumns: '0.5fr 1.5fr 0.5fr',
  },
  mailText: {
    paddingLeft: '12px',
    paddingRight: '12px',
    alignSelf: 'center',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
  },
  mailDate: {
    display: 'inline-flex',
    paddingRight: '12px',
    alignContent: 'center',
    justifyContent: 'flex-end',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
  },
  iconContainer: {
    padding: '0 12px 0 0',
    justifyContent: 'flex-end',
  },
  mailCard: {
    transition: 'none',
    borderRadius: 0,
    padding: '5px',
  },
  mailCardHover: {
    cursor: 'pointer',
    zIndex: 2,
    position: 'relative',
    padding: '1px',
    boxShadow:
      '0px 2px 3px -1px rgba(0,0,0,0.2), 0px -2px 3px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12), inset 0 0 0 1px #f1f1f1',
  },
  readMailCard: {
    background: 'rgba(242,245,245,0.8)',
  },
  endIcon: {
    fontSize: '1rem',
    position: 'relative',
    top: '2px',
    paddingRight: '3px',
  },
});

export default function GoogleMail({ data, credentials, isProduction, isDraggable }) {
  const mailData = parseMailData(data);
  const classes = useStyles();
  const [isHover, setIsHover] = useState(false);

  return (
    <Card
      className={` ${classes.mailCard} ${!mailData.unread && classes.readMailCard} ${isHover && classes.mailCardHover} 
        `}
      onMouseEnter={() => setIsHover(true)}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <Typography variant="body2" component="div" className={classes.mailGrid}>
        <Box
          fontWeight={mailData.unread ? 'fontWeightBold' : 'fontWeightLight'}
          className={classes.mailText}
          onClick={() => openInNewTab(mailData.id, 'https://mail.google.com/mail/u/0/#inbox/')}>
          {mailData.fromName}
        </Box>
        <Box
          fontWeight={mailData.unread ? 'fontWeightBold' : 'fontWeightLight'}
          className={classes.mailText}
          onClick={() => openInNewTab(mailData.id, 'https://mail.google.com/mail/u/0/#inbox/')}>
          {mailData.subject}
        </Box>
        {isHover ? (
          <CardActions disableSpacing className={classes.iconContainer}>
            <IconButton size="small" edge="end" aria-label="archive">
              <ArchiveIcon style={{ fontSize: '1.4rem' }} />
            </IconButton>
            <IconButton size="small" edge="end" aria-label="delete">
              <DeleteIcon style={{ fontSize: '1.4rem' }} />
            </IconButton>
          </CardActions>
        ) : (
          <>
            <div className={classes.mailDate}>
              {mailData.attachment && <AttachmentIcon className={classes.endIcon} />}
              <Box fontWeight={mailData.unread ? 'fontWeightBold' : 'fontWeightLight'}>{mailData.date}</Box>
            </div>
          </>
        )}
      </Typography>
    </Card>
  );
}

/*
   <ListItem button>
        <ListItemText primary={mailData.subject + ' - ' + data.snippet} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
*/

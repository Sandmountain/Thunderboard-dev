import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CardTopLabel from '../CardTopLabel/CardTopLabel';
import GoogleMail from './GoogleMail';
import { List } from '@material-ui/core';

export default function GoogleMailComponent({ credentials, isProduction, nrOfMails, isDraggable, openSettings }) {
  const [mailData, setMailData] = useState(null);
  const [unreadMails, setUnreadMails] = useState(0);

  useEffect(() => {
    async function fetchGoogleMailData(credentials) {
      //Move to gmail
      const inboxData = await axios(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages?labelIds=INBOX&q=in:inbox -category:(promotions OR social)&maxResults=${nrOfMails}`,
        credentials
      );

      const mailData = await Promise.all(
        inboxData.data.messages.map(async (message, idx) => {
          return await axios(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`, credentials).then(
            (res) => {
              return res.data;
            }
          );
        })
      );
      setMailData(mailData);
    }
    fetchGoogleMailData(credentials);
  }, [credentials, isProduction, nrOfMails]);

  const nrOfUnreadMails = () => {
    return mailData.reduce((counter, obj) => {
      if (obj.labelIds.indexOf('UNREAD') !== -1) {
        counter += 1;
      }
      return counter;
    }, 0);
  };

  mailData && !unreadMails && setUnreadMails(nrOfUnreadMails());

  return (
    <>
      <CardTopLabel
        compName={'Gmail'}
        leftAlignedInfo={
          unreadMails > 0 && (
            <span style={{ fontSize: '0.7rem', verticalAlign: 'text-bottom', lineHeight: '1.2rem' }}>
              <strong> ({unreadMails}) </strong>
            </span>
          )
        }
        openSettings={openSettings}
      />
      <List style={{ padding: 0, width: '100%', height: '100%', overflowY: 'auto', background: 'white' }}>
        <div className={`${isDraggable && 'isDraggableContainer'}`} style={{ paddingTop: '35px' }}>
          {mailData &&
            mailData.map((mail, idx) => {
              return <GoogleMail data={mail} key={idx} credentials={credentials} isProduction={isProduction} />;
            })}
        </div>
      </List>
    </>
  );
}

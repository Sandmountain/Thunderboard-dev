import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CardTopLabel from '../CardTopLabel/CardTopLabel';
import GoogleMail from './GoogleMail';
import { List } from '@material-ui/core';

export default function GoogleMailComponent({ credentials, isProduction, nrOfMails, isDraggable, openSettings }) {
  const [mailData, setMailData] = useState(null);
  useEffect(() => {
    fetchGoogleMailData(credentials);

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
  }, [credentials, isProduction, nrOfMails]);

  return (
    <>
      <List style={{ padding: 0, width: '100%', height: '100%', overflowY: 'auto', background: 'white' }}>
        <CardTopLabel compName={'Gmail'} openSettings={openSettings} />
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import GoogleMail from './GoogleMail';
import { List } from '@material-ui/core';

export default function GoogleMailComponent({ credentials, isProduction, nrOfMails, isDraggable }) {
  const [mailData, setMailData] = useState(null);
  console.log(nrOfMails);
  useEffect(() => {
    fetchGoogleMailData(credentials);

    async function fetchGoogleMailData(credentials) {
      if (!isProduction) {
        //Move to gmail
        const inboxData = await axios(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages?labelIds=INBOX&q=in:inbox -category:(promotions OR social)&maxResults=${nrOfMails}`,
          credentials
        );

        const mailData = await Promise.all(
          inboxData.data.messages.map(async (message, idx) => {
            return await axios(
              `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
              credentials
            ).then((res) => {
              return res.data;
            });
          })
        );
        setMailData(mailData);
      } else {
      }
    }
  }, [credentials, isProduction, nrOfMails]);

  return (
    <List style={{ background: 'white', width: '100%', height: '100%', overflowY: 'auto', padding: 0 }}>
      <div className={`${isDraggable && 'isDraggableContainer'}`}>
        {mailData &&
          mailData.map((mail, idx) => {
            return <GoogleMail data={mail} key={idx} credentials={credentials} isProduction={isProduction} />;
          })}
      </div>
    </List>
  );
}

const months = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
];
const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

export const parseDate = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDate();
  let weekday = days[date.getDay()];
  let month = months[date.getMonth()];
  let monthNr = date.getMonth();
  let year = date.getFullYear();

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return {
    time: hours + ':' + minutes,
    weekday,
    day,
    month,
    monthNr,
    year,
  };
};

export const getMinMaxDate = () => {
  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (today.getHours() < 19) {
    return {
      minDate: new Date(today.setHours(7, 0, 0)).toISOString(),
      maxDate: new Date(today.setHours(24, 0, 0)).toISOString(),
    };
  } else {
    return {
      minDate: new Date(today.setHours(today.getHours(), 0, 0)).toISOString(),
      maxDate: new Date(tomorrow.setHours(24, 0, 0)).toISOString(),
      // minDate: new Date(tomorrow.setHours(7, 0, 0)).toISOString(),
      // maxDate: new Date(tomorrow.setHours(23, 59, 0)).toISOString(),
    };
  }
};

export const getPopUpDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (today.getHours() < 19) {
    return `${months[today.getMonth()] + ' ' + today.getDate()}`;
  } else {
    return `${'Tomorrow ' + tomorrow.getDate() + '/' + (tomorrow.getMonth() + 1)}`;
  }
};

export const getEvents = (calenderData) => {
  if (calenderData && calenderData.length > 0) {
    const events = [];
    calenderData.forEach((event) => {
      events.push(...event.items);
    });
    return events;
  }
};

export const sortEvents = (events) => {
  const parsedData = events.map((event) => {
    return {
      calenderName: event.creator?.email ? findSelf(event) : null,
      name: event.summary,
      creator: event.creator?.email ? event.creator?.email : '',
      startTime: new Date(event?.start?.dateTime),
      endTime: new Date(event?.end?.dateTime),
    };
  });

  //remove duplicates if reoccuring event
  const onlyUniques = parsedData.filter(
    (v, i, a) => a.findIndex((t) => t.creator === v.creator && t.name === v.name) === i
  );

  const sortedByTime = onlyUniques.sort((a, b) => {
    let aTime = a.startTime.getHours() + a.startTime.getMinutes() / 60;
    let bTime = b.startTime.getHours() + b.startTime.getMinutes() / 60;
    return aTime - bTime;
  });
  return sortedByTime;
};

const findSelf = (event) => {
  if (event?.attendees) {
    return event.attendees.find((attendee) => attendee.self)?.email;
  } else if (event?.creator?.self) {
    return event.creator?.email;
  } else {
    return null;
  }
};

export const generateColor = (calenders) => {
  return calenders.reduce((prev, curr, idx) => ({ ...prev, [curr.summary]: generateColorData(idx) }), {});
};

const generateColorData = (idx) => {
  if (idx < colorArray.length) {
    return colorArray[idx];
  } else {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
};

const colorArray = ['#d23a46', '#5607d4', '#4f3d91', '#c87807', '#66cccc'];

export const mockData = [
  {
    kind: 'calendar#events',
    etag: '"p33c99o56jf9uo0g"',
    summary: 'sandtain@gmail.com',
    updated: '2020-10-26T21:35:17.351Z',
    timeZone: 'Europe/Oslo',
    accessRole: 'owner',
    defaultReminders: [
      {
        method: 'popup',
        minutes: 30,
      },
    ],
    nextSyncToken: 'CNiU4Kab0-wCENiU4Kab0-wCGAU=',
    items: [
      {
        kind: 'calendar#event',
        etag: '"3207494304084000"',
        id: '0taanvrk4vlbqqsidr6lp9h17u',
        status: 'confirmed',
        htmlLink: 'https://www.google.com/calendar/event?eid=MHRhYW52cms0dmxicXFzaWRyNmxwOWgxN3Ugc2FuZHRhaW5AbQ',
        created: '2020-10-26T21:18:59.000Z',
        updated: '2020-10-26T21:19:12.120Z',
        summary: 'Test event',
        creator: {
          email: 'sandtain@gmail.com',
          self: true,
        },
        organizer: {
          email: 'sandtain@gmail.com',
          self: true,
        },
        start: {
          dateTime: '2020-10-27T10:00:00+01:00',
        },
        end: {
          dateTime: '2020-10-27T10:30:00+01:00',
        },
        transparency: 'transparent',
        iCalUID: '0taanvrk4vlbqqsidr6lp9h17u@google.com',
        sequence: 1,
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: 'popup',
              minutes: 30,
            },
          ],
        },
      },
    ],
  },
  {
    kind: 'calendar#events',
    etag: '"p3248vjnalr9eo0g"',
    summary: 'viktor.sandberg@digiexam.se',
    updated: '2020-10-26T13:30:00.197Z',
    timeZone: 'Europe/Stockholm',
    accessRole: 'reader',
    defaultReminders: [],
    nextSyncToken: 'CIiPzuqu0uwCEIiPzuqu0uwCGAE=',
    items: [
      {
        kind: 'calendar#event',
        etag: '"3202722207706000"',
        id: '404ln0jbpduad89aghgrms7o97',
        status: 'confirmed',
        htmlLink:
          'https://www.google.com/calendar/event?eid=NDA0bG4wamJwZHVhZDg5YWdoZ3JtczdvOTdfMjAyMDA1MTJUMDcxNTAwWiB2aWt0b3Iuc2FuZGJlcmdAZGlnaWV4YW0uc2U',
        created: '2020-05-07T14:11:35.000Z',
        updated: '2020-09-29T06:31:43.853Z',
        summary: 'Weekly Stand Up',
        description:
          'Kind of like a stand up but longer. \n\nEach member of the team should answer the following three questions: \n- What did I do yesterday\n- What will I do today\n- Are there any blockers that prevents me or the development team from meeting the sprint goal?  \n\nOther than the above the discussion is free. ',
        creator: {
          email: 'kenan.tulic@digiexam.se',
        },
        organizer: {
          email: 'digiexam.se_mec2n7umgboj9jbs7ffscbatvc@group.calendar.google.com',
          displayName: 'Tech',
        },
        start: {
          dateTime: '2020-05-12T09:15:00+02:00',
          timeZone: 'Europe/Stockholm',
        },
        end: {
          dateTime: '2020-05-12T10:00:00+02:00',
          timeZone: 'Europe/Stockholm',
        },
        recurrence: ['RRULE:FREQ=WEEKLY;UNTIL=20200907T215959Z;BYDAY=TU'],
        iCalUID: '404ln0jbpduad89aghgrms7o97@google.com',
        sequence: 1,
        attendees: [
          {
            email: 'sovanny.huy@digiexam.se',
            responseStatus: 'accepted',
          },
          {
            email: 'tech@digiexam.se',
            displayName: 'Tech',
            responseStatus: 'needsAction',
          },
          {
            email: 'roman.priscepov@digiexam.se',
            responseStatus: 'accepted',
          },
          {
            email: 'viktor.sandberg@digiexam.se',
            self: true,
            responseStatus: 'accepted',
          },
        ],
        hangoutLink: 'https://meet.google.com/hhr-mwqz-bmp',
        conferenceData: {
          entryPoints: [
            {
              entryPointType: 'video',
              uri: 'https://meet.google.com/hhr-mwqz-bmp',
              label: 'meet.google.com/hhr-mwqz-bmp',
            },
            {
              entryPointType: 'more',
              uri: 'https://tel.meet/hhr-mwqz-bmp?pin=1714837202570',
              pin: '1714837202570',
            },
            {
              regionCode: 'SE',
              entryPointType: 'phone',
              uri: 'tel:+46-8-505-454-29',
              label: '+46 8 505 454 29',
              pin: '179111953',
            },
          ],
          conferenceSolution: {
            key: {
              type: 'hangoutsMeet',
            },
            name: 'Google Meet',
            iconUri:
              'https://lh5.googleusercontent.com/proxy/bWvYBOb7O03a7HK5iKNEAPoUNPEXH1CHZjuOkiqxHx8OtyVn9sZ6Ktl8hfqBNQUUbCDg6T2unnsHx7RSkCyhrKgHcdoosAW8POQJm_ZEvZU9ZfAE7mZIBGr_tDlF8Z_rSzXcjTffVXg3M46v',
          },
          conferenceId: 'hhr-mwqz-bmp',
          signature: 'AGkP/s1bjapGYTDNXd0s+g95tLvu',
        },
        reminders: {
          useDefault: true,
        },
      },
      {
        kind: 'calendar#event',
        etag: '"3202722207706000"',
        id: '404ln0jbpduad89aghgrms7o97_R20200908T071500',
        status: 'confirmed',
        htmlLink:
          'https://www.google.com/calendar/event?eid=NDA0bG4wamJwZHVhZDg5YWdoZ3JtczdvOTdfUjIwMjAwOTA4VDA3MTUwMF8yMDIwMDkwOFQwNzE1MDBaIHZpa3Rvci5zYW5kYmVyZ0BkaWdpZXhhbS5zZQ',
        created: '2020-05-07T14:11:35.000Z',
        updated: '2020-09-29T06:31:43.853Z',
        summary: 'Weekly Stand Up',
        description:
          'Kind of like a stand up but longer. \n\nEach member of the team should answer the following three questions: \n- What did I do yesterday\n- What will I do today\n- Are there any blockers that prevents me or the development team from meeting the sprint goal?  \n\nOther than the above the discussion is free. ',
        creator: {
          email: 'kenan.tulic@digiexam.se',
        },
        organizer: {
          email: 'digiexam.se_mec2n7umgboj9jbs7ffscbatvc@group.calendar.google.com',
          displayName: 'Tech',
        },
        start: {
          dateTime: '2020-09-08T09:15:00+02:00',
          timeZone: 'Europe/Stockholm',
        },
        end: {
          dateTime: '2020-09-08T10:00:00+02:00',
          timeZone: 'Europe/Stockholm',
        },
        recurrence: ['RRULE:FREQ=WEEKLY;BYDAY=TU'],
        iCalUID: '404ln0jbpduad89aghgrms7o97_R20200908T071500@google.com',
        sequence: 1,
        attendees: [
          {
            email: 'sovanny.huy@digiexam.se',
            responseStatus: 'accepted',
          },
          {
            email: 'tech@digiexam.se',
            displayName: 'Tech',
            responseStatus: 'needsAction',
          },
          {
            email: 'roman.priscepov@digiexam.se',
            responseStatus: 'accepted',
          },
          {
            email: 'viktor.sandberg@digiexam.se',
            self: true,
            responseStatus: 'accepted',
          },
        ],
        hangoutLink: 'https://meet.google.com/hhr-mwqz-bmp',
        conferenceData: {
          entryPoints: [
            {
              entryPointType: 'video',
              uri: 'https://meet.google.com/hhr-mwqz-bmp',
              label: 'meet.google.com/hhr-mwqz-bmp',
            },
            {
              entryPointType: 'more',
              uri: 'https://tel.meet/hhr-mwqz-bmp?pin=1714837202570',
              pin: '1714837202570',
            },
            {
              regionCode: 'SE',
              entryPointType: 'phone',
              uri: 'tel:+46-8-505-454-29',
              label: '+46 8 505 454 29',
              pin: '179111953',
            },
          ],
          conferenceSolution: {
            key: {
              type: 'hangoutsMeet',
            },
            name: 'Google Meet',
            iconUri:
              'https://lh5.googleusercontent.com/proxy/bWvYBOb7O03a7HK5iKNEAPoUNPEXH1CHZjuOkiqxHx8OtyVn9sZ6Ktl8hfqBNQUUbCDg6T2unnsHx7RSkCyhrKgHcdoosAW8POQJm_ZEvZU9ZfAE7mZIBGr_tDlF8Z_rSzXcjTffVXg3M46v',
          },
          conferenceId: 'hhr-mwqz-bmp',
          signature: 'AGkP/s1bjapGYTDNXd0s+g95tLvu',
        },
        reminders: {
          useDefault: true,
        },
      },
    ],
  },
  {
    kind: 'calendar#events',
    etag: '"p32ob1f5ojb9uo0g"',
    summary: 'Kalender',
    updated: '2020-10-26T21:31:26.078Z',
    timeZone: 'UTC',
    accessRole: 'reader',
    defaultReminders: [],
    nextSyncToken: 'CLCwvLia0-wCELCwvLia0-wCGAE=',
    items: [
      {
        kind: 'calendar#event',
        etag: '"3207495770306000"',
        id:
          '_60q30c1g60o30e1i60o4ac1g60rj8gpl88rj2c1h84s34h9g60s30c1g60o30c1g611j6dho6h138h2485148dhg64o30c1g60o30c1g60o30c1g60o32c1g60o30c1g6l146hhp6oojic216co30c1k610jah246h1jichj8l332g9h8kr0',
        status: 'confirmed',
        htmlLink:
          'https://www.google.com/calendar/event?eid=XzYwcTMwYzFnNjBvMzBlMWk2MG80YWMxZzYwcmo4Z3BsODhyajJjMWg4NHMzNGg5ZzYwczMwYzFnNjBvMzBjMWc2MTFqNmRobzZoMTM4aDI0ODUxNDhkaGc2NG8zMGMxZzYwbzMwYzFnNjBvMzBjMWc2MG8zMmMxZzYwbzMwYzFnNmwxNDZoaHA2b29qaWMyMTZjbzMwYzFrNjEwamFoMjQ2aDFqaWNoajhsMzMyZzloOGtyMCAwYThiYTI5amw0MTU2MnFqMmFycGpwMXZsM3M2OG80YUBp',
        created: '2020-10-26T21:31:24.000Z',
        updated: '2020-10-26T21:31:25.153Z',
        summary: 'Test event',
        description: '\n',
        creator: {
          email: '0a8ba29jl41562qj2arpjp1vl3s68o4a@import.calendar.google.com',
          displayName: 'Kalender',
          self: true,
        },
        organizer: {
          email: '0a8ba29jl41562qj2arpjp1vl3s68o4a@import.calendar.google.com',
          displayName: 'Kalender',
          self: true,
        },
        start: {
          dateTime: '2020-10-27T11:00:00Z',
        },
        end: {
          dateTime: '2020-10-27T12:00:00Z',
        },
        visibility: 'public',
        iCalUID:
          '040000008200E00074C5B7101A82E008000000000C3684B4DDABD6010000000000000000100000005BCF96190A300040A5DD4C923EF1A1E6',
        sequence: 0,
        reminders: {
          useDefault: true,
        },
      },
    ],
  },
];

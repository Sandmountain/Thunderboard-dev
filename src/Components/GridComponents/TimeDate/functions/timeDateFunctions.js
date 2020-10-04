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
  let year = date.getFullYear();

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return {
    time: hours + ':' + minutes,
    weekday,
    day,
    month,
    year,
  };
};

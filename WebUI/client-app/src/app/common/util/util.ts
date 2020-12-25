export const combineDateAndTime = (date: Date, time: Date) => {
  // const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

  // const year = date.getFullYear();
  // const month = date.getMonth() + 1;
  // const day = date.getDate();
  // const dateString = `${year}-${month}-${day}`;

  const dateString = date.toISOString().split('T')[0];
  const timeString = time.toISOString().split('T')[1];

  return new Date(dateString + 'T' + timeString);
};

export const compareDates = (dateX: Date, dateY: Date) => {
  new Date(dateY);

  console.log(dateX.getDate());
  console.log(dateY.getDate());
};

export const getDate = (date: Date) => {
  date = new Date(date);

  const dateString =
    date.getDate() +
    '.' +
    (date.getMonth() + 1) +
    '.' +
    date.getFullYear() +
    '.';

  return dateString;
};

export const getDateAndMonth = (date: Date) => {
  const dateAndMonth = date.getDate() + '.' + (date.getMonth() + 1) + '.';

  return dateAndMonth;
};

export const getNextDates = (days: number) => {
  var dates = [];
  var today = new Date();
  dates.push(today);

  for (let i = 1; i <= days; i++) {
    var date = new Date();
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  return dates;
};

export const getDateAndTime = (date: Date) => {
  date = new Date(date);

  const dateString = getDate(date);
  const timeString = date.getHours() + ':' + date.getMinutes();

  return dateString + ' - ' + timeString;
};

export const getDayOfWeek = (day: number) => {
  let dayString = '';

  switch (day) {
    case 0:
      dayString = 'Ned';
      break;
    case 1:
      dayString = 'Pon';
      break;
    case 2:
      dayString = 'Uto';
      break;
    case 3:
      dayString = 'Sre';
      break;
    case 4:
      dayString = 'Cet';
      break;
    case 5:
      dayString = 'Pet';
      break;
    case 6:
      dayString = 'Sub';
      break;
    case 7:
      dayString = 'Ned';
      break;
  }

  return dayString;
};

export const startHours = [
  '08:00:00',
  '08:30:00',
  '09:00:00',
  '09:30:00',
  '10:00:00',
  '10:30:00',
  '11:00:00',
  '11:30:00',
  '12:00:00',
  '12:30:00',
  '13:00:00',
  '13:30:00',
  '14:00:00',
  '14:30:00',
  '15:00:00',
  '15:30:00',
  '16:00:00',
  '16:30:00',
  '17:00:00',
  '17:30:00',
  '18:00:00',
  '18:30:00',
  '19:00:00',
  '19:30:00',
  '20:00:00',
  '20:30:00',
  '21:00:00',
  '21:30:00',
  '22:00:00',
  '22:30:00',
  '23:00:00',
  '23:30:00',
];

export const hours = [
  '08:00:00',
  '09:00:00',
  '10:00:00',
  '11:00:00',
  '12:00:00',
  '13:00:00',
  '14:00:00',
  '15:00:00',
  '16:00:00',
  '17:00:00',
  '18:00:00',
  '19:00:00',
  '20:00:00',
  '21:00:00',
  '22:00:00',
  '23:00:00',
  '00:00:00',
];

export const openHours = [
  '08:00:00',
  '09:00:00',
  '10:00:00',
  '11:00:00',
  '12:00:00',
  '13:00:00',
  '14:00:00',
];

export const closeHours = [
  '14:00:00',
  '15:00:00',
  '16:00:00',
  '17:00:00',
  '18:00:00',
  '19:00:00',
  '20:00:00',
  '21:00:00',
  '22:00:00',
  '23:00:00',
  '00:00:00',
];

export const openHours = [
  '06:00:00',
  '07:00:00',
  '08:00:00',
  '09:00:00',
  '10:00:00',
  '11:00:00',
  '12:00:00',
  '13:00:00',
  '14:00:00',
];

export const closeHours = [
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

export const getDay = (day: number) => {
  var dayText;

  switch (day) {
    case 1:
      dayText = 'Ponedeljak';
      break;
    case 2:
      dayText = 'Utorak';
      break;
    case 3:
      dayText = 'Sreda';
      break;
    case 4:
      dayText = 'Cetvrtak';
      break;
    case 5:
      dayText = 'Petak';
      break;
    case 6:
      dayText = 'Subota';
      break;
    case 7:
      dayText = 'Nedelja';
      break;
  }

  return dayText;
};

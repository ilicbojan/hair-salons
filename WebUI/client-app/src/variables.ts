const size = {
  xs: '480px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1440px',
};

export const DESKTOP_FIRST = {
  xs: `(max-width: ${size.xs})`,
  sm: `(max-width: ${size.sm})`,
  md: `(max-width: ${size.md})`,
  lg: `(max-width: ${size.lg})`,
  xl: `(max-width: ${size.xl})`,
};

export const MOBILE_FIRST = {
  xs: `(min-width: ${size.xs})`,
  sm: `(min-width: ${size.sm})`,
  md: `(min-width: ${size.md})`,
  lg: `(min-width: ${size.lg})`,
  xl: `(min-width: ${size.xl})`,
};

export const COLOR = {
  primary: '#2f285a',
  primaryLight: '#5d53a3',
  primaryDark: '#1f1a41',
  secondary: '#3ed47b',
  secondaryDark: '#188155',
  termGreen: '#A0FFA1',
  termYellow: '#FFFDAA',
  termRed: '#FFAEA7',
  red: '#ff1500',
  gray: '#ececec',
  grayLight: '#f6f6f6 ',
  grayDark: '#333',
  white: '#fff',
  black: '#000',
};

export const utilities = {
  shadow: '0 5px 8px 0 rgba(0, 0, 0, 0.3)',
  borderRadius: '5px',
  navHeight: '60px',
};

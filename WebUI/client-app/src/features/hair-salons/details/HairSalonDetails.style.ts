import styled from 'styled-components';
import { MOBILE_FIRST } from '../../../variables';

const HairSalonDetails = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-areas:
    'left'
    'terms'
    'contact'
    'right'
    'desc'
    'reviews';

  @media ${MOBILE_FIRST.lg} {
    display: grid;
    grid-template-columns: 66% 33%;
    grid-template-areas:
      'left right'
      'terms terms'
      'desc desc'
      'reviews reviews';
  }
`;

const Left = styled.div`
  grid-area: left;
`;

const Right = styled.div`
  grid-area: right;
`;

const Contact = styled.div`
  grid-area: contact;

  @media ${MOBILE_FIRST.lg} {
    display: none;
  }
`;

export const S = {
  HairSalonDetails,
  Left,
  Right,
  Contact,
};

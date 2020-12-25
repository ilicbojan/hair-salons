import styled from 'styled-components';
import { COLOR } from '../../../variables';

const ReservationCreate = styled.div`
  font-size: 1.6rem;

  & span {
    font-weight: bold;
  }

  & hr {
    margin: 5px 0;
    border-top: 2px solid ${COLOR.primary};
  }
`;

export const S = {
  ReservationCreate,
};

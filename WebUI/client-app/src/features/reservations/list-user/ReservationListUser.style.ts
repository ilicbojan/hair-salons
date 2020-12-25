import styled from 'styled-components';
import { MOBILE_FIRST } from '../../../variables';

const ReservationListUser = styled.div`
  margin-right: -15px;

  @media ${MOBILE_FIRST.lg} {
    margin: 0;
  }

  & button {
    margin: 0;
    padding: 6px 12px;
  }

  & .btnColumn {
    width: 100px;
  }
`;

export const S = {
  ReservationListUser,
};

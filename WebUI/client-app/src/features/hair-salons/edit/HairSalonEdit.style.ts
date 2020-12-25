import styled from 'styled-components';
import { MOBILE_FIRST } from '../../../variables';

const HairSalonEdit = styled.div`
  padding: 15px;

  @media ${MOBILE_FIRST.lg} {
    width: 60%;
    margin: 0 auto;
  }
`;

export const S = {
  HairSalonEdit,
};

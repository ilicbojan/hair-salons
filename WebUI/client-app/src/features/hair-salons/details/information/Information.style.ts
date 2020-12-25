import styled from 'styled-components';
import { MOBILE_FIRST } from '../../../../variables';

const Information = styled.div`
  display: none;

  @media ${MOBILE_FIRST.lg} {
    display: block;
    padding: 20px 15px 10px 15px;
    grid-area: info;
  }
`;

export const S = {
  Information,
};

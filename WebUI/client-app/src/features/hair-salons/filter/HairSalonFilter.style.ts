import styled from 'styled-components';
import { MOBILE_FIRST } from '../../../variables';

const HairSalonFilter = styled.div`
  & .header {
    display: none;

    @media ${MOBILE_FIRST.lg} {
      display: block;
    }
  }

  & .body {
    padding-top: 0;
  }

  & .btns {
    display: flex;
    justify-content: space-between;

    & button {
      flex: 0 0 45%;
    }
  }
`;

export const S = {
  HairSalonFilter,
};

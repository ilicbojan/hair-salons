import styled from 'styled-components';
import { COLOR } from '../../../variables';

const Social = styled.div`
  background-color: ${COLOR.secondary};
  color: ${COLOR.primary};
  padding: 18px 0 12px 0;

  & .social {
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & a {
    color: inherit;
  }
`;

export const S = {
  Social,
};

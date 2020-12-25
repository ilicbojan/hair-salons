import styled from 'styled-components';
import { COLOR, MOBILE_FIRST } from '../../../variables';

const ProcessDescription = styled.div`
  margin: 30px 15px;

  @media ${MOBILE_FIRST.lg} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 20px;
  }
`;

const Card = styled.div`
  text-align: center;
  padding: 15px;

  & svg {
    height: 40px;
    width: 40px;
    fill: ${COLOR.secondary};
  }

  & h2 {
    color: ${COLOR.primaryDark};
  }
`;

export const S = {
  ProcessDescription,
  Card,
};

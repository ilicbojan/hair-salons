import styled from 'styled-components';
import { COLOR } from '../../../variables';

const Statistics = styled.div`
  display: grid;
  height: 100%;
`;

const Counter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150px;
  margin: 20px 10px;
  padding: 15px 0;
  border: 5px solid ${COLOR.secondary};

  & h5 {
    font-size: 3rem;
  }
`;

export const S = {
  Statistics,
  Counter,
};

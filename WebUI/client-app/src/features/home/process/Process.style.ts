import styled from 'styled-components';
import { COLOR } from '../../../variables';

const Process = styled.div`
  background-color: ${COLOR.primary};
  color: ${COLOR.secondary};
  height: 58px;

  & .process {
    height: 100%;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & span {
    padding-top: 8px;
  }
`;

export const S = {
  Process,
};

import styled from 'styled-components';
import { COLOR } from '../../../../variables';

const Burger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 30px;
  width: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

const Line = styled.div`
  width: 30px;
  height: 2px;
  background: ${COLOR.white};
`;

export const S = {
  Burger,
  Line,
};

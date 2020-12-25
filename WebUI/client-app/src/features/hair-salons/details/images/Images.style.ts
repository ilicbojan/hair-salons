import styled from 'styled-components';
import { utilities } from '../../../../variables';

interface IProps {
  height: any;
}

const Images = styled.div<IProps>`
  padding: 0 15px;
  width: 100%;
  height: ${(props) => props.height}px;
  grid-area: slider;
  border-radius: ${utilities.borderRadius};
  overflow: hidden;
`;

export const S = {
  Images,
};

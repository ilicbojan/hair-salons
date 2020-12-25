import styled from 'styled-components';
import { utilities } from '../../../../variables';

interface IProps {
  width: any;
}

const ImageSlider = styled.div<IProps>`
  width: 100%;
  height: ${(props) => props.width / 1.42857}px;
  position: relative;
  overflow: hidden;
  border-radius: ${utilities.borderRadius};
`;

export const S = {
  ImageSlider,
};

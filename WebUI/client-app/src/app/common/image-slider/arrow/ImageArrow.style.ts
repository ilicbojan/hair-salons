import styled from 'styled-components';
import { COLOR } from '../../../../variables';

interface IProps {
  direction: string;
}

const ImageArrow = styled.div<IProps>`
  display: flex;
  position: absolute;
  top: 45%;
  ${(props) => (props.direction === 'right' ? `right: 10px` : `left: 10px`)};
  height: 35px;
  width: 35px;
  justify-content: center;
  background: ${COLOR.primary};
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
  transition: transform ease-in 0.1s;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    height: 25px;
    width: 25px;
    color: ${COLOR.secondary};
  }
`;

export const S = {
  ImageArrow,
};

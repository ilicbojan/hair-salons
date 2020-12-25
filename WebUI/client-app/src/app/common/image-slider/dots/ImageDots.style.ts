import styled from 'styled-components';
import { COLOR } from '../../../../variables';

interface IProps {
  active: boolean;
}

const ImageDots = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dot = styled.div<IProps>`
  padding: 6px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 50%;
  background: ${(props) =>
    props.active ? `${COLOR.primary}` : `${COLOR.secondary}`};
`;

export const S = {
  ImageDots,
  Dot,
};

import styled from 'styled-components';
import { COLOR } from '../../../variables';

const ImageListItem = styled.div`
  display: flex;
  border: 2px solid ${COLOR.secondary};
  margin-bottom: 20px;
`;

const Image = styled.div`
  width: 60%;

  & img {
    width: 100%;
    height: 100%;
  }
`;

const Buttons = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & button {
    margin-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    width: 80%;
  }

  & svg {
    fill: ${COLOR.primary};
    height: 60px;
    width: 60px;
    margin-top: 10px;
  }
`;

export const S = {
  ImageListItem,
  Image,
  Buttons,
};

import styled from 'styled-components';
import { COLOR } from '../../../variables';

const ImageUpload = styled.div`
  & h3 {
    color: ${COLOR.primary};
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;

  & button {
    flex: 0 0 45%;
  }
`;

export const S = {
  Buttons,
  ImageUpload,
};

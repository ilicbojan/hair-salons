import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 60px;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 998;
`;

export const S = {
  Backdrop,
};

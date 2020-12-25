import styled from 'styled-components';
import { MOBILE_FIRST } from '../../../variables';

const ImageList = styled.div`
  padding: 15px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Images = styled.div`
  @media ${MOBILE_FIRST.lg} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
`;

export const S = {
  ImageList,
  Header,
  Images,
};

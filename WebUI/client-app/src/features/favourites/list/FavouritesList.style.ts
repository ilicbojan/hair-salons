import styled from 'styled-components';
import { MOBILE_FIRST } from '../../../variables';

const FavouritesList = styled.div`
  padding: 15px;
`;

const List = styled.div`
  margin-top: 15px;

  @media ${MOBILE_FIRST.sm} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    column-gap: 20px;
  }

  @media ${MOBILE_FIRST.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const S = {
  FavouritesList,
  List,
};

import styled from 'styled-components';
import { COLOR, MOBILE_FIRST } from '../../../variables';

const FeaturedHairSalons = styled.div`
  margin: 30px 15px 60px 15px;
  position: relative;
  min-height: 200px;

  & h3 {
    display: flex;
    align-items: center;
    font-size: 2.5rem;

    & svg {
      margin-right: 10px;
      fill: ${COLOR.secondary};
      height: 20px;
      width: 20px;
    }
  }
`;

const List = styled.div`
  margin-top: 15px;
  display: grid;
  row-gap: 30px;

  @media ${MOBILE_FIRST.sm} {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
  }

  @media ${MOBILE_FIRST.lg} {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 20px;
  }
`;

export const S = {
  FeaturedHairSalons,
  List,
};

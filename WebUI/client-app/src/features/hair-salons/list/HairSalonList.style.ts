import styled from 'styled-components';
import { MOBILE_FIRST } from '../../../variables';

const HairSalonList = styled.div`
  padding: 15px;

  @media ${MOBILE_FIRST.lg} {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-areas: 'filter list';
    column-gap: 20px;
  }

  & .mobileFilter {
    @media ${MOBILE_FIRST.lg} {
      display: none;
    }
  }

  & .filterBtn {
    margin-bottom: 0;

    & svg {
      width: 25px;
      height: 25px;
      margin-left: 5px;
    }
  }

  & .desktopFilter {
    display: none;
    grid-area: filter;

    @media ${MOBILE_FIRST.lg} {
      display: block;
    }
  }

  & .list {
    grid-area: list;
    position: relative;
  }
`;

const List = styled.div`
  margin-top: 15px;
  display: grid;
  row-gap: 30px;

  @media ${MOBILE_FIRST.sm} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    column-gap: 20px;
  }

  @media ${MOBILE_FIRST.lg} {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 0;
  }
`;

export const S = {
  HairSalonList,
  List,
};

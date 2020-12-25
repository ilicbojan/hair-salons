import styled from 'styled-components';
import { COLOR, MOBILE_FIRST, utilities } from '../../../../variables';

const Heading = styled.div`
  padding: 0 15px 15px 15px;
  font-size: 1.8rem;
  grid-area: heading;

  & h1 {
    color: ${COLOR.secondaryDark};
    font-size: 3rem;

    @media ${MOBILE_FIRST.lg} {
      font-size: 4rem;
    }
  }

  & div.addressDiv {
    margin-bottom: 10px;

    @media ${MOBILE_FIRST.lg} {
      display: none;
    }
  }

  & span.address {
    font-weight: bold;
  }
`;

const Info = styled.div`
  display: flex;
`;

const Sport = styled.div`
  border: 2px solid ${COLOR.secondaryDark};
  font-size: 1.4rem;
  padding: 8px;
  margin-right: 5px;
  border-radius: ${utilities.borderRadius};

  @media ${MOBILE_FIRST.lg} {
    font-size: 1.6rem;
    padding: 10px 12px;
    margin-right: 15px;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & button {
    overflow: hidden;
    padding: 8px 12px;
    margin: 0;

    & svg {
      height: 20px;
      width: 20px;
    }
  }
`;

export const S = {
  Heading,
  Sport,
  Info,
  Flex,
};

import styled from 'styled-components';
import { COLOR, MOBILE_FIRST, utilities } from '../../../variables';

const HomeHeader = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('/assets/landing-min.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  min-height: 82vh;
  position: relative;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  & h1 {
    font-size: 3rem;
    margin-bottom: -15px;
    color: ${COLOR.primary};

    & span {
      color: ${COLOR.secondary};
    }
  }
`;

const FormContainer = styled.div`
  margin: 10px 0;
  width: 90%;
  background-color: ${COLOR.gray};
  padding: 10px 20px 5px 20px;
  box-shadow: ${utilities.shadow};
  border-radius: ${utilities.borderRadius};

  @media ${MOBILE_FIRST.xs} {
    width: 70%;
  }

  @media ${MOBILE_FIRST.sm} {
    width: 60%;
  }

  @media ${MOBILE_FIRST.md} {
    width: 45%;
  }

  @media ${MOBILE_FIRST.lg} {
    width: 35%;
  }

  @media ${MOBILE_FIRST.xl} {
    width: 30%;
  }

  & button {
    margin-top: 20px;
  }
`;

export const S = {
  HomeHeader,
  FormContainer,
};

import styled from 'styled-components';
import { COLOR, MOBILE_FIRST } from '../../../variables';

const ContactInfo = styled.div`
  background-color: ${COLOR.primary};
  color: ${COLOR.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 10px 20px;

  @media ${MOBILE_FIRST.xs} {
    height: 60px;
    padding: 15px 20px;
    font-size: 1.8rem;
  }

  @media ${MOBILE_FIRST.md} {
    justify-content: space-around;
  }

  & a {
    color: inherit;
    text-decoration: none;
  }

  & .phone {
    font-size: 1.5rem;

    @media ${MOBILE_FIRST.xs} {
      font-size: 1.7rem;
    }
  }
`;

export const S = {
  ContactInfo,
};

import styled from 'styled-components';
import { MOBILE_FIRST } from '../../../variables';

const ContactForm = styled.div`
  padding: 20px;

  @media ${MOBILE_FIRST.lg} {
    width: 60%;
    margin: 30px auto;
  }

  & button {
    margin-top: 20px;
  }
`;

export const S = {
  ContactForm,
};

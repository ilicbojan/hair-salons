import styled from 'styled-components';
import { COLOR, utilities } from './variables';

const ContentContainer = styled.div`
  padding: 15px;
  background-color: ${COLOR.white};
  box-shadow: ${utilities.shadow};
  border-radius: ${utilities.borderRadius};
`;

const ConfirmModal = styled.div`
  font-size: 1.8rem;

  & .buttons {
    display: flex;
    justify-content: space-between;

    & button {
      flex: 0 0 45%;
    }
  }
`;

const HairSalonDetailsCard = styled.div`
  background-color: ${COLOR.white};
  box-shadow: ${utilities.shadow};
  border-radius: ${utilities.borderRadius};
  overflow: hidden;

  & .header {
    padding: 10px 15px;
    background-color: ${COLOR.secondary};
    color: ${COLOR.primaryDark};
    font-weight: bold;
  }

  & .body {
    padding: 10px 15px;
  }
`;

export const Style = {
  ContentContainer,
  ConfirmModal,
  HairSalonDetailsCard,
};

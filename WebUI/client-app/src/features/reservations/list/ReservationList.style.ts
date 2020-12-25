import styled from 'styled-components';
import { COLOR, MOBILE_FIRST, utilities } from '../../../variables';

interface ITabProps {
  active: boolean;
}

const ReservationList = styled.div`
  padding: 15px;
`;

const Menu = styled.div`
  display: flex;
  margin-top: 10px;
  color: ${COLOR.secondary};
  border-radius: ${utilities.borderRadius};
  box-shadow: ${utilities.shadow};
  overflow: hidden;
`;

const Tab = styled.div`
  text-decoration: none;
  text-align: center;
  padding: 8px 0;
  flex: 0 0 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;

  background-color: ${COLOR.primary};

  ${(props: ITabProps) =>
    props.active &&
    `
background-color: ${COLOR.secondary};
color: ${COLOR.primaryDark};
`}

  @media ${MOBILE_FIRST.lg} {
    font-size: 1.8rem;
    padding: 12px 0;
  }

  & svg {
    height: 20px;
    width: 20px;
    margin-left: 10px;
  }
`;

export const S = {
  ReservationList,
  Menu,
  Tab,
};

import styled from 'styled-components';
import { COLOR, utilities, MOBILE_FIRST } from '../../../../variables';

interface IProps {
  show: boolean;
}

const SideDrawer = styled.nav<IProps>`
  height: 100%;
  width: 70%;
  max-width: 400px;
  padding: 10px 20px;
  background-color: ${COLOR.grayLight};
  box-shadow: ${utilities.shadow};
  position: fixed;
  top: 60px;
  right: 0;
  z-index: 999;
  transform: translateX(100%);
  transition: transform 0.3s ease-out;

  ${(props) =>
    props.show &&
    `
    transform: translateX(0);
  `}

  @media ${MOBILE_FIRST.sm} {
    display: none;
  }

  & ul {
    height: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
  }

  & li {
    margin: 5px 0;
    display: flex;
    align-items: center;

    & svg {
      fill: ${COLOR.secondary};
      height: 25px;
      width: 25px;
      margin-right: 10px;
    }
  }

  & a,
  & button {
    color: ${COLOR.primaryDark};
    text-decoration: none;
    font-size: 2.2rem;
    letter-spacing: 2px;
    font-weight: bold;
  }

  & button {
    background: none;
    border: none;
  }

  & hr {
    margin: 5px 0;
    border: 0;
    height: 2px;
    background: ${COLOR.primaryDark};
  }
`;

const SubNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;

  & a,
  button {
    color: ${COLOR.primaryDark};
    font-size: 1.7rem;
  }
`;

export const S = {
  SideDrawer,
  SubNavLinks,
};

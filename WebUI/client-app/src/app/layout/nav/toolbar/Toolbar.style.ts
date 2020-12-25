import styled from 'styled-components';
import { COLOR, MOBILE_FIRST, utilities } from '../../../../variables';

const Toolbar = styled.header`
  /* position: fixed; */
  width: 100%;
  height: ${utilities.navHeight};
  background-color: ${COLOR.primary};
`;

const Navigation = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
`;

const Logo = styled.div`
  & a {
    color: ${COLOR.white};
    text-decoration: none;
    font-size: 2rem;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const Items = styled.div`
  display: none;

  @media ${MOBILE_FIRST.sm} {
    display: block;
    height: 100%;
  }

  & ul {
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
  }

  & li {
    height: 100%;
    padding: 0 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  & a,
  & button {
    display: flex;
    align-items: center;
    height: 100%;
    color: ${COLOR.white};
    text-decoration: none;
    font-size: 1.8rem;
    cursor: pointer;
  }

  & button {
    background: none;
    border: none;
  }

  & button:focus {
    outline: none;
  }

  & a:hover,
  & a:active,
  & button:hover {
    color: ${COLOR.secondary};
  }

  & svg {
    margin-left: 5px;
    height: 20px;
    width: 20px;
    fill: ${COLOR.white};
  }
`;

const Burger = styled.div`
  @media ${MOBILE_FIRST.sm} {
    display: none;
  }
`;

export const S = {
  Toolbar,
  Navigation,
  Logo,
  Spacer,
  Items,
  Burger,
};

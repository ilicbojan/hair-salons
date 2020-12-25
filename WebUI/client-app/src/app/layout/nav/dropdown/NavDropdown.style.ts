import styled from 'styled-components';
import { COLOR } from '../../../../variables';

const NavDropdown = styled.ul`
  &.dropdown-menu {
    width: 180px;
    height: auto;
    position: absolute;
    top: 60px;
    right: 0;
    list-style: none;
    text-align: start;
    background-color: ${COLOR.primaryDark};
    display: block;
    z-index: 9999;
  }

  & li {
    padding: 0;
    cursor: pointer;
  }

  & a,
  & button {
    display: block;
    height: 100%;
    width: 100%;
    padding: 5px 10px;
    color: ${COLOR.white};
    text-decoration: none;
    font-size: 1.6rem;
    cursor: pointer;
  }

  & button {
    background: none;
    border: none;
    text-align: left;
  }

  & button:focus {
    outline: none;
  }

  & a:hover,
  & a:active,
  & button:hover {
    color: ${COLOR.secondary};
  }

  & .clicked {
    display: none;
  }
`;

export const S = {
  NavDropdown,
};

import styled, { keyframes } from 'styled-components';
import { COLOR, utilities } from '../../../variables';

export interface IProps {
  block?: boolean;
  width?: any;
  type?: any;
  color?: string;
}

const Button = styled.button`
  width: ${(props: IProps) => props.block && '100%'};

  margin: 15px 0;
  padding: 12px 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${utilities.shadow};
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: pointer;
  position: relative;
  border-radius: ${utilities.borderRadius};
  overflow: hidden;
  transition: background-color 0.4s;

  ${({ color }) =>
    color === 'primary' &&
    `
      background-color: ${COLOR.primary};
      color: ${COLOR.secondary};
    `}

  ${({ color }) =>
    color === 'secondary' &&
    `
      background-color: ${COLOR.secondaryDark};
      color: ${COLOR.white};
    `}

  ${({ color }) =>
    color === 'red' &&
    `
      background-color: ${COLOR.red};
      color: ${COLOR.white};
    `}

  &:hover,
  &:focus {
    ${({ color }) =>
      color === 'primary' &&
      `
      background-color: ${COLOR.primaryDark};
    `}

    ${({ color }) =>
      color === 'secondary' &&
      `
      background-color: ${COLOR.secondaryDark};
    `}

    ${({ color }) =>
      color === 'red' &&
      `
      background-color: ${COLOR.red};
    `}
  }

  &:disabled,
  &[disabled] {
    ${({ color }) =>
      color === 'primary' &&
      `
      background-color: ${COLOR.primaryLight};
      color: ${COLOR.primaryLight};
    `}

    ${({ color }) =>
      color === 'secondary' &&
      `
      background-color: ${COLOR.secondaryDark};
      color: ${COLOR.secondaryDark};
    `}

    ${({ color }) =>
      color === 'red' &&
      `
      background-color: ${COLOR.termRed};
      color: ${COLOR.termRed};
    `}
  }

  & svg {
    margin-right: 6px;
  }
`;

const spinner = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.span`
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    height: 3.2rem;
    width: 3.2rem;
    margin-top: -1.6rem;
    margin-left: -1.6rem;
    border-radius: 50%;
    border: 4px solid gray;
    border-top-color: ${COLOR.secondary};
    animation: ${spinner} 0.7s linear infinite;
  }
`;

export const S = {
  Button,
  Spinner,
};

import styled from 'styled-components';
import { COLOR } from '../../../variables';

interface IItemProps {
  active: boolean;
}

const Pagination = styled.div`
  & ul {
    list-style: none;
    display: flex;
    height: 50px;
  }
`;

const Item = styled.li<IItemProps>`
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLOR.secondary};
  background-color: ${COLOR.primary};
  border: 1px solid ${COLOR.black};
  font-weight: bold;
  cursor: pointer;

  ${(props) =>
    props.active &&
    `
    color: ${COLOR.primaryDark};
    background-color: ${COLOR.secondary};
  `}
`;

export const S = {
  Pagination,
  Item,
};

import styled from 'styled-components';
import { COLOR, utilities } from '../../../variables';

const TableSection = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 1.6rem;
  min-width: 400px;
  width: 100%;
  border-radius: ${utilities.borderRadius};
  box-shadow: ${utilities.shadow};
  overflow: hidden;

  & thead tr {
    background-color: ${COLOR.primary};
    color: ${COLOR.secondary};
    text-align: left;
    font-weight: bold;
  }

  & th,
  & td {
    padding: 20px 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & tbody {
    background-color: ${COLOR.white};
  }

  & tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  & tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  & tbody tr:last-of-type {
    border-bottom: 2px solid ${COLOR.primary};
  }
`;

export const S = {
  Table,
  TableSection,
};

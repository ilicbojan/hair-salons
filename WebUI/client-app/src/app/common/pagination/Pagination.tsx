import React from 'react';
import { S } from './Pagination.style';

interface IProps {
  totalPages: number;
  paginate: (page: number) => void;
  activePage: number;
}

const Pagination: React.FC<IProps> = ({ totalPages, paginate, activePage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <S.Pagination>
      <ul>
        {pageNumbers.map((number) => (
          <S.Item
            onClick={() => paginate(number - 1)}
            active={number - 1 === activePage}
            key={number}
          >
            {number}
          </S.Item>
        ))}
      </ul>
    </S.Pagination>
  );
};

export default Pagination;

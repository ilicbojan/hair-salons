import React from 'react';
import { S } from './Table.style';

const Table: React.FC = ({ children }) => {
  return (
    <S.TableSection>
      <S.Table>{children}</S.Table>
    </S.TableSection>
  );
};

export default Table;

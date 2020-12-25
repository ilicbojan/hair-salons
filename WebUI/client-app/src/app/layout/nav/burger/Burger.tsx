import React from 'react';
import { S } from './Burger.style';

interface IProps {
  click: () => void;
}

const Burger: React.FC<IProps> = ({ click }) => {
  return (
    <S.Burger onClick={click}>
      <S.Line />
      <S.Line />
      <S.Line />
    </S.Burger>
  );
};

export default Burger;

import React from 'react';
import { S } from './Backdrop.style';

interface IProps {
  click: () => void;
}

const Backdrop: React.FC<IProps> = ({ click }) => {
  return <S.Backdrop onClick={click}></S.Backdrop>;
};

export default Backdrop;

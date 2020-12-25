import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { S } from './ImageArrow.style';

interface IProps {
  direction: string;
  handleClick: () => void;
}

const ImageArrow: React.FC<IProps> = ({ direction, handleClick }) => {
  return (
    <S.ImageArrow direction={direction} onClick={handleClick}>
      {direction === 'right' ? <FaArrowRight /> : <FaArrowLeft />}
    </S.ImageArrow>
  );
};

export default ImageArrow;

import React from 'react';
import { S } from './ImageDots.style';

interface IProps {
  slides: any;
  activeSlide: any;
}

const ImageDots: React.FC<IProps> = ({ slides, activeSlide }) => {
  return (
    <S.ImageDots>
      {slides.map((slide: any, index: number) => (
        <S.Dot key={index} active={activeSlide === index} />
      ))}
    </S.ImageDots>
  );
};

export default ImageDots;

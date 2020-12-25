import React from 'react';
import { S } from './ImageSliderContent.style';

interface IProps {
  translate: number;
  transition: number;
  width: number;
}

const ImageSliderContent: React.FC<IProps> = ({
  translate,
  transition,
  width,
  children,
}) => {
  return (
    <S.ImageSliderContent
      className='SliderContent'
      translate={translate}
      transition={transition}
      width={width}
    >
      {children}
    </S.ImageSliderContent>
  );
};

export default ImageSliderContent;

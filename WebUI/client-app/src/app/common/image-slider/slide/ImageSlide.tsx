import React from 'react';
import { S } from './ImageSlide.style';

interface IProps {
  content?: any;
}

const ImageSlide: React.FC<IProps> = ({ content }) => {
  return <S.ImageSlide content={content}></S.ImageSlide>;
};

export default ImageSlide;

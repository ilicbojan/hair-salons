import { observer } from 'mobx-react-lite';
import React, { useState, useRef, useEffect } from 'react';
import ImageSlider from '../../../../app/common/image-slider/slider/ImageSlider';
import { S } from './Images.style';
import { IHairSalon } from '../../../../app/models/hairSalon';

interface IProps {
  hairSalon: IHairSalon;
}

const Images: React.FC<IProps> = ({ hairSalon }) => {
  const [width, setWidth] = useState(1);

  const resizeRef = useRef<any>();
  const imageRef = useRef<any>();

  useEffect(() => {
    if (hairSalon.images.length > 0) {
      setWidth(imageRef.current.offsetWidth);
    }
  }, [setWidth, hairSalon.images.length]);

  useEffect(() => {
    resizeRef.current = handleResize;
  });

  useEffect(() => {
    const resize = () => {
      resizeRef.current();
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleResize = () => {
    if (hairSalon.images.length > 0) {
      setWidth(imageRef.current.offsetWidth);
    }
  };

  return (
    <>
      {hairSalon.images.length > 0 && (
        <S.Images height={(width - 30) / 1.42857} ref={imageRef}>
          <ImageSlider slides={[...hairSalon?.images]} />
        </S.Images>
      )}
    </>
  );
};

export default observer(Images);

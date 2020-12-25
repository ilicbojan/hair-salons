import React, { useState, useEffect, useRef } from 'react';
import ImageArrow from '../arrow/ImageArrow';
import ImageSliderContent from '../content/ImageSliderContent';
import ImageDots from '../dots/ImageDots';
import ImageSlide from '../slide/ImageSlide';
import { S } from './ImageSlider.style';

interface IProps {
  slides: any;
}

const ImageSlider: React.FC<IProps> = ({ slides }) => {
  if (slides.length === 1) {
    slides.push(slides[0]);
    slides.push(slides[0]);
  } else if (slides.length === 2) {
    slides.push(slides[0]);
  }

  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const lastSlide = slides[slides.length - 1];

  const sliderRef = useRef<any>();
  const transitionRef = useRef<any>();
  const resizeRef = useRef<any>();

  const [width, setWidth] = useState(1);
  const [state, setState] = useState({
    activeSlide: 0,
    translate: width,
    transition: 0.45,
    _slides: [lastSlide, firstSlide, secondSlide],
  });

  const { translate, transition, activeSlide, _slides } = state;

  useEffect(() => {
    setWidth(sliderRef.current.offsetWidth);
  }, []);

  useEffect(() => {
    transitionRef.current = smoothTransition;
    resizeRef.current = handleResize;
  });

  useEffect(() => {
    const smooth = (e: any) => {
      if (e.target.className.includes('SliderContent')) {
        transitionRef.current();
      }
    };

    const resize = () => {
      resizeRef.current();
    };

    window.addEventListener('transitionend', smooth);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('transitionend', smooth);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    if (transition === 0) {
      setState({ ...state, transition: 0.45 });
    }
  }, [transition, state]);

  const handleResize = () => {
    setState({
      ...state,
      translate: width,
      transition: 0,
    });
  };

  const smoothTransition = () => {
    let _slides: any[] = [];

    if (activeSlide === slides.length - 1) {
      _slides = [slides[slides.length - 2], lastSlide, firstSlide];
    } else if (activeSlide === 0) {
      _slides = [lastSlide, firstSlide, secondSlide];
    } else {
      _slides = slides.slice(activeSlide - 1, activeSlide + 2);
    }

    setState({
      ...state,
      _slides,
      transition: 0,
      translate: width,
    });
  };

  const nextSlide = () => {
    setState({
      ...state,
      translate: translate + width,
      activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1,
    });
  };

  useEffect(() => {
    nextSlide();
  }, []);

  const prevSlide = () => {
    setState({
      ...state,
      translate: 0,
      activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1,
    });
  };

  return (
    <S.ImageSlider ref={sliderRef} width={width}>
      <ImageSliderContent
        translate={translate}
        transition={transition}
        width={width * _slides.length}
      >
        {_slides.map((image: any, index: number) => (
          <ImageSlide key={index} content={image.url} />
        ))}
      </ImageSliderContent>
      <ImageArrow direction='right' handleClick={nextSlide} />
      <ImageArrow direction='left' handleClick={prevSlide} />

      <ImageDots slides={slides} activeSlide={activeSlide} />
    </S.ImageSlider>
  );
};
export default ImageSlider;

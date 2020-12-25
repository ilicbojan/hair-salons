import styled from 'styled-components';

interface IProps {
  translate: any;
  transition: any;
  width: any;
}

const ImageSliderContent = styled.div<IProps>`
  transform: translateX(-${(props) => props.translate}px);
  transition: transform ease-out ${(props) => props.transition}s;
  height: 100%;
  width: ${(props) => props.width}px;
  display: flex;
`;

export const S = {
  ImageSliderContent,
};

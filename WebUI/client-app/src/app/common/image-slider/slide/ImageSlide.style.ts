import styled from 'styled-components';

interface IProps {
  content?: any;
}

const ImageSlide = styled.div<IProps>`
  height: 100;
  width: 100%;
  background-image: url('${(props) => props.content}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const S = {
  ImageSlide,
};

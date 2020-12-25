import styled from 'styled-components';

const StarRating = styled.div`
  & input[type='radio'] {
    display: none;
  }

  & .star {
    cursor: pointer;
  }
`;

export const S = {
  StarRating,
};

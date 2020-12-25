import styled from 'styled-components';
import { COLOR } from '../../../../../variables';

const ReviewListItem = styled.div`
  display: flex;
  margin-bottom: 10px;

  & .review {
    width: 100%;
    margin-left: 8px;
  }

  & .userIcon {
    height: 60px;
    width: 60px;
    fill: ${COLOR.primary};
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 8px;

  & .star {
    height: 18px;
    width: 18px;
  }

  & .user {
    margin-top: -5px;
    color: ${COLOR.secondaryDark};
    font-weight: bold;
  }

  & .date {
    font-size: 1.4rem;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;

  & div {
    margin-left: 5px;
  }
`;

export const S = {
  ReviewListItem,
  Header,
  User,
};

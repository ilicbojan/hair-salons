import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import StarRating from '../../../../../app/common/star-rating/StarRating';
import { getDate } from '../../../../../app/common/util/util';
import { S } from './ReviewListItem.style';

interface IProps {
  review: any;
}

const ReviewListItem: React.FC<IProps> = ({ review }) => {
  return (
    <S.ReviewListItem>
      <FaUserCircle className='userIcon' />
      <div className='review'>
        <S.Header>
          <div>
            <StarRating initial={review.rating} disabled />
            <div className='user'>{review.user.username}</div>
          </div>
          <div className='date'>{getDate(review.createdAt)}</div>
        </S.Header>
        <div>{review.comment}</div>
      </div>
    </S.ReviewListItem>
  );
};

export default ReviewListItem;

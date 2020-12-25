import React from 'react';
import { observer } from 'mobx-react-lite';
import { IHairSalon } from '../../../../../app/models/hairSalon';
import ReviewListItem from '../list-item/ReviewListItem';

interface IProps {
  hairSalon: IHairSalon;
}

const ReviewList: React.FC<IProps> = ({ hairSalon }) => {
  return (
    <div>
      <h3>Recenzije</h3>
      {hairSalon.reviews.length > 0 ? (
        <div>
          {hairSalon.reviews.map((review, index) => (
            <ReviewListItem key={index} review={review} />
          ))}
        </div>
      ) : (
        <div>Trenutno nema recenzija</div>
      )}
    </div>
  );
};

export default observer(ReviewList);

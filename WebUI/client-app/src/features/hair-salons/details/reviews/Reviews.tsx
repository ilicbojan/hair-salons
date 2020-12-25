import React, { useContext } from 'react';
import ReviewCreate from './create/ReviewCreate';
import { S } from './Reviews.style';
import ReviewList from './list/ReviewList';
import { IHairSalon } from '../../../../app/models/hairSalon';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../../app/stores/rootStore';

interface IProps {
  hairSalon: IHairSalon;
}

const Reviews: React.FC<IProps> = ({ hairSalon }) => {
  const rootStore = useContext(RootStoreContext);
  const { isClient, isLoggedIn } = rootStore.userStore;

  return (
    <S.Reviews>
      {isLoggedIn && !isClient && !hairSalon.isReviewed && <ReviewCreate />}

      <ReviewList hairSalon={hairSalon} />
    </S.Reviews>
  );
};

export default observer(Reviews);

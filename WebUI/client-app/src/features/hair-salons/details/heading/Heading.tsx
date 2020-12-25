import React, { useContext } from 'react';
import { IHairSalon } from '../../../../app/models/hairSalon';
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { S } from './Heading.style';
import Button from '../../../../app/common/button/Button';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { observer } from 'mobx-react-lite';

interface IProps {
  hairSalon: IHairSalon;
}

const Heading: React.FC<IProps> = ({ hairSalon }) => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, isClient } = rootStore.userStore;
  const {
    removeFromFavourites,
    addToFavourites,
    submitting,
  } = rootStore.favouriteStore;

  return (
    <S.Heading>
      <h1>{hairSalon.name}</h1>
      <div className='addressDiv'>
        <span className='address'>Adresa: </span>
        {hairSalon.address}
      </div>
      <S.Flex>
        <S.Info>
          <S.Sport>{hairSalon.city.name}</S.Sport>
        </S.Info>
        {isLoggedIn && !isClient && (
          <>
            {hairSalon.isFavourite ? (
              <Button
                type='button'
                color='red'
                onClick={() => removeFromFavourites(hairSalon)}
                loading={submitting}
              >
                <FaHeartBroken />
                Ukloni
              </Button>
            ) : (
              <Button
                type='button'
                color='secondary'
                onClick={() => addToFavourites(hairSalon)}
                loading={submitting}
              >
                <FaHeart />
                Dodaj
              </Button>
            )}
          </>
        )}
      </S.Flex>
    </S.Heading>
  );
};

export default observer(Heading);

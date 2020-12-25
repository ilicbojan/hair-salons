import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../../app/stores/rootStore';
import HairSalonCard from '../../hair-salons/card/HairSalonCard';
import { S } from './FavouritesList.style';

const FavouritesList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadFavourites,
    favourites,
    loadingFavourites,
  } = rootStore.favouriteStore;

  useEffect(() => {
    loadFavourites();
  }, [loadFavourites]);

  if (loadingFavourites) return <LoadingSpinner />;

  return (
    <S.FavouritesList>
      <h3>Omiljeni tereni</h3>
      <S.List>
        {favourites.map((hairSalon) => (
          <HairSalonCard key={hairSalon.id} hairSalon={hairSalon} />
        ))}
      </S.List>
    </S.FavouritesList>
  );
};

export default observer(FavouritesList);

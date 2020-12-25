import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../../app/stores/rootStore';
import HairSalonCard from '../../hair-salons/card/HairSalonCard';
import { S } from './FeaturedHairSalons.style';

const FeaturedHairSalons = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    featuredHairSalons,
    loadFeaturedHairSalons,
    loadingHairSalons,
  } = rootStore.hairSalonStore;

  useEffect(() => {
    loadFeaturedHairSalons();
  }, [loadFeaturedHairSalons]);

  return (
    <S.FeaturedHairSalons>
      <h3>
        <FaThumbsUp />
        Preporučeni frizerski saloni
      </h3>

      {loadingHairSalons ? (
        <LoadingSpinner />
      ) : (
        <S.List>
          {featuredHairSalons.map((hairSalon) => (
            <HairSalonCard key={hairSalon.id} hairSalon={hairSalon} />
          ))}
        </S.List>
      )}
    </S.FeaturedHairSalons>
  );
};

export default observer(FeaturedHairSalons);

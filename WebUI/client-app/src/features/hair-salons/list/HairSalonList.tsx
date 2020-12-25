import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './HairSalonList.style';
import HairSalonCard from '../card/HairSalonCard';
import Button from '../../../app/common/button/Button';
import HairSalonFilter from '../filter/HairSalonFilter';
import { FaAngleDown } from 'react-icons/fa';

const HairSalonList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    hairSalons,
    setPredicate,
    predicate,
    loadingHairSalons,
  } = rootStore.hairSalonStore;

  const [filter, setFilter] = useState(false);

  const onClick = () => {
    setFilter(!filter);
  };

  useEffect(() => {
    if (predicate.size < 1) {
      setPredicate('isPayed', 'true');
    }
  }, [setPredicate, predicate]);

  return (
    <S.HairSalonList>
      <div className='mobileFilter'>
        <Button
          type='button'
          onClick={onClick}
          color='secondary'
          className='filterBtn'
        >
          Filter
          <FaAngleDown />
        </Button>
        {filter && <HairSalonFilter setFilter={setFilter} />}
      </div>
      <div className='desktopFilter'>
        <HairSalonFilter setFilter={setFilter} />
      </div>

      <div className='list'>
        {loadingHairSalons ? (
          <LoadingSpinner />
        ) : (
          <S.List>
            {hairSalons.map((hairSalon) => (
              <HairSalonCard key={hairSalon.id} hairSalon={hairSalon} />
            ))}
          </S.List>
        )}
      </div>
    </S.HairSalonList>
  );
};

export default observer(HairSalonList);

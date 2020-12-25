import React, { useContext } from 'react';
import ContactForm from '../../partnership/contact-form/ContactForm';
import ContactInfo from '../contact-info/ContactInfo';
import HomeHeader from '../header/HomeHeader';
import Process from '../process/Process';
import Social from '../social/Social';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './HomePage.styles';
import FeaturedHairSalons from '../featured/FeaturedHairSalons';
import ProcessDescription from '../process-description/ProcessDescription';

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { cities, loadingCities } = rootStore.cityStore;

  return (
    <S.HomePage>
      <HomeHeader cities={cities} loading={loadingCities} />
      <Process />
      <FeaturedHairSalons />
      <ProcessDescription />
      <ContactInfo />
      <ContactForm />
      <Social />
    </S.HomePage>
  );
};

export default observer(HomePage);

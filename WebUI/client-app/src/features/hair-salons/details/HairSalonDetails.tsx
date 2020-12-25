import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ContactInfo from '../../home/contact-info/ContactInfo';
import Description from './description/Description';
import FreeTerms from './free-terms/FreeTerms';
import Images from './images/Images';
import { S } from './HairSalonDetails.style';
import WorkingHours from './working-hours/WorkingHours';
import Reviews from './reviews/Reviews';
import Heading from './heading/Heading';
import Information from './information/Information';
import Services from './services/Services';

interface IProps {
  id: string;
}

const HairSalonDetails: React.FC<RouteComponentProps<IProps>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadHairSalon,
    hairSalon,
    loadingHairSalons,
  } = rootStore.hairSalonStore;

  useEffect(() => {
    loadHairSalon(Number.parseInt(match.params.id));
  }, [loadHairSalon, match.params.id, history]);

  if (loadingHairSalons) return <LoadingSpinner />;
  else if (!hairSalon) return <h2>Trazeni teren ne postoji</h2>;

  return (
    <S.HairSalonDetails>
      <S.Left>
        <Heading hairSalon={hairSalon} />
        <Images hairSalon={hairSalon} />
      </S.Left>
      <FreeTerms hairSalon={hairSalon} />
      <S.Contact>
        <ContactInfo hairSalon={hairSalon} />
      </S.Contact>
      <S.Right>
        <Information hairSalon={hairSalon} />
        <WorkingHours hairSalon={hairSalon} />
        <Services hairSalon={hairSalon} />
      </S.Right>
      <Description description={hairSalon.description} />
      <Reviews hairSalon={hairSalon} />
    </S.HairSalonDetails>
  );
};

export default observer(HairSalonDetails);

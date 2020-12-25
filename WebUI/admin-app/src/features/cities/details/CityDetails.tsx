import React, { useContext, useEffect, Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Spin, Row, Col } from 'antd';
import NotFound from '../../../app/layout/NotFound';
import { S } from '../../../styles';
import { observer } from 'mobx-react-lite';
import CityEdit from '../edit/CityEdit';
import CityHairSalonsList from '../hair-salons-list/CityHairSalonsList';

const CityDetails: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadCity, city, loadingCities } = rootStore.cityStore;
  const { loadCountries } = rootStore.countryStore;

  useEffect(() => {
    loadCity(Number(match.params.id));
    loadCountries();
  }, [loadCity, match, loadCountries]);

  if (loadingCities) return <Spin></Spin>;

  if (!city) return <NotFound />;

  return (
    <Fragment>
      <S.HeaderContainer>
        <h2>{city.name}</h2>
      </S.HeaderContainer>
      <Row justify='space-between'>
        <Col span={16}>
          <S.ContentContainer>
            <CityHairSalonsList />
          </S.ContentContainer>
        </Col>
        <Col span={7}>
          <S.ContentContainer>
            <CityEdit />
          </S.ContentContainer>
        </Col>
      </Row>
    </Fragment>
  );
};

export default observer(CityDetails);

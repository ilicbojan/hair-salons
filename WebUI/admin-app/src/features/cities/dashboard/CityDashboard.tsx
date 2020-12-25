import React, { useContext, useEffect, Fragment } from 'react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Row, Col } from 'antd';
import { S } from '../../../styles';
import { observer } from 'mobx-react-lite';
import CityList from '../list/CityList';
import CityCreate from '../create/CityCreate';

const CityDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadCities } = rootStore.cityStore;
  const { loadCountries } = rootStore.countryStore;

  useEffect(() => {
    loadCities();
    loadCountries();
  }, [loadCities, loadCountries]);

  return (
    <Fragment>
      <S.HeaderContainer>
        <h2>Cities</h2>
      </S.HeaderContainer>
      <Row justify='space-between'>
        <Col span={16}>
          <S.ContentContainer>
            <CityList />
          </S.ContentContainer>
        </Col>
        <Col span={7}>
          <S.ContentContainer>
            <CityCreate />
          </S.ContentContainer>
        </Col>
      </Row>
    </Fragment>
  );
};

export default observer(CityDashboard);

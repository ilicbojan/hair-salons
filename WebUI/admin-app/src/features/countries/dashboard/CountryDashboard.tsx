import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { S } from '../../../styles';
import { Row, Col } from 'antd';
import { RootStoreContext } from '../../../app/stores/rootStore';
import CountryList from '../list/CountryList';
import CountryCreate from '../create/CountryCreate';

const CountryDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadCountries } = rootStore.countryStore;

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  return (
    <Fragment>
      <S.HeaderContainer>
        <h2>Countries</h2>
      </S.HeaderContainer>
      <Row justify='space-between'>
        <Col span={16}>
          <S.ContentContainer>
            <CountryList />
          </S.ContentContainer>
        </Col>
        <Col span={7}>
          <S.ContentContainer>
            <CountryCreate />
          </S.ContentContainer>
        </Col>
      </Row>
    </Fragment>
  );
};

export default observer(CountryDashboard);

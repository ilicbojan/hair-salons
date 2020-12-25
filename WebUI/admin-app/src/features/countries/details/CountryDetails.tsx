import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { S } from '../../../styles';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Spin, Row, Col } from 'antd';
import NotFound from '../../../app/layout/NotFound';
import { RouteComponentProps } from 'react-router-dom';
import CountryEdit from '../edit/CountryEdit';

const CountryDetails: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadCountry, country, loadingCountries } = rootStore.countryStore;

  useEffect(() => {
    loadCountry(Number(match.params.id));
  }, [loadCountry, match]);

  if (loadingCountries) return <Spin></Spin>;

  if (!country) return <NotFound />;

  return (
    <Fragment>
      <S.HeaderContainer>
        <h2>{country.name}</h2>
      </S.HeaderContainer>
      <Row justify='space-between'>
        <Col span={16}>
          <S.ContentContainer>
            List of hair salons in this country
          </S.ContentContainer>
        </Col>
        <Col span={7}>
          <S.ContentContainer>
            <CountryEdit />
          </S.ContentContainer>
        </Col>
      </Row>
    </Fragment>
  );
};

export default observer(CountryDetails);

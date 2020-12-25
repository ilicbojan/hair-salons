import React, { Fragment, useContext, useEffect } from 'react';
import { S } from '../../../styles';
import { Tabs, Spin } from 'antd';
import HairSalonEdit from '../edit/HairSalonEdit';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import NotFound from '../../../app/layout/NotFound';
import HairSalonReviewsList from '../reviews-list/HairSalonReviewsList';
import WorkingHoursCreate from '../working-hours/WorkingHoursCreate';
import WorkingHoursEdit from '../working-hours/WorkingHoursEdit';
import Services from '../services/Services';

const HairSalonDetails: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { hairSalon, loadHairSalon, loadingInitial } = rootStore.hairSalonStore;
  const { loadCities } = rootStore.cityStore;

  const { TabPane } = Tabs;

  useEffect(() => {
    loadHairSalon(Number(match.params.id));
    loadCities();
  }, [loadHairSalon, loadCities, match]);

  if (loadingInitial) return <Spin></Spin>;

  if (!hairSalon) return <NotFound />;

  return (
    <Fragment>
      <S.HeaderContainer>
        <h2>{hairSalon.name}</h2>
      </S.HeaderContainer>
      <S.ContentContainer>
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Edit' key='1'>
            <HairSalonEdit />
          </TabPane>
          <TabPane tab='Work hours' key='2'>
            {hairSalon.workingHours === undefined ||
            hairSalon.workingHours.length === 0 ? (
              <WorkingHoursCreate />
            ) : (
              <WorkingHoursEdit />
            )}
          </TabPane>
          <TabPane tab='Services' key='3'>
            <Services />
          </TabPane>
          <TabPane tab='Reviews' key='5'>
            <HairSalonReviewsList />
          </TabPane>
        </Tabs>
      </S.ContentContainer>
    </Fragment>
  );
};

export default observer(HairSalonDetails);

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Button from '../../../app/common/button/Button';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ServiceCreate from '../create/ServiceCreate';
import ServiceList from '../list/ServiceList';
import { S } from './ServicesDashboard.style';

const ServicesDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;

  const handleCreatePrice = (e: any) => {
    e.preventDefault();
    openModal('Kreiraj uslugu', <ServiceCreate />);
  };

  return (
    <S.ServicesDashboard>
      <S.Header>
        <h2>Usluge</h2>
        <Button type='button' color='primary' onClick={handleCreatePrice}>
          Kreiraj uslugu
        </Button>
      </S.Header>
      <ServiceList />
    </S.ServicesDashboard>
  );
};

export default observer(ServicesDashboard);

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import Table from '../../../app/common/table/Table';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './ServiceList.style';
import Button from '../../../app/common/button/Button';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { IService } from '../../../app/models/service';
import ServiceConfirmDelete from '../confirm-delete/ServiceConfirmDelete';

const ServiceList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadServices,
    loadingServices,
    serviceRegistry,
  } = rootStore.serviceStore;
  const { myHairSalon } = rootStore.hairSalonStore;
  const { openModal } = rootStore.modalStore;

  const handleDelete = (id: number) => {
    openModal('Potvrda', <ServiceConfirmDelete id={id} />);
  };

  useEffect(() => {
    loadServices(myHairSalon?.id!);
  }, [loadServices, myHairSalon]);

  return (
    <S.ServiceList>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Naziv</th>
            <th>Cena</th>
            <th>Izbriši</th>
          </tr>
        </thead>
        <tbody>
          {loadingServices ? (
            <tr>
              <td>
                <LoadingSpinner />
              </td>
            </tr>
          ) : (
            Array.from(serviceRegistry.values()).map((service: IService) => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.name}</td>
                <td>{service.price} RSD</td>
                <td className='btnColumn'>
                  <Button
                    onClick={(e) => handleDelete(service.id)}
                    type='button'
                    color='red'
                  >
                    Izbriši
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </S.ServiceList>
  );
};

export default observer(ServiceList);

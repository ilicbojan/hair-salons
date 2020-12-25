import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Table from '../../../app/common/table/Table';
import { getDate } from '../../../app/common/util/util';
import { IReservation } from '../../../app/models/reservation';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './ReservationListUser.style';
import Button from '../../../app/common/button/Button';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import ReservationConfirmDelete from '../confirm-delete/ReservationConfirmDelete';

const ReservationListUser = () => {
  const rootStore = useContext(RootStoreContext);
  const { reservations, loadingReservations } = rootStore.reservationStore;
  const { openModal } = rootStore.modalStore;

  const handleDelete = (id: number) => {
    openModal('Potvrda', <ReservationConfirmDelete id={id} />);
  };

  return (
    <S.ReservationListUser>
      <Table>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Početak</th>
            <th>Kraj</th>
            <th>Cena</th>
            <th>Teren</th>
            <th>Status</th>
            <th>Otkaži</th>
          </tr>
        </thead>
        <tbody>
          {loadingReservations ? (
            <tr>
              <td>
                <LoadingSpinner />
              </td>
            </tr>
          ) : (
            reservations.map((res: IReservation) => (
              <tr key={res.id}>
                <td>{getDate(res.date)}</td>
                <td>{res.startTime.slice(0, -3)}</td>
                <td>{res.endTime.slice(0, -3)}</td>
                <td>{res.price} RSD</td>
                <td>{res.hairSalon.name}</td>
                <td>
                  {res.status.status === 'pending'
                    ? 'Na čekanju'
                    : 'Prihvaćena'}
                </td>
                <td className='btnColumn'>
                  <Button
                    onClick={(e) => handleDelete(res.id)}
                    type='button'
                    color='red'
                  >
                    {res.status.status === 'pending' ? 'Izbriši' : 'Otkaži'}
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </S.ReservationListUser>
  );
};

export default observer(ReservationListUser);

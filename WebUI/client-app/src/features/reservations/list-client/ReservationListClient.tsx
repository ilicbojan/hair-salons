import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Button from '../../../app/common/button/Button';
import Table from '../../../app/common/table/Table';
import { getDate } from '../../../app/common/util/util';
import { IReservation } from '../../../app/models/reservation';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './ReservationListClient.style';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import ReservationConfirmDelete from '../confirm-delete/ReservationConfirmDelete';
import ReservationConfirmApprove from '../confirm-approve/ReservationConfirmApprove';

const ReservationListClient = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    reservations,
    loadingReservations,
    predicate,
  } = rootStore.reservationStore;
  const { openModal } = rootStore.modalStore;

  const handleDelete = (id: number) => {
    openModal('Potvrda', <ReservationConfirmDelete id={id} />);
  };

  const handleApprove = (id: number) => {
    openModal('Potvrda', <ReservationConfirmApprove id={id} />);
  };

  return (
    <S.ReservationListClient>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Datum</th>
            <th>Početak</th>
            <th>Kraj</th>
            <th>Cena</th>
            <th>Korisnik</th>
            {predicate.get('status') === 'pending' && <th>Odobri</th>}
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
                <td>{res.id}</td>
                <td>{getDate(res.date)}</td>
                <td>{res.startTime.slice(0, -3)}</td>
                <td>{res.endTime.slice(0, -3)}</td>
                <td>{res.price} RSD</td>
                <td>{res.user.username}</td>
                {res.status.status === 'pending' && (
                  <td>
                    <Button
                      onClick={(e) => handleApprove(res.id)}
                      type='button'
                      color='primary'
                    >
                      Odobri
                    </Button>
                  </td>
                )}
                <td>
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
    </S.ReservationListClient>
  );
};

export default observer(ReservationListClient);

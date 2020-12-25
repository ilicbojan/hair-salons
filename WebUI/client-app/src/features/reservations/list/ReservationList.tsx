import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { FaArrowAltCircleDown } from 'react-icons/fa';
import Pagination from '../../../app/common/pagination/Pagination';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ReservationListClient from '../list-client/ReservationListClient';
import ReservationListUser from '../list-user/ReservationListUser';
import { S } from './ReservationList.style';

const ReservationList = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadReservations,
    setPredicate,
    predicate,
    totalPages,
    page,
    setPage,
  } = rootStore.reservationStore;
  const { isClient, isLoggedIn } = rootStore.userStore;

  const paginate = (page: number) => {
    setPage(page);
    loadReservations();
  };

  useEffect(() => {
    setPredicate('status', 'pending');
  }, [setPredicate]);

  return (
    <S.ReservationList>
      <h2>Rezervacije</h2>
      <S.Menu>
        <S.Tab
          active={predicate.get('status') === 'pending'}
          onClick={() => setPredicate('status', 'pending')}
        >
          Na čekanju
          {predicate.get('status') === 'pending' && <FaArrowAltCircleDown />}
        </S.Tab>
        <S.Tab
          active={predicate.get('status') === 'accepted'}
          onClick={() => setPredicate('status', 'accepted')}
        >
          Prihvaćene
          {predicate.get('status') === 'accepted' && <FaArrowAltCircleDown />}
        </S.Tab>
      </S.Menu>
      {isLoggedIn &&
        (isClient ? <ReservationListClient /> : <ReservationListUser />)}
      <Pagination
        totalPages={totalPages}
        paginate={paginate}
        activePage={page}
      />
    </S.ReservationList>
  );
};

export default observer(ReservationList);

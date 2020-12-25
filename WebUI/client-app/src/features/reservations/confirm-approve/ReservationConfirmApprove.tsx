import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Button from '../../../app/common/button/Button';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Style } from '../../../style';

interface IProps {
  id: number;
}

const ReservationConfirmApprove: React.FC<IProps> = ({ id }) => {
  const rootStore = useContext(RootStoreContext);
  const { approveReservation, submitting, target } = rootStore.reservationStore;
  const { closeModal } = rootStore.modalStore;

  return (
    <Style.ConfirmModal>
      <div>Da li ste sigurni da zelite da odobrite izabranu rezervaciju?</div>
      <div className='buttons'>
        <Button
          name={id}
          type='button'
          color='primary'
          onClick={(e) => approveReservation(id, e)}
          loading={submitting && id === Number(target)}
        >
          Odobri
        </Button>
        <Button type='button' color='red' onClick={closeModal} block>
          Zatvori
        </Button>
      </div>
    </Style.ConfirmModal>
  );
};

export default observer(ReservationConfirmApprove);

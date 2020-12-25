import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Field, Form } from 'react-final-form';
import Button from '../../../app/common/button/Button';
import { IReservation } from '../../../app/models/reservation';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './ReservationCreate.style';
import ErrorMessage from '../../../app/common/form/error/ErrorMessage';

interface IProps {
  date: string;
  startTime: string;
  price: number;
  termDate: Date;
}

const ReservationCreate: React.FC<IProps> = ({
  date,
  startTime,
  price,
  termDate,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { hairSalon } = rootStore.hairSalonStore;
  const { createReservation, submitting } = rootStore.reservationStore;
  const { isLoggedIn } = rootStore.userStore;

  const [error, setError] = useState<string | null>(null);

  const handleCreateReservation = (values: IReservation) => {
    if (isLoggedIn) {
      createReservation(values, termDate);
    } else {
      setError('Morate da se prijavite da biste rezervisali termin');
    }
  };

  return (
    <S.ReservationCreate>
      <div>
        <span>Frizerski salon: </span>
        {hairSalon!.name}
      </div>
      <div>
        <span>Adresa: </span>
        {hairSalon!.address}
      </div>
      <hr />
      <div>
        <span>Datum: </span>
        {date}
      </div>
      <div>
        <span>Vreme: </span>
        {startTime}
      </div>

      <Form
        onSubmit={(values: IReservation) => handleCreateReservation(values)}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name='hairSalonId'
              component='input'
              type='text'
              initialValue={hairSalon?.id}
              hidden
            />
            <Field
              name='date'
              component='input'
              type='text'
              initialValue={date}
              hidden
            />
            <Field
              name='startTime'
              component='input'
              type='text'
              initialValue={startTime}
              hidden
            />
            <ErrorMessage text={error} />

            <Button
              disabled={submitting}
              loading={submitting}
              type='submit'
              color='primary'
              block
            >
              Rezervisi
            </Button>
          </form>
        )}
      ></Form>
    </S.ReservationCreate>
  );
};

export default observer(ReservationCreate);

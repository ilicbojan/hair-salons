import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import {
  getDate,
  getDateAndMonth,
  getDayOfWeek,
} from '../../../../app/common/util/util';
import LoadingSpinner from '../../../../app/layout/spinner/LoadingSpinner';
import { ITerm, ITermByDate } from '../../../../app/models/reservation';
import { RootStoreContext } from '../../../../app/stores/rootStore';
import ReservationCreate from '../../../reservations/create/ReservationCreate';
import { S } from './FreeTerms.style';
import { IHairSalon } from '../../../../app/models/hairSalon';
import FreeTerm from './free-term/FreeTerm';

interface IProps {
  hairSalon: IHairSalon;
}

const FreeTerms: React.FC<IProps> = ({ hairSalon }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadTerms,
    loadingTerms,
    termsByDate,
    created,
  } = rootStore.reservationStore;
  const { openModal } = rootStore.modalStore;
  const { workingHours } = rootStore.hairSalonStore;

  useEffect(() => {
    if (hairSalon.workingHours.length > 0) {
      loadTerms(hairSalon.id!);
    }
  }, [loadTerms, hairSalon.id, hairSalon.workingHours]);

  useEffect(() => {}, [created]);

  const handleTermClick = (values: any) => {
    const { date, startTime, price, termDate } = values;
    openModal(
      'Potvrda rezervacije',
      <ReservationCreate
        date={date}
        startTime={startTime}
        price={price}
        termDate={termDate}
      />
    );
  };

  return (
    <>
      {hairSalon.workingHours.length > 0 && (
        <S.FreeTerms>
          <h3>Pronađi termin</h3>
          <S.Legend>
            <S.Item color='green'>
              <div className='legend'></div>
              <div>Slobodan</div>
            </S.Item>
            <S.Item color='yellow'>
              <div className='legend'></div>
              <div>Na čekanju</div>
            </S.Item>
            <S.Item color='red'>
              <div className='legend'></div>
              <div>Zauzet</div>
            </S.Item>
          </S.Legend>
          {loadingTerms ? (
            <LoadingSpinner />
          ) : (
            <S.Content>
              <S.Dates>
                {termsByDate.map((termByDate: ITermByDate, index) => (
                  <S.Date key={index}>
                    <div>{getDayOfWeek(termByDate.date.getDay())}</div>
                    <div>{getDateAndMonth(termByDate.date)}</div>
                  </S.Date>
                ))}
              </S.Dates>
              <S.Terms>
                {termsByDate.map((termByDate: ITermByDate, index) => (
                  <S.TermRow key={index}>
                    {workingHours.map((hour, i) => {
                      var term: ITerm | undefined;
                      term = termByDate.terms.find((x) => x.startTime === hour);
                      if (term === undefined) {
                        return (
                          <S.Term
                            key={i}
                            type='submit'
                            status='empty'
                            disabled
                          ></S.Term>
                        );
                      }
                      return (
                        <Form
                          key={i}
                          onSubmit={handleTermClick}
                          render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                              <Field
                                name='date'
                                component='input'
                                type='text'
                                initialValue={getDate(termByDate.date)}
                                hidden
                              />
                              <Field
                                name='termDate'
                                component='input'
                                type='text'
                                initialValue={termByDate.date}
                                hidden
                              />
                              <Field
                                name='startTime'
                                component='input'
                                type='text'
                                initialValue={term!.startTime}
                                hidden
                              />

                              <FreeTerm term={term!} />
                            </form>
                          )}
                        ></Form>
                      );
                    })}
                  </S.TermRow>
                ))}
              </S.Terms>
            </S.Content>
          )}
        </S.FreeTerms>
      )}
    </>
  );
};

export default observer(FreeTerms);

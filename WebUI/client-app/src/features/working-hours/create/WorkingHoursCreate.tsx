import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import Button from '../../../app/common/button/Button';
import InputSelect from '../../../app/common/form/select/InputSelect';
import {
  closeHours,
  getDayOfWeek,
  openHours,
} from '../../../app/common/util/util';
import { IWorkingHoursFormValues } from '../../../app/models/workingHour';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { required } from '../../../validation';
import { S } from './WorkingHoursCreate.style';

const WorkingHoursCreate = () => {
  const rootStore = useContext(RootStoreContext);
  const { createWorkingHours } = rootStore.workingHourStore;
  const { myHairSalon } = rootStore.hairSalonStore;

  const initial = {
    workingHours: [
      {
        day: 1,
      },
      {
        day: 2,
      },
      {
        day: 3,
      },
      {
        day: 4,
      },
      {
        day: 5,
      },
      {
        day: 6,
      },
      {
        day: 7,
      },
    ],
  };

  return (
    <S.WorkingHoursCreate>
      <h2>Kreiraj radno vreme</h2>
      <Form
        mutators={{
          ...arrayMutators,
        }}
        onSubmit={(values: IWorkingHoursFormValues) => {
          values.hairSalonId = myHairSalon!.id!;
          createWorkingHours(values);
        }}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <S.Content>
              <S.Day className='first-day'>Dan</S.Day>
              <S.ContentItem>Otvaranje</S.ContentItem>
              <S.ContentItem>Zatvaranje</S.ContentItem>
            </S.Content>
            <FieldArray name='workingHours'>
              {() =>
                initial.workingHours.map((wh, index) => (
                  <S.Content key={index}>
                    <Field
                      name={`workingHours[${index}].day`}
                      component='input'
                      type='text'
                      initialValue={wh.day}
                      hidden
                    />
                    <S.Day>{getDayOfWeek(wh.day)}</S.Day>
                    <S.ContentItem>
                      <Field
                        name={`workingHours[${index}].openTime`}
                        block
                        validate={required}
                        value={''}
                        component={InputSelect}
                      >
                        {openHours.map((hour) => (
                          <option key={hour} value={hour}>
                            {hour.slice(0, -3)}
                          </option>
                        ))}
                      </Field>
                    </S.ContentItem>
                    <S.ContentItem>
                      <Field
                        name={`workingHours[${index}].closeTime`}
                        block
                        validate={required}
                        value={''}
                        component={InputSelect}
                      >
                        {closeHours.map((hour) => (
                          <option key={hour} value={hour}>
                            {hour.slice(0, -3)}
                          </option>
                        ))}
                      </Field>
                    </S.ContentItem>
                  </S.Content>
                ))
              }
            </FieldArray>

            <Button
              disabled={submitting}
              loading={submitting}
              type='submit'
              color='primary'
              block
            >
              Kreiraj
            </Button>
          </form>
        )}
      ></Form>
    </S.WorkingHoursCreate>
  );
};

export default observer(WorkingHoursCreate);

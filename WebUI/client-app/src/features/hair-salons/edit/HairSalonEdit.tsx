import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import Button from '../../../app/common/button/Button';
import ErrorMessage from '../../../app/common/form/error/ErrorMessage';
import InputSelect from '../../../app/common/form/select/InputSelect';
import InputTextArea from '../../../app/common/form/text-area/InputTextArea';
import InputText from '../../../app/common/form/text/InputText';
import { ICity } from '../../../app/models/city';
import { IHairSalon } from '../../../app/models/hairSalon';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { required } from '../../../validation';
import { S } from './HairSalonEdit.style';

const HairSalonEdit = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    myHairSalon,
    updateHairSalon,
    submitting,
    error,
  } = rootStore.hairSalonStore;
  const { cities, loadingCities } = rootStore.cityStore;

  const handleUpdateHairSalon = (values: IHairSalon) => {
    values.id = myHairSalon?.id;
    values.email = myHairSalon!.email;
    values.isPayed = myHairSalon!.isPayed;
    values.isPremium = myHairSalon!.isPremium;

    updateHairSalon(values);
  };

  return (
    <S.HairSalonEdit>
      <h2>Ažuriraj frizerski salon</h2>
      <Form
        onSubmit={(values: IHairSalon) => handleUpdateHairSalon(values)}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name='name'
              label='Naziv'
              type='text'
              block
              initialValue={myHairSalon?.name}
              validate={required}
              component={InputText}
            />
            {/* <Field
              name='email'
              label='Email'
              type='email'
              block
              initialValue={myHairSalon?.email}
              validate={required}
              component={InputText}
            /> */}
            <Field
              name='address'
              label='Adresa'
              type='text'
              block
              initialValue={myHairSalon?.address}
              validate={required}
              component={InputText}
            />
            <Field
              name='phone'
              label='Broj telefona'
              type='text'
              block
              initialValue={myHairSalon?.phone}
              validate={required}
              component={InputText}
            />
            <Field
              name='cityId'
              label='Grad'
              block
              initialValue={myHairSalon?.city.id.toString()}
              validate={required}
              disabled={loadingCities}
              component={InputSelect}
            >
              {cities.map((city: ICity) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </Field>
            <Field
              name='description'
              label='Opis'
              rows='5'
              block
              initialValue={myHairSalon?.description}
              validate={required}
              component={InputTextArea}
            />
            {error && <ErrorMessage error={error} />}

            <Button
              disabled={submitting}
              loading={submitting}
              type='submit'
              color='primary'
              block
            >
              Ažuriraj
            </Button>
          </form>
        )}
      ></Form>
    </S.HairSalonEdit>
  );
};

export default observer(HairSalonEdit);

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import Button from '../../../app/common/button/Button';
import InputText from '../../../app/common/form/text/InputText';
import { IService } from '../../../app/models/service';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { required } from '../../../validation';

const ServiceCreate = () => {
  const rootStore = useContext(RootStoreContext);
  const { createService } = rootStore.serviceStore;
  const { myHairSalon } = rootStore.hairSalonStore;

  return (
    <div>
      <Form
        onSubmit={(values: IService) => createService(myHairSalon?.id!, values)}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name='name'
              label='Naziv'
              type='text'
              block
              validate={required}
              component={InputText}
            />
            <Field
              name='price'
              label='Cena'
              type='number'
              block
              validate={required}
              component={InputText}
            />

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
    </div>
  );
};

export default observer(ServiceCreate);

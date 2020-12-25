import { FORM_ERROR } from 'final-form';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Form, Field } from 'react-final-form';
import Button from '../../../app/common/button/Button';
import ErrorMessage from '../../../app/common/form/error/ErrorMessage';
import InputText from '../../../app/common/form/text/InputText';
import { IUserRegisterFormValues } from '../../../app/models/user';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { required } from '../../../validation';
import { S } from './RegisterForm.style';

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register, error } = rootStore.userStore;

  return (
    <S.RegisterForm>
      <h3>Registracija</h3>
      <Form
        onSubmit={(values: IUserRegisterFormValues) =>
          register(values).catch((error) => ({
            [FORM_ERROR]: error,
          }))
        }
        render={({
          handleSubmit,
          submitting,
          invalid,
          pristine,
          dirtySinceLastSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name='email'
              label='Email'
              type='email'
              block
              validate={required}
              component={InputText}
            />
            <Field
              name='username'
              label='Username'
              type='text'
              block
              validate={required}
              component={InputText}
            />
            <Field
              name='phone'
              label='Broj telefona'
              type='text'
              block
              validate={required}
              component={InputText}
            />
            <Field
              name='password'
              label='Password'
              type='password'
              block
              validate={required}
              component={InputText}
            />
            <Field
              name='confirmPassword'
              label='Potvrdi passsword'
              type='password'
              block
              validate={required}
              component={InputText}
            />
            {error && <ErrorMessage error={error} />}

            <Button
              type='submit'
              disabled={submitting}
              loading={submitting}
              color='primary'
              block
            >
              Registruj se
            </Button>
          </form>
        )}
      ></Form>
    </S.RegisterForm>
  );
};

export default observer(RegisterForm);

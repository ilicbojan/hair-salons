import { FORM_ERROR } from 'final-form';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Form, Field } from 'react-final-form';
import Button from '../../../app/common/button/Button';
import ErrorMessage from '../../../app/common/form/error/ErrorMessage';
import InputText from '../../../app/common/form/text/InputText';
import { IUserFormValues } from '../../../app/models/user';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { required } from '../../../validation';
import { S } from './LoginForm.style';

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login, error } = rootStore.userStore;

  return (
    <S.LoginForm>
      <h3>Prijava</h3>
      <Form
        onSubmit={(values: IUserFormValues) =>
          login(values).catch((error) => ({
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
              name='password'
              label='Password'
              type='password'
              block
              validate={required}
              component={InputText}
            />
            {error && <ErrorMessage error={error} />}

            <Button
              disabled={submitting}
              loading={submitting}
              type='submit'
              color='primary'
              block
            >
              Prijavi se
            </Button>
          </form>
        )}
      ></Form>
    </S.LoginForm>
  );
};

export default observer(LoginForm);

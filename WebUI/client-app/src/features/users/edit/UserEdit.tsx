import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import Button from '../../../app/common/button/Button';
import ErrorMessage from '../../../app/common/form/error/ErrorMessage';
import InputText from '../../../app/common/form/text/InputText';
import { IUser } from '../../../app/models/user';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { required } from '../../../validation';
import { S } from './UserEdit.style';

const UserEdit = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, updateUser, submitting, error } = rootStore.userStore;

  const handleCreateHairSalon = (values: IUser) => {
    values.id = user?.id!;

    updateUser(values);
  };

  return (
    <S.UserEdit>
      <h2>Ažuriraj profil</h2>
      <Form
        onSubmit={(values: IUser) => handleCreateHairSalon(values)}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name='username'
              label='Username'
              type='text'
              block
              initialValue={user?.username}
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
              Ažuriraj
            </Button>
          </form>
        )}
      ></Form>
    </S.UserEdit>
  );
};

export default observer(UserEdit);

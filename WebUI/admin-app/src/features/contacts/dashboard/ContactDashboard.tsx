import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { S } from '../../../styles';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ContactList from '../list/ContactList';

const ContactDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadContacts } = rootStore.commonStore;

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  return (
    <Fragment>
      <S.HeaderContainer>
        <h2>Contacts</h2>
      </S.HeaderContainer>

      <S.ContentContainer>
        <ContactList />
      </S.ContentContainer>
    </Fragment>
  );
};

export default observer(ContactDashboard);
